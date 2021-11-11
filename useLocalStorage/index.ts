import { useState } from 'react'

interface Data {
  data: unknown
}

const parse = (value: string) => (JSON.parse(value) as Data).data
const stringify = (value: unknown) => JSON.stringify({ data: value } as Data)

export const getItem = <K extends string = string>(key: K): unknown => {
  const valueItem = window.localStorage.getItem(key)
  return valueItem ? parse(valueItem) : null
}

export const setItem = <K extends string = string, V = unknown>(
  key: K,
  value: V
): void => {
  const valueItem = stringify(value)
  window.localStorage.setItem(key, valueItem)
}

const useLocalStorage = <K extends string = string, V = unknown>(
  key: K,
  defaultValue?: V,
  prefix = '@/'
) => {
  const keyItem = prefix + key
  const [storedValue, setStoredValue] = useState(
    () => (getItem(keyItem) || defaultValue) ?? null
  )

  const setValue = (value: V) => {
    setStoredValue(value)
    setItem(keyItem, value)
  }
  return [storedValue, setValue] as [typeof storedValue, typeof setValue]
}

export default useLocalStorage
