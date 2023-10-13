import { HStack, Icon, Text, VStack } from 'native-base'
import { Guest } from '../../models/guest'
import { ExpoIcon } from '../ui/expo-icon'

interface GuestCellProps {
  guest: Guest
}

export function GuestCell({ guest }: GuestCellProps) {
  const { name, companions } = guest
  return (
    <VStack>
      <Text
        color='secondary.400'
        fontSize='md'
      >
        {name}
      </Text>
      <VStack>
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