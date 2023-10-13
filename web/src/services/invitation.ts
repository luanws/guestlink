import { firebase } from '@/lib/firebase'
import { Invitation } from '@/models/invitation'

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
}