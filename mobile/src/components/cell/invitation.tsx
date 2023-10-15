import { HStack, Icon, IconButton, Image, Text, VStack } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { Invitation, InvitationWithAuthKey } from '../../models/invitation'
import { InvitationService } from '../../services/invitation'
import { ExpoIcon, ExpoIconName } from '../ui/expo-icon'

interface InvitationCellProps {
  invitation: InvitationWithAuthKey
  onPress?: (invitation: Invitation) => void
}

export function InvitationCell({ invitation, onPress }: InvitationCellProps) {
  const { name, address, date, eventName, time, imageUri, authKey } = invitation

  async function handleShare() {
    await InvitationService.shareInvitation(authKey)
  }

  return (
    <TouchableOpacity
      onPress={() => onPress?.(invitation)}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <VStack
        space={1}
        borderWidth={0.5}
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
        {imageUri && (
          <Image
            w='full'
            h={120}
            resizeMode='cover'
            source={{ uri: imageUri }}
            alt='Foto'
          />
        )}
        <VStack paddingY={2} paddingX={4} space={1}>

          <HStack justifyContent='space-between' alignItems='center'>
            <Text
              fontSize='md'
              color='Primary.700'
              _dark={{ color: 'Primary.400' }}
            >{eventName}</Text>
            <IconButton
              onPress={handleShare}
              icon={
                <Icon
                  as={<ExpoIcon name='MaterialIcons/share' />}
                  size={5}
                  color='Primary.400'
                />}
            >
            </IconButton>
          </HStack>

          <VStack space={2}>
            <IconInfo info={name} icon='Feather/user' />
            <IconInfo info={address} icon='Feather/map-pin' />
            <IconInfo info={date} icon='Feather/calendar' />
            <IconInfo info={time} icon='Feather/clock' />
          </VStack>

        </VStack>
      </VStack>
    </TouchableOpacity>
  )
}

function IconInfo({ info, icon }: { info: string, icon: ExpoIconName }) {
  return (
    <HStack space={2} alignItems='center'>
      <Icon
        as={<ExpoIcon name={icon} />}
        size={4}
      />
      <Text>{info}</Text>
    </HStack>
  )
}