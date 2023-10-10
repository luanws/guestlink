import { extendTheme } from 'native-base'
import colorPalette from './color-palette.json'


export const theme = extendTheme({
  colors: {
    primary: colorPalette['Primary'],
    secondary: colorPalette['Complementary'],
  },
  components: {
    Input: {
      defaultProps: {
        variant: 'outline',
        borderRadius: 8,
        bgColor: 'transparent',
        selectionColor: 'primary.100',
        size: 'lg',
        borderWidth: 1.5,
        _focus: {
          borderColor: 'primary.700',
          selectionColor: 'primary.100',
        }
      },
    },
    Button: {
      defaultProps: {
        rounded: 8,
        size: 'lg',
        _pressed: {
          backgroundColor: 'primary.400',
        }
      },
    },
  },
})