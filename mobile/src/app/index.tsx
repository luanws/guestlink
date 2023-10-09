import { Link } from 'expo-router'
import React from 'react'
import { View, Text } from 'react-native'

// import styles from './styles'

export default function IndexScreen() {
  return (
    <View>
      <Link href='/profile'>
        <Text>Index</Text>
      </Link>
    </View>
  )
}