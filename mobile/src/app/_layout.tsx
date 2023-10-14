import { Stack } from 'expo-router'
import { useColorMode } from 'native-base'
import { AppProvider } from '../providers'
import { theme } from '../utils/theme'

export default function Layout() {
  return (
    <AppProvider>
      <StackScreens />
    </AppProvider>
  )
}

function StackScreens() {
  const { colorMode } = useColorMode()

  return (
    <Stack
      screenOptions={{
        animation: 'fade_from_bottom',
        contentStyle: {
          backgroundColor: colorMode === 'dark' ? theme.colors.gray['900'] : theme.colors.gray['100'],
        },
        headerStyle: {
          backgroundColor: colorMode === 'dark' ? theme.colors.gray['800'] : theme.colors.gray['100'],
        },
        headerTintColor: colorMode === 'dark' ? theme.colors.gray['100'] : theme.colors.gray['900'],
        statusBarStyle: colorMode === 'dark' ? 'light' : 'dark',
        statusBarColor: colorMode === 'dark' ? theme.colors.gray['800'] : theme.colors.gray['100'],
        navigationBarColor: 'black',
      }}
    >
      <Stack.Screen
        name='index'
        options={{
          title: 'Convites',
          headerShown: false
        }}
      />
      <Stack.Screen
        name='new-invitation'
        options={{
          title: 'Novo convite',
        }}
      />
      <Stack.Screen
        name='settings'
        options={{
          title: 'Configurações',
        }}
      />
      <Stack.Screen
        name='invitation/[invitationId]'
        options={{
          title: 'Convite',
        }}
      />
    </Stack>
  )
}