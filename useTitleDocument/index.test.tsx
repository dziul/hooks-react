import React, { useState } from 'react'
import { render, act } from '@testing-library/react'

import useUpdateTitleDocument from './index'

const setup = (text: string) => {
  let output = {}
  const TestComponent = () => {
    const [title, setTitle] = useState(text)
    useUpdateTitleDocument(title)
    output = { setTitle }
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
    expect(document.title).toEqual(title)
    act(() => {
      setTitle(titleOther)
    })
    expect(document.title).toEqual(titleOther)
  })

  it('Should restores title on unmount', () => {
    const title = 'wow lulu'
    const { rendered } = setup(title)
    expect(document.title).toEqual(title)
    act(() => {
      rendered.unmount()
    })
    expect(document.title).toEqual(titleInitial)
  })
})
