'use server'

import { firebase } from '@/lib/firebase'
import { Guest } from '@/models/guest'
import { Invitation, NewInvitation } from '@/models/invitation'
import { v4 as uuid } from 'uuid'

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
    const id = uuid()
    const invitationRef = firebase.database().ref('invitations').child(id)
    await invitationRef.set(newInvitation)
    const invitationId = id

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
        await invitationRef.update({ imageUri })
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

export async function setGuest({ invitationId, guest, guestId }: {
    invitationId: string
    guest: Guest
    guestId: string
}): Promise<Guest> {
    const guestRef = firebase.database().ref(`invitations/${invitationId}/guests/${guestId}`)
    await guestRef.set({ ...guest, id: null })
    return guest
}