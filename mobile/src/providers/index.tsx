import { PropsWithChildren } from 'react'
import { ThemeProvider } from './theme'
import { ApiProvider } from './api'

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <ApiProvider>
        {children}
      </ApiProvider>
    </ThemeProvider>
  )
}