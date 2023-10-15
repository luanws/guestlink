import { extendTheme } from 'native-base'
import darkPalette from '../../assets/colors/dark.json'
import lightPalette from '../../assets/colors/light.json'

export const lightColors = {
    ...lightPalette,
    background: '#fff',
    tint: '#2f95dc',
    tabIconDefault: '#ccc',
    tabIconSelected: '#2f95dc',
    statusBar: lightPalette.Primary['900'],
    contentBackground: '#f2f2f2',
    headerTint: 'white',
    headerBackground: lightPalette.Primary['900'],
    tabBarActiveTint: '#2f95dc',
    tabBarInactiveTint: '#ccc',
}

export const darkColors: ColorsType = {
    ...darkPalette,
    background: '#000',
    tint: '#fff',
    tabIconDefault: '#ccc',
    tabIconSelected: '#fff',
    statusBar: '#262628',
    contentBackground: '#18181b',
    headerTint: '#f4f4f5',
    headerBackground: '#27272a',
    tabBarActiveTint: '#fff',
    tabBarInactiveTint: '#ccc',
}

export const theme = extendTheme({
    colors: lightColors,
    components: {
        Input: {
            defaultProps: {
                variant: 'outline',
                borderRadius: 8,
                bgColor: 'transparent',
                selectionColor: 'Primary.100',
                size: 'lg',
                borderWidth: 1.5,
                _focus: {
                    borderColor: 'Primary.700',
                    selectionColor: 'Primary.100',
                }
            },
        },
        Button: {
            defaultProps: {
                rounded: 8,
                size: 'lg',
                _pressed: {
                    backgroundColor: 'Primary.400',
                }
            },
        },
    },
})


type ColorsType = typeof lightColors
type CustomThemeType = typeof theme

declare module 'native-base' {
    interface ICustomTheme extends CustomThemeType { }
}