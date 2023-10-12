import { firebase } from '@/lib/firebase'
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
  const invitationRef = firebase.database().ref(`invitations/${id}`)
  const snapshot = await invitationRef.get()
  await invitationRef.remove()
  await firebase.storage().bucket().file(`invitations/${id}.jpg`).delete()
  return NextResponse.json({
    ...snapshot.val(),
    id: snapshot.key
  })
}