import { IconText } from '@/components/icon-text'
import * as jwt from '@/lib/jwt'
import { Guest } from '@/models/guest'
import * as InvitationService from '@/services/invitation'
import { CalendarIcon, ClockIcon, MapPinIcon, User2Icon } from 'lucide-react'
import Image from 'next/image'
import { InvitationGuestForm } from './form'

interface TokenPayload {
  invitationId: string
  linkId: string
  guestLimit?: number
}

interface Params {
  token: string
}

interface Props {
  params: Params
}

export default async function ({ params: { token } }: Props) {
  const { invitationId, linkId, guestLimit } = jwt.verify(token) as TokenPayload

  const invitation = await InvitationService.getInvitationById(invitationId)
  const guest: Guest | undefined = invitation.guests?.[linkId]
  const { address, date, eventName, imageUri, name, time } = invitation
  const hasGuests = guestLimit !== 0

  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center'>
      <div className='w-full flex flex-col justify-center p-8 max-w-xl gap-6'>

        {imageUri && (
          <Image
            className='rounded-md'
            src={imageUri}
            alt="invitation"
            width={512}
            height={512}
          />
        )}

        <p className='w-full'>
          Você recebeu um convite de {' '}
          <span className='font-bold text-green-600 dark:text-green-400'>
            {eventName.toUpperCase()}
          </span>
          {' de '}
          <span className='font-bold text-blue-600 dark:text-blue-400'>
            {name.toUpperCase()}
          </span>.
          {hasGuests && ' Por favor, confirme sua presença e informe os nomes dos seus acompanhantes.'}
          {!hasGuests && ' Por favor, confirme sua presença.'}
        </p>

        <div className='flex flex-col gap-6'>
          <IconText Icon={User2Icon} info={name} />
          <IconText Icon={MapPinIcon} info={address} />
          <IconText Icon={CalendarIcon} info={date} />
          <IconText Icon={ClockIcon} info={time} />
        </div>

        <InvitationGuestForm
          invitationId={invitationId}
          guestId={linkId}
          guest={guest}
          guestLimit={guestLimit}
        />

      </div>
    </div>
  )
}