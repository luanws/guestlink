import { Stack } from 'expo-router'
import { AppProvider } from '../providers'
import { useTheme } from '../providers/theme'

export default function Layout() {
  return (
    <AppProvider>
      <StackScreens />
    </AppProvider>
  )
}

function StackScreens() {
  const { colors, colorScheme } = useTheme()

  return (
    <Stack
      screenOptions={{
        animation: 'fade_from_bottom',
        contentStyle: {
          backgroundColor: colors.contentBackground,
        },
        headerStyle: {
          backgroundColor: colors.headerBackground,
        },
        headerTintColor: colors.headerTint,
        statusBarStyle: 'light',
        statusBarColor: colors.statusBar,
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