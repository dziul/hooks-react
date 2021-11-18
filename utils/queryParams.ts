import { parse, stringify, exclude, pick } from 'query-string'

import browserHistory from './browserHistory'

const parseStringQuery = (search: string) =>
  parse(search, { arrayFormat: 'comma', parseNumbers: true, parseBooleans: true })
const stringifyQuery = (data: GenericObject) =>
  stringify(data, { arrayFormat: 'comma', encode: false })

export const getAll = () => {
  const { search } = browserHistory.location
  const parsed = parseStringQuery(search)
  return { ...parsed }
}

export const get = <T extends GenericObject>(...names: (keyof T)[]) => {
  const { search } = browserHistory.location

  const searchPicked = pick(search, names as string[], {
    arrayFormat: 'comma',
    parseBooleans: true,
    parseNumbers: true,
  })
  const parsed = parseStringQuery(searchPicked)
  return { ...parsed } as Partial<T>
}

export const remove = <T extends GenericObject>(...names: (keyof T)[]) => {
  const { search } = browserHistory.location
  const excluded = exclude(search, names as string[])
  browserHistory.replace({ search: excluded })
}

export const setInBatch = (data: GenericObject) => {
  const actualData = getAll()
  const search = stringifyQuery({ ...actualData, ...data })
  browserHistory.replace({ search })
}
