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

async function uploadInvitationImage({ invitationId, imageFile }: { invitationId: string, imageFile: File }): Promise<string> {
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
    const imageUri = storageFile.publicUrl()
    return imageUri
}

async function deleteInvitationImage(invitationId: string): Promise<boolean> {
    const invitationImageFileRef = firebase.storage().bucket().file(`invitations/${invitationId}.jpg`)
    const [imageFileExists] = await invitationImageFileRef.exists()
    if (imageFileExists) {
        await invitationImageFileRef.delete()
        return true
    }
    return false
}

export async function createInvitation(newInvitation: NewInvitation): Promise<Invitation> {
    const id = uuid()
    const invitationRef = firebase.database().ref('invitations').child(id)
    await invitationRef.set(newInvitation)
    const invitationId = id

    const { imageFile, ...newInvitationRest } = newInvitation
    let imageUri: string | null = null
    if (imageFile) {
        imageUri = await uploadInvitationImage({ invitationId, imageFile })
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
    const invitationImageFileRef = firebase.storage().bucket().file(`invitations/${id}.jpg`)
    const [imageFileExists] = await invitationImageFileRef.exists()
    if (imageFileExists) {
        await invitationImageFileRef.delete()
    }
}

export async function updateInvitation(invitationId: string, newInvitation: NewInvitation): Promise<void> {
    const invitationRef = firebase.database().ref(`invitations/${invitationId}`)
    const { imageFile, ...newInvitationRest } = newInvitation
    await deleteInvitationImage(invitationId)
    await invitationRef.update(newInvitationRest)

    let imageUri: string | null = null
    if (imageFile) {
        imageUri = await uploadInvitationImage({ invitationId, imageFile })
        await invitationRef.update({ imageUri })
    }
}

export async function deleteGuest({ invitationId, guestId }: {
    invitationId: string
    guestId: string
}): Promise<void> {
    await firebase.database().ref(`invitations/${invitationId}/guests/${guestId}`).remove()
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