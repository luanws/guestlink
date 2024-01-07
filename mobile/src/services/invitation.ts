import AsyncStorage from '@react-native-async-storage/async-storage'
import { Linking, Share } from 'react-native'
import { api } from '../lib/api'
import { Invitation, InvitationWithAuthKey, NewInvitation } from '../models/invitation'

export namespace InvitationService {
    async function addInvitationAuthKey(authorizationKey: string) {
        const invitationIds = await getSavedInvitationAuthKey()
        await AsyncStorage.setItem(
            'invitationAuthKeys',
            JSON.stringify([...invitationIds, authorizationKey])
        )
    }

    async function getSavedInvitationAuthKey(): Promise<string[]> {
        const authKeys = await AsyncStorage.getItem('invitationAuthKeys')
        console.log(authKeys)
        return authKeys ? JSON.parse(authKeys) : []
    }

    export async function removeInvitationAuthKey(authKey: string) {
        const authKeys = await getSavedInvitationAuthKey()
        await AsyncStorage.setItem(
            'invitationAuthKeys',
            JSON.stringify(authKeys.filter(id => id !== authKey))
        )
    }

    export async function getInvitation(authKey: string): Promise<Invitation | null> {
        const { data } = await api.get(`/invitation/${authKey}`)
        if (Object.keys(data).length === 1) {
            await removeInvitationAuthKey(authKey)
            return null
        }
        return data
    }



    export async function getUserInvitations(): Promise<InvitationWithAuthKey[]> {
        const authKeys = await getSavedInvitationAuthKey()
        const invitations = await Promise.all(authKeys.map(async authKey => {
            const invitation = await getInvitation(authKey)
            if (!invitation) return null
            return {
                ...invitation,
                authKey,
            }
        }))
        return invitations.filter(x => x !== null) as InvitationWithAuthKey[]
    }

    export async function createInvitation(invitation: NewInvitation) {
        const formData = new FormData()
        const { imageUri, ...rest } = invitation
        formData.append('rest', JSON.stringify(rest))

        if (imageUri) {
            formData.append('image', {
                uri: imageUri,
                name: 'imagem.jpg',
                type: 'image/jpeg',
            } as any)
        }

        const { data } = await api.post('/invitation', formData)
        const { invitationAuthorizationKey } = data
        await addInvitationAuthKey(invitationAuthorizationKey)
    }

    export async function deleteInvitation(authKey: string) {
        await api.delete(`/invitation/${authKey}`)
        await removeInvitationAuthKey(authKey)
    }

    async function getShareLink(id: string, guestId?: string): Promise<string> {
        const { data: { shareLink } } = await api.get(`/invitation/${id}/share`, {
            params: { guestId },
        })
        return shareLink
    }

    export async function shareInvitation(authKey: string) {
        const shareLink = await getShareLink(authKey)
        await Share.share({ message: shareLink })
    }

    export async function shareInvitationToExistingGuest(id: string, guestId: string) {
        const shareLink = await getShareLink(id, guestId)
        await Share.share({ message: shareLink })
    }

    export async function editGuestInBrowser(id: string, guestId: string) {
        const shareLink = await getShareLink(id, guestId)
        Linking.openURL(shareLink)
    }
}