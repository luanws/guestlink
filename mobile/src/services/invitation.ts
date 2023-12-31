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

    export async function updateInvitation(invitation: NewInvitation, authKey: string) {
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

        await api.put(`/invitation/${authKey}`, formData)
    }

    export async function deleteInvitation(authKey: string) {
        await api.delete(`/invitation/${authKey}`)
        await removeInvitationAuthKey(authKey)
    }

    interface ShareLinkParams {
        guestId?: string
        guestLimit?: number
    }

    async function getShareLink(id: string, { guestId, guestLimit }: ShareLinkParams = {}): Promise<string> {
        const { data: { shareLink } } = await api.get(`/invitation/${id}/share`, {
            params: { guestId, guestLimit },
        })
        return shareLink
    }

    export async function shareInvitation(authKey: string, params: ShareLinkParams = {}) {
        const shareLink = await getShareLink(authKey, params)
        await Share.share({ message: shareLink })
    }

    export async function editGuestInBrowser(id: string, params: ShareLinkParams = {}) {
        const shareLink = await getShareLink(id, params)
        Linking.openURL(shareLink)
    }
}