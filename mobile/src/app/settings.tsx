import { Actionsheet, Box, HStack, Icon, Input, ScrollView, Text, VStack } from 'native-base'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { ExpoIcon } from '../components/ui/expo-icon'
import { useApi } from '../providers/api'
import { useTheme } from '../providers/theme'

export default function () {
  return (
    <ScrollView>
      <VStack padding={8} space={8}>
        <ThemeSettings />
        <ApiSettings />
      </VStack>
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
    <>
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
    </>
  )
}

function ApiSettings() {
  if (!__DEV__) return <Box my={-4} />

  const { apiUrl, setApiUrl, restoreDefaultApiUrl, defaultApiUrl } = useApi()
  const [inputApiUrl, setInputApiUrl] = useState<string>(apiUrl == defaultApiUrl ? '' : apiUrl)

  return (
    <VStack space={4}>
      <Text fontSize='xl'>API</Text>
      <Input
        placeholder={defaultApiUrl}
        value={inputApiUrl}
        onChangeText={setInputApiUrl}
        onSubmitEditing={({ nativeEvent: { text } }) => {
          if (text) {
            setApiUrl(text)
          } else {
            restoreDefaultApiUrl()
          }
        }}
      />
    </VStack>
  )
}