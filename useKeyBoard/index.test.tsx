import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { useKeyUp } from './index'

describe('Test Hook useKeyUp', () => {
  it('Should execute the provided action after event fired', () => {
    const handleScape = jest.fn()
    const TestComponent: React.FC<{ onScape: typeof handleScape }> = ({ onScape }) => {
      useKeyUp('Space', onScape)

      return <p>test</p>
    }

    render(<TestComponent onScape={handleScape} />)

    userEvent.keyboard('{Space}')

    expect(handleScape).toBeCalledTimes(1)
  })
})
