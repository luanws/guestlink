import { HStack, Icon, IconButton, Text, VStack } from 'native-base'
import { Guest } from '../../models/guest'
import { InvitationService } from '../../services/invitation'
import { ExpoIcon } from '../ui/expo-icon'

interface GuestCellProps {
  guest: Guest
  guestId: string
  invitationId: string
}

export function GuestCell({ guest, guestId, invitationId }: GuestCellProps) {
  const { name, companions } = guest

  async function handleShare() {
    await InvitationService.shareInvitationToExistingGuest(invitationId, guestId)
  }

  return (
    <VStack
      position='relative'
      space={2}
      borderWidth={0.5}
      padding={4}
      _light={{
        borderColor: 'muted.200',
        backgroundColor: 'white'
      }}
      _dark={{
        backgroundColor: 'muted.800',
        borderColor: 'transparent',
      }}
      borderRadius={8}
      overflow='hidden'
    >

      <Text
        color='primary.500'
        fontSize='md'
        fontWeight='bold'
        marginRight={8}
      >{name}</Text>

      <IconButton
        position='absolute'
        right={2}
        top={2}
        onPress={handleShare}
        icon={
          <Icon
            as={<ExpoIcon name='MaterialIcons/share' />}
            size='md'
            color='Primary.500'
            _dark={{ color: 'Primary.400' }}
          />
        }
      />

      <VStack space={0}>
        {companions.map((companion, index) => (
          <HStack
            key={index}
            alignItems='center'
          >
            <Text fontSize='sm' mx={2}>
              -
            </Text>
            <Text fontSize='sm'>
              {companion}
            </Text>
          </HStack>
        ))}
      </VStack>
    </VStack>
  )
}