import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Fab, Heading, Icon, ScrollView, Text, VStack } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function InvitationsScreen() {

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <VStack padding={8}>
            <Heading>Convites</Heading>
            <VStack>
              <Text>Você não possui convites</Text>
            </VStack>
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