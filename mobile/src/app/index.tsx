import { MaterialIcons } from '@expo/vector-icons'
import { Link, router, useFocusEffect } from 'expo-router'
import { Box, Fab, Heading, Icon, ScrollView, Text, VStack } from 'native-base'
import { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { InvitationCell } from '../components/cell/invitation'
import { InvitationsSkeleton } from '../components/skeleton/invitation'
import { ExpoIcon } from '../components/ui/expo-icon'
import { NewInvitation } from '../models/invitation'
import { InvitationService } from '../services/invitation'

export default function InvitationsScreen() {
  const [invitations, setInvitations] = useState<NewInvitation[] | undefined>(undefined)

  useFocusEffect(useCallback(() => {
    updateInvitations()
  }, []))

  async function updateInvitations() {
    const invitations = await InvitationService.getInvitations()
    setInvitations(invitations)
  }

  return (
    <>

      <SafeAreaView>
        <ScrollView>

          <Box
            w='full'
            alignItems='flex-end'
            justifyContent='flex-end'
            padding={4}
          >
            <Link href='/settings'>
              <Icon as={<ExpoIcon name='Feather/settings' />} size={6} color='muted.500' />
            </Link>
          </Box>

          <VStack paddingX={8} marginBottom={24}>
            <Heading marginBottom={4}>Convites</Heading>
            <Box>
              {invitations === undefined && <InvitationsSkeleton length={2} />}
              {invitations?.length === 0 && (
                <Text>Você não possui convites</Text>
              )}
              {invitations && invitations.length > 0 && (
                <ScrollView>
                  <VStack space={4}>
                    {invitations.map((invitation, index) => (
                      <InvitationCell
                        key={index}
                        invitation={invitation}
                      />
                    ))}
                  </VStack>
                </ScrollView>
              )}
            </Box>
          </VStack>

        </ScrollView>
      </SafeAreaView>

      <Fab
        renderInPortal={false}
        right={4}
        bottom={4}
        icon={<Icon as={<MaterialIcons name='add' />} size={6} />}
        onPress={() => {
          router.push('/new-invitation')
        }}
      />

    </>
  )
}