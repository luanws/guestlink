import { PropsWithChildren, createContext, useContext, useEffect } from 'react'
import usePersistedState from '../hooks/persisted-state'
import { api, defaultApiUrl } from '../lib/api'

interface ApiContextData {
  apiUrl: string
  setApiUrl: (apiUrl: string) => void
  defaultApiUrl: string
  restoreDefaultApiUrl: () => void
}

const ApiContext = createContext({} as ApiContextData)

export function ApiProvider({ children }: PropsWithChildren) {
  const [apiUrl, setApiUrl] = usePersistedState<string>('apiUrl', defaultApiUrl)

  useEffect(() => {
    api.defaults.baseURL = apiUrl
  }, [apiUrl])

  function restoreDefaultApiUrl() {
    setApiUrl(defaultApiUrl)
  }

  return (
    <ApiContext.Provider value={{
      apiUrl,
      setApiUrl,
      defaultApiUrl,
      restoreDefaultApiUrl,
    }}>
      {children}
    </ApiContext.Provider>
  )
}

export function useApi() {
  return useContext(ApiContext)
}