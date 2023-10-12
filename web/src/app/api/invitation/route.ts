
import { firebase } from '@/lib/firebase'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const newInvitationSchema = z.object({
  imageUri: z.string().nullable().optional(),
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

  const snapshot = await firebase.database().ref('invitations').push(newInvitation)
  const invitationId = snapshot.key

  if (imageFile) {
    const bucket = firebase.storage().bucket()
    const storageFile = bucket.file(`invitations/${invitationId}.jpg`)
    const blobStream = storageFile.createWriteStream({
      metadata: {
        contentType: imageFile.type
      }
    })

    await new Promise((resolve, reject) => {
      imageFile.arrayBuffer().then((buffer) => {
        blobStream.on('error', reject)
        blobStream.on('finish', resolve)
        blobStream.end(Buffer.from(buffer))
      })
    })

    await storageFile.makePublic()
    const imageUri = storageFile.publicUrl()
    await snapshot.ref.update({ imageUri })
    newInvitation.imageUri = imageUri
  }

  return NextResponse.json({
    ...newInvitation,
    id: invitationId
  })
}