import AsyncStorage from '@react-native-async-storage/async-storage'
import { api } from '../lib/api'
import { Invitation, NewInvitation } from '../models/invitation'

export namespace InvitationService {
  async function addInvitationId(invitationId: string) {
    const invitationIds = await getAllInvitationIds()
    await AsyncStorage.setItem('@invitationIds', JSON.stringify([...invitationIds, invitationId]))
  }

  async function getAllInvitationIds(): Promise<string[]> {
    const invitationIds = await AsyncStorage.getItem('@invitationIds')
    console.log(invitationIds)
    return invitationIds ? JSON.parse(invitationIds) : []
  }

  export async function removeInvitationId(invitationId: string) {
    const invitationIds = await getAllInvitationIds()
    await AsyncStorage.setItem('@invitationIds', JSON.stringify(invitationIds.filter(id => id !== invitationId)))
  }

  export async function getInvitations(): Promise<Invitation[]> {
    const invitationIds = await getAllInvitationIds()
    const invitations: (Invitation | { id: string })[] = await Promise.all(invitationIds.map(async id => {
      const { data } = await api.get(`/invitation/${id}`)
      return data
    }))
    for (const invitation of invitations) {
      if (Object.keys(invitation).length === 1) {
        await removeInvitationId(invitation.id)
        invitations.splice(invitations.indexOf(invitation), 1)
      }
    }
    return invitations as Invitation[]
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
    const { id } = data
    await addInvitationId(id)
  }
}