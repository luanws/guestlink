import { PropsWithChildren } from 'react'
import { ThemeProvider } from './theme'

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}