import { render, screen, fireEvent } from '@testing-library/react'
import * as React from 'react'

import { dispatchChangeInputEvent } from '~/utils'

describe('Tests dispatchChangeInputEvent function', () => {
  it('should trigger changeEvent and change value', () => {
    const textBase = 'Ok'
    const textButton = 'click'
    const newValueInput = 'changed'

    const DummyComponent: React.VFC = () => {
      const [text, setText] = React.useState('')
      const inputRef = React.useRef<HTMLInputElement>(null)

      return (
        <>
          <input
            onChange={() => {
              setText(textBase)
            }}
            ref={inputRef}
          />
          <p>{text}</p>
          <button
            type='button'
            onClick={() => {
              if (inputRef.current)
                dispatchChangeInputEvent(inputRef.current, newValueInput)
            }}>
            {textButton}
          </button>
        </>
      )
    }

    render(<DummyComponent />)

    expect(screen.queryByText(textBase)).not.toBeInTheDocument()
    expect(screen.queryByDisplayValue(newValueInput)).not.toBeInTheDocument()

    const buttonElement = screen.getByText(textButton)
    fireEvent.click(buttonElement)

    expect(screen.queryByText(textBase)).toBeInTheDocument()
    expect(screen.queryByDisplayValue(newValueInput)).toBeInTheDocument()
  })
})
