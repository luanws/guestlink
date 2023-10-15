
import { encrypt } from '@/lib/crypto'
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

export async function POST(request: NextRequest) {
    const formData = await request.formData()

    const rest = JSON.parse(formData.get('rest') as string)
    const imageFile = formData.get('image') as File | null

    const newInvitation: NewInvitation = {
        ...newInvitationSchema.parse(rest),
        imageFile,
    }

    const { id: invitationId } = await InvitationService.createInvitation(newInvitation)

    return NextResponse.json({
        invitation: {
            ...newInvitation,
            id: invitationId
        },
        invitationAuthorizationKey: encrypt(invitationId)
    })
}