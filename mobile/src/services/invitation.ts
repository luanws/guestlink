import { api } from '../lib/api'
import { Invitation } from '../models/invitation'

export namespace InvitationService {
  export async function getInvitations(): Promise<Invitation[]> {
    return []
  }

  export async function createInvitation(invitation: Invitation) {
    const formData = new FormData()
    const { imageUri, ...rest } = invitation
    formData.append('rest', JSON.stringify(rest))

    if (imageUri) {
      console.log(imageUri)
      // const file = new File([imageUri], 'image.jpeg', { type: 'image/jpeg' })
      formData.append('image', {
        uri: imageUri,
        name: 'imagem.jpg',
        type: 'image/jpeg',
      } as any)
    }

    await api.post('/invitation', formData)
  }
}