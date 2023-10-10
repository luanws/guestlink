import { MaterialIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

export default function TabsScreen() {
  return (
    <Tabs>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='home' size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name='invitations'
        options={{
          title: 'Convites',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='event' size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}