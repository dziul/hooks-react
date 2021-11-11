import React, { useEffect } from 'react'
import { cleanup, render, act } from '@testing-library/react'

import useLocalStorage from './index'

describe('Test hook useLocalStorage', () => {
  afterAll(() => {
    cleanup()
    jest.clearAllMocks()
    window.localStorage.clear()
  })

  it('should initial value be undefined for new key', () => {
    const keyItem = 'test'
    let valueItem: unknown
    const TestComponent = () => {
      const [value] = useLocalStorage(keyItem)

      useEffect(() => {
        valueItem = value
      }, [value])

      return null
    }

    const spyGetItem = jest.spyOn(global.Storage.prototype, 'getItem')
    const spySetItem = jest.spyOn(global.Storage.prototype, 'setItem')
    render(<TestComponent />)

    expect(valueItem).toEqual(null)
    expect(spyGetItem).toBeCalledTimes(1)
    expect(spySetItem).toBeCalledTimes(0)
  })

  it('should the initial value be defined and update', () => {
    const keyItem = 'test'
    const initialValue = { example: true }
    let valueItem: unknown

    const TestComponent = () => {
      const [value] = useLocalStorage(keyItem, initialValue)

      useEffect(() => {
        valueItem = value
      }, [value])

      return null
    }

    render(<TestComponent />)

    expect(valueItem).toEqual(initialValue)
  })

  it('should save to localstore and return the defined value', () => {
    const keyItem = 'test'
    const TestComponent: React.FC<{
      onSetValue?: (set: (value: string[]) => void) => void
      onGetValue?: (value: unknown) => void
    }> = ({ onSetValue, onGetValue }) => {
      const [value, setValue] = useLocalStorage(keyItem, [] as string[])

      useEffect(() => {
        if (onSetValue) onSetValue(setValue)
      }, [onSetValue, setValue, value])

      useEffect(() => {
        if (onGetValue) onGetValue(value)
      }, [onGetValue, value])

      return null
    }

    const spySetItem = jest.spyOn(global.Storage.prototype, 'setItem')

    let valueFromOnGetValue: unknown
    const { rerender } = render(
      <TestComponent
        onGetValue={value => {
          valueFromOnGetValue = value
        }}
      />
    )

    expect(valueFromOnGetValue).toEqual([])
    expect(spySetItem).not.toBeCalled()

    const newValue = ['a', 'b', 'c']

    act(() => {
      rerender(
        <TestComponent
          onSetValue={set => {
            set(newValue)
          }}
          onGetValue={value => {
            valueFromOnGetValue = value
          }}
        />
      )
    })

    expect(valueFromOnGetValue).toEqual(newValue)
    expect(spySetItem).toBeCalled()
    expect(Object.values(window.localStorage)[0]).toContain(JSON.stringify(newValue))
  })
})
