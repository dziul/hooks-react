import { useEffect, useState } from 'react'

const useTitleDocument = (titleInitial?: string, suffix = '') => {
  const [title, setTitleDocument] = useState(titleInitial)

  useEffect(() => {
    const previousTitle = document.title
    if (title) {
      const suffixTitle = suffix ? ` ${suffix}` : ''
      document.title = title + suffixTitle
    }
    return () => {
      document.title = previousTitle
    }
  }, [suffix, title])

  return {
    setTitleDocument,
  }
}

export default useTitleDocument
