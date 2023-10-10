import { NativeBaseProvider } from 'native-base'
import { PropsWithChildren } from 'react'
import { theme } from '../utils/theme'

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <NativeBaseProvider theme={theme}>
      {children}
    </NativeBaseProvider>
  )
}