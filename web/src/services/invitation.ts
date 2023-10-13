import { firebase } from '@/lib/firebase'
import { Invitation, NewInvitation } from '@/models/invitation'

export namespace InvitationService {
    export async function getInvitationById(id: string): Promise<Invitation> {
        const database = firebase.database()
        const snapshot = await database.ref('invitations').child(id).get()
        const invitation: Invitation = {
            id: snapshot.key,
            ...snapshot.val(),
        }
        return invitation
    }

    export async function createInvitation(newInvitation: NewInvitation): Promise<Invitation> {
        const snapshot = await firebase.database().ref('invitations').push(newInvitation)
        const invitationId = snapshot.key as string

        const { imageFile, ...newInvitationRest } = newInvitation
        let imageUri: string | null = null
        if (imageFile) {
            const bucket = firebase.storage().bucket()
            const storageFile = bucket.file(`invitations/${invitationId}.jpg`)
            const blobStream = storageFile.createWriteStream({
                metadata: {
                    contentType: imageFile.type
                }
            })

            await new Promise((resolve, reject) => {
                imageFile.arrayBuffer().then((buffer) => {
                    blobStream.on('error', reject)
                    blobStream.on('finish', resolve)
                    blobStream.end(Buffer.from(buffer))
                })
            })

            await storageFile.makePublic()
            imageUri = storageFile.publicUrl()
            await snapshot.ref.update({ imageUri })
        }

        const invitation: Invitation = {
            id: invitationId,
            ...newInvitationRest,
            imageUri,
        }
        return invitation
    }

    export async function deleteInvitation(id: string): Promise<void> {
        await firebase.database().ref(`invitations/${id}`).remove()
        await firebase.storage().bucket().file(`invitations/${id}.jpg`).delete()
    }
}