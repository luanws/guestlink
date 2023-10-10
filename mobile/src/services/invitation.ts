import * as firebaseDatabase from 'firebase/database'
import { Invitation } from '../models/invitation'

export namespace InvitationService {
  export async function getInvitations(): Promise<Invitation[]> {
    const database = firebaseDatabase.getDatabase()
    const ref = firebaseDatabase.ref(database, 'invitations')
    const snapshot = await firebaseDatabase.get(ref)
    const invitations: Invitation[] = []
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key
      const childData = childSnapshot.val()
      invitations.push(childData)
    })
    return invitations
  }

  export async function setInvitation(invitation: Invitation) {
    const database = firebaseDatabase.getDatabase()
    const ref = firebaseDatabase.ref(database, 'invitations')
    await firebaseDatabase.push(ref, invitation)
  }
}