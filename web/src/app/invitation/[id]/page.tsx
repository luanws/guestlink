interface Params {
  id: string
}

interface Props {
  params: Params
}

export default function ({ params: { id } }: Props) {
  return (
    <div>
      {id}
    </div>
  )
}