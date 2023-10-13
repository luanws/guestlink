import { firebase } from '@/lib/firebase'
import * as jwt from '@/lib/jwt'

interface TokenPayload {
  invitationId: string
  linkId: string
}

interface Params {
  token: string
}

interface Props {
  params: Params
}

export default async function ({ params: { token } }: Props) {
  const { invitationId, linkId } = jwt.verify(token) as TokenPayload

  const database = firebase.database()
  const snapshot = await database.ref('invitations').child(invitationId).get()
  const invitation = {
    id: snapshot.key,
    ...snapshot.val(),
    imageBase64: undefined
  }

  return (
    <div>
      <pre>
        {JSON.stringify(invitation, null, 2)}
      </pre>
    </div>
  )
}