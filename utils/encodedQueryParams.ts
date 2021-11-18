/** TODO: Finalizar */
import browserHistory from './browserHistory'

const DATA_KEY = 'data'

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
  const dataEncoded = window.btoa(JSON.stringify({ [DATA_KEY]: data }))
  const urlSearch = urlSearchParams()
  urlSearch.set(name, dataEncoded)

  browserHistory.replace({ search: urlSearch.toString() })
}
