import { useColorMode } from 'native-base'
import { PropsWithChildren, useEffect } from 'react'
import usePersistedState from '../hooks/persisted-state'

export function ColorModeProvider({ children }: PropsWithChildren) {
  const [persistedColorMode] = usePersistedState<string>('colorMode', 'light')
  const { setColorMode } = useColorMode()

  useEffect(() => {
    setColorMode(persistedColorMode)
  }, [persistedColorMode])

  return children
}