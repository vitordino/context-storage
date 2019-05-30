import React, { createContext, useContext, useState, useEffect } from 'react'

type StateHook<V> = () => [V | undefined, (v: V) => void]

/* istanbul ignore next */
/* prettier-ignore */
const noop = () => {/* noop */}

const isBrowser: boolean = typeof localStorage === 'object'

export default function createStorage<V>(
  key: string,
  fallbackValue?: V,
  parse?: () => any,
  stringify?: () => any,
): [React.FunctionComponent, StateHook<V>] {
  const storageString: string = isBrowser && localStorage.getItem(key) || 'null'
  const storedValue: V = JSON.parse(storageString, parse)
  const initialValue: any = storedValue != null ? storedValue : fallbackValue

  const ValueContext = createContext(initialValue)
  const SetterContext = createContext(noop)
  const useStorage: StateHook<V> = () => [
    useContext(ValueContext),
    useContext(SetterContext),
  ]

  const Provider: React.FunctionComponent = ({ children }) => {
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
      if(!isBrowser) return
      localStorage.setItem(key, JSON.stringify(value, stringify))
    }, [value])

    return (
      <ValueContext.Provider value={value}>
        <SetterContext.Provider value={setValue as () => void}>
          {children}
        </SetterContext.Provider>
      </ValueContext.Provider>
    )
  }

  return [Provider, useStorage]
}
