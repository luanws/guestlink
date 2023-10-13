import { NativeBaseProvider } from 'native-base'
import { PropsWithChildren } from 'react'
import { theme } from '../utils/theme'
import { ColorModeProvider } from './color-mode'

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <NativeBaseProvider theme={theme}>
      <ColorModeProvider>
        {children}
      </ColorModeProvider>
    </NativeBaseProvider>
  )
}