import { firebase } from '@/lib/firebase'
import { InvitationService } from '@/services/invitation'
import { NextRequest, NextResponse } from 'next/server'

interface Params {
    id: string
}

export async function GET(request: NextRequest, { params: { id } }: { params: Params }) {
    const snapshot = await firebase.database().ref(`invitations/${id}`).get()
    const invitation = {
        ...snapshot.val(),
        id: snapshot.key
    }
    return NextResponse.json(invitation)
}

export async function DELETE(request: NextRequest, { params: { id } }: { params: Params }) {
    await InvitationService.deleteInvitation(id)
    return NextResponse.json({
        id
    })
}