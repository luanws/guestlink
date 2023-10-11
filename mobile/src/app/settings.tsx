import { Center, HStack, Icon, ScrollView, Switch, Text, VStack, theme, useColorMode } from 'native-base'
import { useEffect } from 'react'
import { ExpoIcon } from '../components/ui/expo-icon'

export default function () {
  const { colorMode, toggleColorMode, } = useColorMode()

  useEffect(() => {
    console.log(JSON.stringify(theme.colors, null, 2))
  }, [colorMode])

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
          <Switch isChecked={colorMode === 'dark'} onToggle={toggleColorMode} />
        </HStack>

      </VStack>
    </ScrollView>
  )
}