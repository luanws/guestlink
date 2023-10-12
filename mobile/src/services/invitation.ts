import { Invitation } from '../models/invitation'

export namespace InvitationService {
  export async function getInvitations(): Promise<Invitation[]> {
    return []
  }

  export async function createInvitation(invitation: Invitation) {
  }
}