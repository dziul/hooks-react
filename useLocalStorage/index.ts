import { useState } from 'react'

const useLocalStorage = <V = unknown>(
  key: string,
  initialValue?: V,
  prefixKey = '@/'
) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(prefixKey + key)
    return (item ? JSON.parse(item) : initialValue) as V | undefined
  })

  const setValue = (value: V) => {
    setStoredValue(value)
    window.localStorage.setItem(prefixKey + key, JSON.stringify(value))
  }
  return [storedValue, setValue] as [typeof storedValue, typeof setValue]
}

export default useLocalStorage
