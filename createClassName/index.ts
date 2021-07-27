const createClassName = <K extends string>(data: Record<K, boolean>) => {
  const entries = Object.entries(data)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const entriesFiltered = entries.filter(([_, value]) => value)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return entriesFiltered.map(([key]) => key).join(' ')
}

export default createClassName
