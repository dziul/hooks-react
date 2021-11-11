type ObjectBoolean<K extends string = string> = Record<K, boolean>

export const createClassNameFromObject = (data: ObjectBoolean) => {
  const entries = Object.entries(data)
  const entriesFiltered = entries.filter(([_, value]) => value)
  return entriesFiltered.map(([key]) => key).join(' ')
}

export const createClassName = <K extends string>(...values: (ObjectBoolean<K> | string)[]) => {
  return values
    .map(value => (typeof value === 'string' ? value : createClassNameFromObject(value)))
    .join(' ')
}

export default createClassName
