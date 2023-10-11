import { firebase } from '@/firebase'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const newInvitationSchema = z.object({
  imageBase64: z.string().nullable(),
  name: z.string().min(1, 'Nome é obrigatório'),
  eventName: z.string().min(1, 'Evento é obrigatório'),
  date: z.string().min(1, 'Data é obrigatória').regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Data inválida'),
  address: z.string().min(1, 'Endereço é obrigatório'),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Hora inválida'),
})


export async function POST(request: NextRequest) {
  const newInvitation = newInvitationSchema.parse(await request.json())
  const snapshot = await firebase.database().ref('invitations').push(newInvitation)

  return NextResponse.json({
    data: {
      id: snapshot.key,
      ...newInvitation
    }
  })
}