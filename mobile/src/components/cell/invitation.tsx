import { HStack, Icon, Image, Text, VStack } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { Invitation } from '../../models/invitation'
import { ExpoIcon } from '../ui/expo-icon'

interface InvitationCellProps {
  invitation: Invitation
  onPress?: (invitation: Invitation) => void
}

export function InvitationCell({ invitation, onPress }: InvitationCellProps) {
  const { name, address, date, eventName, imageBase64, time } = invitation

  return (
    <TouchableOpacity
      onPress={() => onPress?.(invitation)}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <VStack
        space={1}
        borderWidth={1}
        borderColor='muted.300'
        borderRadius={8}
        overflow='hidden'
      >
        <Image
          w='full'
          h={120}
          resizeMode='cover'
          source={{ uri: `data:image/png;base64,${imageBase64}` }}
          alt='Foto'
        />
        <VStack
          paddingY={2}
          paddingX={4}
          space={1}
        >
          <Text
            fontSize='md'
            color='primary.700'
          >{eventName}</Text>
          <Text
            fontSize='sm'
            color='secondary.700'
          >{name}</Text>
          <HStack space={1} alignItems='center'>
            <Icon
              as={<ExpoIcon name='FontAwesome5/map-marker-alt' />}
              size={4}
              color='muted.500'
            />
            <Text
              color='muted.500'
            >{address}</Text>
          </HStack>
          <HStack space={4} alignItems='center'>
            <HStack space={1} alignItems='center'>
              <Icon
                as={<ExpoIcon name='MaterialIcons/event' />}
                size={4}
                color='muted.500'
              />
              <Text
                color='muted.500'
              >{date}</Text>
            </HStack>
            <HStack space={1} alignItems='center'>
              <Icon
                as={<ExpoIcon name='MaterialIcons/access-time' />}
                size={4}
                color='muted.500'
              />
              <Text
                color='muted.500'
              >{time}</Text>
            </HStack>
          </HStack>
        </VStack>
      </VStack>
    </TouchableOpacity>
  )
}