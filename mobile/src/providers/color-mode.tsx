import * as SystemUI from 'expo-system-ui'
import { useColorMode } from 'native-base'
import { PropsWithChildren, useEffect } from 'react'
import usePersistedState from '../hooks/persisted-state'
import { theme } from '../utils/theme'

export function ColorModeProvider({ children }: PropsWithChildren) {
  const [colorMode] = usePersistedState<string>('colorMode', 'light')
  const { setColorMode } = useColorMode()

  useEffect(() => {
    setColorMode(colorMode)
    const backgroundColor = colorMode === 'dark' ? theme.colors.gray['900'] : theme.colors.gray['100']
    SystemUI.setBackgroundColorAsync(backgroundColor)
  }, [colorMode])

  return children
}