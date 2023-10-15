import * as NavigationBar from 'expo-navigation-bar'
import * as SystemUI from 'expo-system-ui'
import { NativeBaseProvider, useColorMode } from 'native-base'
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { useColorScheme } from 'react-native'
import usePersistedState from '../hooks/persisted-state'
import { darkColors, theme as defaultTheme, lightColors } from '../utils/theme'

export type Theme = typeof defaultTheme

type PreferredColorScheme = 'light' | 'dark' | 'auto'

interface ThemeContextData {
  theme: Theme
  colorScheme: 'light' | 'dark'
  colors: Theme['colors']
  setPreferredColorScheme: (colorScheme: PreferredColorScheme) => void
  preferredColorScheme: PreferredColorScheme
}

const ThemeContext = createContext({} as ThemeContextData)

export function ThemeProvider({ children }: PropsWithChildren) {
  const systemColorScheme = useColorScheme()

  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [preferredColorScheme, setPreferredColorScheme] = usePersistedState<PreferredColorScheme>(
    '@preferred-color-scheme',
    'auto'
  )

  const colorScheme = preferredColorScheme === 'auto' ? systemColorScheme : preferredColorScheme
  const colors = theme.colors

  useEffect(() => {
    changeNativeBaseTheme()
    changeBackgroundColor()
    changeNavigationBarColor()
  }, [colorScheme])

  function changeNativeBaseTheme() {
    console.log(colorScheme)
    const newColors = colorScheme === 'dark' ? darkColors : lightColors
    setTheme({
      ...defaultTheme,
      colors: {
        ...colors,
        ...newColors
      }
    })
  }

  function changeBackgroundColor() {
    const backgroundColor = colorScheme === 'dark' ? theme.colors.gray['900'] : theme.colors.gray['100']
    SystemUI.setBackgroundColorAsync(backgroundColor)
  }

  function changeNavigationBarColor() {
    NavigationBar.setBackgroundColorAsync('#00000044')
  }

  return (
    <ThemeContext.Provider value={{
      theme,
      colors,
      colorScheme: colorScheme === 'dark' ? 'dark' : 'light',
      setPreferredColorScheme,
      preferredColorScheme,
    }}>
      <NativeBaseProvider theme={theme}>
        <NativeBaseColorModeManager>
          {children}
        </NativeBaseColorModeManager>
      </NativeBaseProvider>
    </ThemeContext.Provider>
  )
}

function NativeBaseColorModeManager({ children }: PropsWithChildren) {
  const { colorScheme } = useTheme()
  const { setColorMode } = useColorMode()

  useEffect(() => {
    console.log('colorScheme', colorScheme)
    setColorMode(colorScheme)
  }, [colorScheme])

  return children
}

export function useTheme() {
  return useContext(ThemeContext)
}