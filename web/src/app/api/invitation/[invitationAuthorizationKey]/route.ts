import { decrypt } from '@/lib/crypto'
import { firebase } from '@/lib/firebase'
import * as InvitationService from '@/services/invitation'
import { NextRequest, NextResponse } from 'next/server'

interface Params {
    invitationAuthorizationKey: string
}

export async function GET(request: NextRequest, { params: { invitationAuthorizationKey } }: { params: Params }) {
    const id = decrypt(invitationAuthorizationKey)
    const snapshot = await firebase.database().ref(`invitations/${id}`).get()
    const invitation = {
        ...snapshot.val(),
        id: snapshot.key
    }
    return NextResponse.json(invitation)
}

export async function DELETE(request: NextRequest, { params: { invitationAuthorizationKey } }: { params: Params }) {
    const id = decrypt(invitationAuthorizationKey)
    await InvitationService.deleteInvitation(id)
    return NextResponse.json({
        id
    })
}