import { isEmptyObject } from '~/utils'

import browserHistory from './browserHistory'

const DATA_KEY = 'data'

const removeValueEmpty = (data: unknown) => {
  if (typeof data !== 'object' || !data) return !!data

  const dataEntries = Object.entries(data as GenericObject).filter(([, value]) => {
    if (
      (value && typeof value === 'object' && isEmptyObject(value as GenericObject)) ||
      (typeof value === 'string' && !value.length)
    ) {
      return false
    }
    return true
  })
  return Object.fromEntries(dataEntries)
}

export const urlSearchParams = () => {
  const { search } = browserHistory.location
  return new URLSearchParams(search)
}

export const remove = (name: string) => {
  const urlSearch = urlSearchParams()
  urlSearch.delete(name)
  browserHistory.replace({ search: urlSearch.toString() })
}

export const get = <T = unknown>(name: string): T | null => {
  try {
    const urlSearch = urlSearchParams()
    const value = urlSearch.get(name)

    if (value === null) return value

    const dataParsed = JSON.parse(window.atob(value))
    return dataParsed[DATA_KEY]
  } catch {
    return null
  }
}

export const set = (name: string, data: unknown) => {
  const dataFormatted = removeValueEmpty(data)

  const dataEncoded = window.btoa(JSON.stringify({ [DATA_KEY]: dataFormatted }))
  const urlSearch = urlSearchParams()

  urlSearch.set(name, dataEncoded.replace(/=/g, ''))

  browserHistory.replace({ search: urlSearch.toString() })
}
