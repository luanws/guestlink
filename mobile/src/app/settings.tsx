import { Actionsheet, HStack, Icon, ScrollView, Text, VStack } from 'native-base'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { ExpoIcon } from '../components/ui/expo-icon'
import { useTheme } from '../providers/theme'

export default function () {
  return (
    <ScrollView>
      <ThemeSettings />
    </ScrollView>
  )
}

function ThemeSettings() {
  const [isOpenThemeActionSheet, setIsOpenThemeActionSheet] = useState<boolean>(false)

  const { setPreferredColorScheme, colorScheme, preferredColorScheme } = useTheme()

  function handleSelectColorScheme(colorScheme: 'light' | 'dark' | 'auto') {
    setPreferredColorScheme(colorScheme)
    setIsOpenThemeActionSheet(false)
  }

  return (
    <VStack
      paddingX={8}
      paddingY={4}
      space={4}
    >

      <TouchableOpacity onPress={() => setIsOpenThemeActionSheet(true)}>
        <HStack alignItems='center' space={4}>
          <Icon
            as={<ExpoIcon name={colorScheme === 'light' ? 'Feather/sun' : 'Feather/moon'} />}
            size={6}
          />
          <VStack>
            <Text fontSize='xl'>Tema</Text>
            <Text>{{
              light: 'Claro',
              dark: 'Escuro',
              auto: 'Padrão do sistema',
            }[preferredColorScheme]}</Text>
          </VStack>
        </HStack>
      </TouchableOpacity>

      <Actionsheet
        isOpen={isOpenThemeActionSheet}
        onClose={() => setIsOpenThemeActionSheet(false)}
      >
        <Actionsheet.Content>
          <Actionsheet.Item onPress={() => handleSelectColorScheme('auto')}>
            Padrão do sistema
          </Actionsheet.Item>
          <Actionsheet.Item onPress={() => handleSelectColorScheme('light')}>
            Claro
          </Actionsheet.Item>
          <Actionsheet.Item onPress={() => handleSelectColorScheme('dark')}>
            Escuro
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>

    </VStack>
  )
}