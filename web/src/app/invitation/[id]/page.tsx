import { firebase } from '@/firebase'

interface Params {
  id: string
}

interface Props {
  params: Params
}

export default async function ({ params: { id } }: Props) {
  const database = firebase.database()
  const snapshot = await database.ref('invitations').child(id).get()
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