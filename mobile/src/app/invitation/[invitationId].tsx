import { router, useGlobalSearchParams } from 'expo-router'
import { Box, Center, HStack, Heading, Icon, IconButton, Image, ScrollView, Text, VStack } from 'native-base'
import { useEffect, useState } from 'react'
import { GuestCell } from '../../components/cell/guest'
import { ExpoIcon, ExpoIconName } from '../../components/ui/expo-icon'
import { Invitation } from '../../models/invitation'
import { InvitationService } from '../../services/invitation'

import { Text as _Text } from 'react-native'

export default function () {
  const { invitationId } = useGlobalSearchParams<{ invitationId: string }>()

  const [invitation, setInvitation] = useState<Invitation | undefined>(undefined)

  useEffect(() => {
    updateInvitation()
  }, [])

  async function updateInvitation() {
    const invitation = await InvitationService.getInvitation(invitationId)
    setInvitation(invitation)
  }

  return (
    <ScrollView>
      <VStack>
        {invitation && <InvitationShow invitation={invitation} />}
      </VStack>
    </ScrollView>
  )
}

interface InvitationShowProps {
  invitation: Invitation
}

function InvitationShow({ invitation }: InvitationShowProps) {
  const { address, date, eventName, id, imageUri, name, time, guests } = invitation

  async function handleShare() {
    await InvitationService.shareInvitation(invitation.id)
  }

  async function handleDelete() {
    await InvitationService.deleteInvitation(id)
    router.back()
  }

  return (
    <VStack space={1}>


      {imageUri && (
        <Image
          w='full'
          h={200}
          resizeMode='cover'
          source={{ uri: imageUri }}
          alt='Foto'
        />
      )}

      <VStack paddingY={8} paddingX={8} space={8}>

        <HStack alignItems='flex-start' flexWrap='wrap'>
          <Text fontSize='md'>
            Este é um convite de {' '}
          </Text>
          <Text
            color='Primary.700'
            fontWeight='bold'
            fontSize='md'
            _dark={{ color: 'Primary.400' }}
          >{eventName}</Text>
        </HStack>

        <VStack space={4}>
          <IconInfo icon='Feather/user' info={name} />
          <IconInfo icon='Feather/map-pin' info={address} />
          <IconInfo icon='Feather/calendar' info={date} />
          <IconInfo icon='Feather/clock' info={time} />
        </VStack>

        <HStack justifyContent='space-around' marginTop={8}>
          <IconButton
            onPress={handleShare}
            icon={
              <Icon
                as={<ExpoIcon name='MaterialIcons/share' />}
                size={6}
                color='Primary.500'
                _dark={{ color: 'Primary.400' }}
              />
            }
          />
          <IconButton
            onPress={handleDelete}
            icon={
              <Icon
                as={<ExpoIcon name='MaterialIcons/delete' />}
                size={6}
                color='danger.500'
              />
            }
          />
        </HStack>

        {!!guests && (
          <Box>
            <HStack mt={8} mb={4} alignItems='center' space={2}>
              <Icon
                as={<ExpoIcon name='MaterialIcons/person' />}
                size='lg'
                color='text.50'
              />
              <Heading fontSize='lg'>
                Lista de convidados
              </Heading>
            </HStack>
            <VStack space={4}>
              {Object.entries(guests).map(([guestId, guest]) =>
                <GuestCell key={guestId} guest={guest} />
              )}
            </VStack>
          </Box>
        )}
        {!guests && (
          <Center>
            <Text mt={4} mb={2}>
              Nenhum convidado confirmou presença
            </Text>
          </Center>
        )}

      </VStack>

    </VStack>
  )
}

function IconInfo({ info, icon }: { info: string, icon: ExpoIconName }) {
  return (
    <HStack space={2} alignItems='center'>
      <Icon
        as={<ExpoIcon name={icon} />}
        size={5}
      />
      <Text fontSize='md'>{info}</Text>
    </HStack>
  )
}