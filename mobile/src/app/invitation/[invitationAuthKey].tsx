import { router, useGlobalSearchParams } from 'expo-router'
import { AlertDialog, Box, Button, Center, Divider, HStack, Icon, IconButton, Image, ScrollView, Text, VStack } from 'native-base'
import { useEffect, useRef, useState } from 'react'
import { GuestCell } from '../../components/cell/guest'
import { ExpoIcon, ExpoIconName } from '../../components/ui/expo-icon'
import { Invitation } from '../../models/invitation'
import { InvitationService } from '../../services/invitation'


export default function () {
  const { invitationAuthKey } = useGlobalSearchParams<{ invitationAuthKey: string }>()

  const [invitation, setInvitation] = useState<Invitation | null | undefined>(undefined)

  useEffect(() => {
    updateInvitation()
  }, [])

  async function updateInvitation() {
    const invitation = await InvitationService.getInvitation(invitationAuthKey)
    setInvitation(invitation)
  }

  return (
    <ScrollView>
      {invitation && (
        <InvitationShow
          invitation={invitation}
          invitationAuthKey={invitationAuthKey}
        />
      )}
    </ScrollView>
  )
}

function InvitationShow({ invitation, invitationAuthKey }: {
  invitation: Invitation
  invitationAuthKey: string
}) {
  const { imageUri, eventName, guests } = invitation

  return (
    <VStack space={1}>
      <InvitationImage imageUri={imageUri} />
      <VStack paddingY={8} paddingX={8} space={8}>
        <EventNameText eventName={eventName} />
        <IconInfoList invitation={invitation} />
        <ActionButtonList invitationAuthKey={invitationAuthKey} />
        <GuestList invitationAuthKey={invitationAuthKey} guests={guests} />
      </VStack>
    </VStack>
  )
}

function InvitationImage({ imageUri }: { imageUri?: string | null }) {
  if (!imageUri) return null

  return (
    <Image
      w='full'
      h={200}
      resizeMode='cover'
      source={{ uri: imageUri }}
      alt='Foto'
    />
  )
}

function EventNameText({ eventName }: { eventName: string }) {
  return (
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
  )
}

function IconInfoList({ invitation: { name, address, date, time, guests } }: { invitation: Invitation }) {
  const numberOfParticipants = Object.values(guests ?? {}).reduce(
    (acc, guest) => acc + (guest.companions?.length ?? 0) + 1,
    0
  )

  return (
    <VStack space={4}>
      <IconInfo icon='Feather/user' info={name} />
      <IconInfo icon='Feather/map-pin' info={address} />
      <IconInfo icon='Feather/calendar' info={date} />
      <IconInfo icon='Feather/clock' info={time} />
      <IconInfo icon='Feather/users' info={
        `${numberOfParticipants} ${numberOfParticipants === 1 ? 'participante' : 'participantes'}`
      } />
    </VStack>
  )
}

function IconInfo({ info, icon }: { info: string, icon: ExpoIconName }) {
  return (
    <HStack space={2} alignItems='center'>
      <Icon
        as={<ExpoIcon name={icon} />}
        size='md'
      />
      <Text fontSize='md'>{info}</Text>
    </HStack>
  )
}

function ActionButtonList({ invitationAuthKey }: { invitationAuthKey: string }) {
  return (
    <HStack justifyContent='space-around'>
      <ShareButton invitationAuthKey={invitationAuthKey} />
      <DeleteInvitationButton invitationAuthKey={invitationAuthKey} />
    </HStack>
  )
}

function ShareButton({ invitationAuthKey }: { invitationAuthKey: string }) {
  async function handleShare() {
    await InvitationService.shareInvitation(invitationAuthKey)
  }

  return (
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
  )
}

function DeleteInvitationButton({ invitationAuthKey }: { invitationAuthKey: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const cancelRef = useRef(null)

  const openDialog = () => setIsOpen(true)
  const closeDialog = () => setIsOpen(false)

  async function handleDelete() {
    await InvitationService.deleteInvitation(invitationAuthKey)
    closeDialog()
    router.back()
  }

  return (
    <Center>
      <IconButton
        colorScheme='danger'
        onPress={openDialog}
        icon={
          <Icon
            as={<ExpoIcon name='MaterialIcons/delete' />}
            size={6}
          />
        }
      />
      <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={closeDialog}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Excluir convite</AlertDialog.Header>
          <AlertDialog.Body>
            Tem certeza que deseja excluir este convite?
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button variant='unstyled' colorScheme='coolGray' onPress={closeDialog} ref={cancelRef}>
                Cancel
              </Button>
              <Button colorScheme='danger' onPress={handleDelete}>
                Excluir
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  )
}

function GuestList({ guests, invitationAuthKey }: { guests?: Invitation['guests'], invitationAuthKey: string }) {
  return (
    <Box>
      <HStack alignItems='center' space={2}>
        <Icon
          as={<ExpoIcon name='Feather/users' />}
          size='md'
        />
        <Text fontSize='lg'>
          Lista de convidados
        </Text>
      </HStack>
      <Divider mb={4} mt={2} />
      {!!guests && (
        <VStack space={4}>
          {Object.entries(guests).map(([guestId, guest]) =>
            <GuestCell
              key={guestId}
              guest={guest}
              guestId={guestId}
              invitationAuthKey={invitationAuthKey}
            />
          )}
        </VStack>
      )}
      {!guests && (
        <Center>
          <Text mt={4} mb={2}>
            Nenhum convidado confirmou presença
          </Text>
        </Center>
      )}
    </Box>
  )
}