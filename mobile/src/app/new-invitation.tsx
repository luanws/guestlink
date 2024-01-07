import { router } from 'expo-router'
import { ScrollView } from 'native-base'
import { InvitationForm, InvitationFormData } from '../components/form/invitation'
import { InvitationService } from '../services/invitation'

export default function () {
  async function handleSubmit(invitation: InvitationFormData) {
    await InvitationService.createInvitation(invitation)
    router.back()
  }

  return (
    <ScrollView>
      <InvitationForm
        onSubmit={handleSubmit}
        submitButtonText='Criar convite'
      />
    </ScrollView>
  )
}