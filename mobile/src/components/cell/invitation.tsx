import { HStack, Icon, IconButton, Image, Text, VStack } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { Invitation } from '../../models/invitation'
import { InvitationService } from '../../services/invitation'
import { ExpoIcon } from '../ui/expo-icon'

interface InvitationCellProps {
  invitation: Invitation
  onPress?: (invitation: Invitation) => void
}

export function InvitationCell({ invitation, onPress }: InvitationCellProps) {
  const { name, address, date, eventName, time, imageUri } = invitation

  async function handleShare() {
    await InvitationService.shareInvitation(invitation.id)
  }

  return (
    <TouchableOpacity
      onPress={() => onPress?.(invitation)}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <VStack
        space={1}
        borderWidth={1.5}
        borderColor='muted.300'
        _dark={{ borderColor: 'muted.800' }}
        borderRadius={8}
        overflow='hidden'
      >
        {imageUri && (
          <Image
            w='full'
            h={120}
            resizeMode='cover'
            source={{ uri: imageUri }}
            alt='Foto'
          />
        )}
        <VStack
          paddingY={2}
          paddingX={4}
          space={1}
        >

          <HStack justifyContent='space-between' alignItems='flex-start'>
            <VStack>
              <Text
                fontSize='md'
                color='primary.700'
                _dark={{ color: 'primary.400' }}
              >{eventName}</Text>
              <Text
                fontSize='sm'
                color='secondary.700'
                _dark={{ color: 'secondary.400' }}
              >{name}</Text>
            </VStack>
            <IconButton
              onPress={handleShare}
              icon={
                <Icon
                  as={<ExpoIcon name='MaterialIcons/share' />}
                  size={4}
                  color='primary.400'
                />}
              color='primary.400'
            >
            </IconButton>
          </HStack>

          <HStack space={1} alignItems='center'>
            <Icon
              as={<ExpoIcon name='FontAwesome5/map-marker-alt' />}
              size={4}
            />
            <Text>{address}</Text>
          </HStack>

          <HStack space={4} alignItems='center'>
            <HStack space={1} alignItems='center'>
              <Icon
                as={<ExpoIcon name='MaterialIcons/event' />}
                size={4}
              />
              <Text>{date}</Text>
            </HStack>

            <HStack space={1} alignItems='center'>
              <Icon
                as={<ExpoIcon name='MaterialIcons/access-time' />}
                size={4}
              />
              <Text>{time}</Text>
            </HStack>

          </HStack>

        </VStack>
      </VStack>
    </TouchableOpacity>
  )
}