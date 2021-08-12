import React from 'react'
import { render, act } from '@testing-library/react'

import useUpdateTitleDocument from './index'

const setup = (text: string, prefix?: string) => {
  let output = {}
  const TestComponent = () => {
    const { setTitleDocument } = useUpdateTitleDocument(text, prefix)
    output = { setTitle: setTitleDocument }
    return null
  }
  const rendered = render(<TestComponent />)

  return { ...output, rendered } as {
    setTitle: React.Dispatch<React.SetStateAction<string>>
    rendered: typeof rendered
  }
}

const titleInitial = 'title initial'

describe('Test Hook useUpdateTitleDocument', () => {
  beforeEach(() => {
    document.title = titleInitial
  })
  it('Should change title document', () => {
    const title = 'test'
    const titleOther = "i'am test"
    const { setTitle } = setup(title)
    expect(document.title).toContain(title)
    act(() => {
      setTitle(titleOther)
    })
    expect(document.title).toContain(titleOther)
  })

  it('Should change title document with suffix', () => {
    const title = 'test'
    const titleOther = "i'am test"
    const suffixTitle = '| NVM'
    const { setTitle } = setup(title, suffixTitle)
    expect(document.title).toEqual(`${title} ${suffixTitle}`)
    act(() => {
      setTitle(titleOther)
    })
    expect(document.title).toContain(`${titleOther} ${suffixTitle}`)
  })

  it('Should restores title on unmount', () => {
    const title = 'wow lulu'
    const { rendered } = setup(title)
    expect(document.title).toContain(title)
    act(() => {
      rendered.unmount()
    })
    expect(document.title).toContain(titleInitial)
  })
})
