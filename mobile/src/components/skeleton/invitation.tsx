import { Skeleton, VStack } from 'native-base'

interface InvitationSkeletonsProps {
  length: number
}

export function InvitationsSkeleton({ length }: InvitationSkeletonsProps) {
  return (
    <VStack space={4}>
      {Array.from({ length }).map((_, index) => (
        <VStack
          key={index}
          space={2}
          borderWidth={1.5}
          borderColor='muted.300'
          _dark={{ borderColor: 'muted.800' }}
          borderRadius={8}
          overflow='hidden'
          paddingBottom={2}
        >
          <Skeleton h={100} rounded={4} />
          <VStack paddingX={4} space={1}>
            <Skeleton h={4} w={40} rounded={4} />
            <Skeleton h={4} w={40} rounded={4} />
          </VStack>
        </VStack>
      ))}
    </VStack>
  )
}