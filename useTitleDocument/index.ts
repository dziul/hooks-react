import { useEffect } from 'react'

const useTitleDocument = (title: string) => {
  useEffect(() => {
    const titlePrevious = document.title
    document.title = title
    return () => {
      document.title = titlePrevious
    }
  }, [title])
}

export default useTitleDocument
