import { Center, HStack, Icon, ScrollView, Switch, Text, VStack, useColorMode } from 'native-base'
import { ExpoIcon } from '../components/ui/expo-icon'
import usePersistedState from '../hooks/persisted-state'

export default function () {
  const [, setPersistedColorMode] = usePersistedState<string>('colorMode', 'light')

  const { colorMode, setColorMode } = useColorMode()

  function handleToggle() {
    const newColorMode = colorMode === 'dark' ? 'light' : 'dark'
    setColorMode(newColorMode)
    setPersistedColorMode(newColorMode)
  }

  return (
    <ScrollView>
      <VStack
        paddingX={8}
        paddingY={4}
        space={4}
      >

        <HStack w='full' alignItems='center' justifyContent='space-between'>
          <Center>
            <HStack alignItems='center' justifyContent='center' space={2}>
              <Icon
                as={<ExpoIcon name='Feather/moon' />}
                size={6}
              />
              <Text>Modo escuro</Text>
            </HStack>
          </Center>
          <Switch isChecked={colorMode === 'dark'} onToggle={handleToggle} />
        </HStack>

      </VStack>
    </ScrollView>
  )
}