import AsyncStorage from '@react-native-async-storage/async-storage'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

function usePersistedState<T>(key: string, defaultState: T): [T, Dispatch<SetStateAction<T>>, boolean] {
    const [state, setState] = useState<T>(defaultState)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        AsyncStorage.getItem(key).then(json => {
            const state: T | undefined = json ? JSON.parse(json) : undefined
            if (state !== undefined) {
                setState(state)
            }
            setIsLoading(false)
        })
    }, [])

    useEffect(() => {
        if (state !== undefined && state !== null) {
            AsyncStorage.setItem(key, JSON.stringify(state))
        }
    }, [state])

    return [state, setState, isLoading]
}

export default usePersistedState