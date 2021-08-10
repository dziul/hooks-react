import { useState } from 'react'

const generateKey = (key: string) => {
  return `@/${key}`
}

export const getItem = <V = unknown, K extends string = string>(key: K): V | null => {
  const keyItem = generateKey(key)
  const valueItem = window.localStorage.getItem(keyItem)
  return valueItem ? JSON.parse(valueItem).data : null
}

export const setItem = <K extends string = string, V = unknown>(
  key: K,
  value: V
): void => {
  const keyItem = generateKey(key)
  const valueItem = JSON.stringify({ data: value })

  window.localStorage.setItem(keyItem, valueItem)
}

const useLocalStorage = <K extends string = string, V = unknown>(
  key: K,
  initialValue?: V
) => {
  const [storedValue, setStoredValue] = useState(() => {
    return getItem(key) || initialValue || null
  })

  const setValue = (value: V) => {
    setStoredValue(value)
    setItem(key, value)
  }
  return [storedValue, setValue] as [typeof storedValue, typeof setValue]
}

export default useLocalStorage
