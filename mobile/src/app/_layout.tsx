import { Stack } from 'expo-router'
import '../config/firebase'
import { AppProvider } from './app-provider'

export default function Layout() {
  return (
    <AppProvider>
      <Stack>
        <Stack.Screen
          name='index'
          options={{
            title: 'Convites',
            animation: 'fade_from_bottom',
            headerShown: false
          }}
        />
        <Stack.Screen
          name='new-invitation'
          options={{
            title: 'Novo convite',
            animation: 'fade_from_bottom'
          }}
        />
      </Stack>
    </AppProvider>
  )
}