import { decrypt } from '@/lib/crypto'
import { firebase } from '@/lib/firebase'
import { NewInvitation } from '@/models/invitation'
import * as InvitationService from '@/services/invitation'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const newInvitationSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    eventName: z.string().min(1, 'Evento é obrigatório'),
    date: z.string().min(1, 'Data é obrigatória').regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Data inválida'),
    address: z.string().min(1, 'Endereço é obrigatório'),
    time: z.string().regex(/^\d{2}:\d{2}$/, 'Hora inválida'),
})

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

export async function PUT(request: NextRequest, { params: { invitationAuthorizationKey } }: { params: Params }) {
    const id = decrypt(invitationAuthorizationKey)
    const formData = await request.formData()

    const rest = JSON.parse(formData.get('rest') as string)
    const imageFile = formData.get('image') as File | null

    const newInvitation: NewInvitation = {
        ...newInvitationSchema.parse(rest),
        imageFile,
    }

    await InvitationService.updateInvitation(id, newInvitation)

    return NextResponse.json({
        invitation: {
            ...newInvitation,
            id
        },
    })
}