import { MaterialIcons } from '@expo/vector-icons'
import { Link, router, useFocusEffect } from 'expo-router'
import * as Updates from 'expo-updates'
import { Box, Button, Divider, Fab, HStack, Heading, Icon, ScrollView, Text, VStack } from 'native-base'
import { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { InvitationCell } from '../components/cell/invitation'
import { InvitationsSkeleton } from '../components/skeleton/invitation'
import { ExpoIcon } from '../components/ui/expo-icon'
import { Invitation } from '../models/invitation'
import { InvitationService } from '../services/invitation'

export default function InvitationsScreen() {
  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <SettingsButton />
          <VStack space={8} marginBottom={24}>
            <UpdateAppCard />
            <InvitationList />
          </VStack>
        </ScrollView>
      </SafeAreaView>
      <NewInvitationFab />
    </>
  )
}

function SettingsButton() {
  return (
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
  )
}

function UpdateAppCard() {
  const [updateAvailable, setUpdateAvailable] = useState<boolean>(false)

  useEffect(() => {
    checkUpdate()
  }, [])

  async function checkUpdate() {
    if (__DEV__) return
    const update = await Updates.checkForUpdateAsync()
    setUpdateAvailable(update.isAvailable)
  }

  async function handleUpdate() {
    await Updates.fetchUpdateAsync()
    await Updates.reloadAsync()
  }

  if (!updateAvailable) return <Box my={-4} />

  return (
    <Box
      marginX={8}
      padding={4}
      borderRadius={8}
      overflow='hidden'
      _light={{
        borderColor: 'muted.200',
        backgroundColor: 'white'
      }}
      _dark={{
        backgroundColor: 'muted.800',
        borderColor: 'transparent',
      }}
    >
      <VStack space={4}>
        <VStack>
          <HStack alignItems='center' space={2}>
            <Icon as={<ExpoIcon name='MaterialIcons/update' />} size={6} />
            <Heading fontSize='lg'>Atualização disponível</Heading>
          </HStack>
          <Divider mt={2} />
        </VStack>
        <VStack>
          <Text>
            Uma nova versão do aplicativo está disponível.
            Clique no botão abaixo para atualizar.
          </Text>
        </VStack>
        <Button onPress={handleUpdate}>
          Atualizar
        </Button>
      </VStack>
    </Box>
  )
}

function InvitationList() {
  const [invitations, setInvitations] = useState<Invitation[] | undefined>(undefined)

  useFocusEffect(useCallback(() => {
    updateInvitations()
  }, []))

  async function updateInvitations() {
    const invitations = await InvitationService.getUserInvitations()
    setInvitations(invitations)
  }

  async function handleOpenInvitation(invitation: Invitation) {
    router.push(`/invitation/${invitation.id}`)
  }

  return (
    <VStack paddingX={8}>
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
                  onPress={() => handleOpenInvitation(invitation)}
                  invitation={invitation}
                />
              ))}
            </VStack>
          </ScrollView>
        )}
      </Box>
    </VStack>
  )
}

function NewInvitationFab() {
  return (
    <Fab
      renderInPortal={false}
      right={4}
      bottom={4}
      icon={<Icon as={<MaterialIcons name='add' />} size={6} />}
      onPress={() => {
        router.push('/new-invitation')
      }}
    />
  )
}