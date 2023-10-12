
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const newInvitationSchema = z.object({
  imageUrl: z.string().nullable().optional(),
  name: z.string().min(1, 'Nome é obrigatório'),
  eventName: z.string().min(1, 'Evento é obrigatório'),
  date: z.string().min(1, 'Data é obrigatória').regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Data inválida'),
  address: z.string().min(1, 'Endereço é obrigatório'),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Hora inválida'),
})


export async function POST(request: NextRequest) {
  const formData = await request.formData()

  const rest = JSON.parse(formData.get('rest') as string)
  const newInvitation = newInvitationSchema.parse(rest)

  const imageFile = formData.get('image') as File | null
  console.log(imageFile)

  return NextResponse.json({
    ...newInvitation,
  })
}