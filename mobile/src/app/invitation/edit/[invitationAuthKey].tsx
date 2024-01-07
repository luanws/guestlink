import { router, useGlobalSearchParams } from 'expo-router'
import { Center, ScrollView, Spinner, Text } from 'native-base'
import { useEffect, useState } from 'react'
import { InvitationForm, InvitationFormData } from '../../../components/form/invitation'
import { Invitation } from '../../../models/invitation'
import { InvitationService } from '../../../services/invitation'

export default function () {
  const { invitationAuthKey } = useGlobalSearchParams<{ invitationAuthKey: string }>()

  const [invitation, setInvitation] = useState<Invitation | null | undefined>(undefined)

  useEffect(() => {
    fetchInvitation()
  }, [])

  async function fetchInvitation() {
    const invitation = await InvitationService.getInvitation(invitationAuthKey)
    setInvitation(invitation)
  }

  async function handleSubmit(data: InvitationFormData) {
    await InvitationService.updateInvitation(data, invitationAuthKey)
    router.back()
  }

  if (invitation) {
    return (
      <ScrollView>
        <InvitationForm
          onSubmit={handleSubmit}
          submitButtonText='Editar convite'
          defaultValues={{
            ...invitation,
            imageUri: invitation.imageUri ?? '',
          }}
        />
      </ScrollView>
    )
  }

  if (invitation === null) {
    return (
      <Center flex={1}>
        <Text>Convite não encontrado</Text>
      </Center>
    )
  }

  if (invitation === undefined) {
    return (
      <Center flex={1}>
        <Spinner
          size='lg'
          color='gray.500'
        />
      </Center>
    )
  }
}