/**
 * Simular evento change de input
 * [ref](https://github.com/facebook/react/issues/10135)
 * [ref](https://github.com/facebook/react/issues/10135#issuecomment-500929024)
 */

const setReactInputValue = (
  input: HTMLInputElement,
  value: string,
  trackerValue: string
) => {
  // eslint-disable-next-line no-param-reassign
  input.value = value

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputGeneric = input as any
  // eslint-disable-next-line no-underscore-dangle
  const tracker = inputGeneric._valueTracker

  if (tracker && tracker.setValue) {
    tracker.setValue(trackerValue)
  } else {
    throw new Error('Not found prop _valueTracker in input')
  }
}

const dispatchChangeInputEvent = (
  element: HTMLInputElement,
  newValue: string,
  trackerValue = element.value
) => {
  setReactInputValue(element, newValue, trackerValue)
  const event = new Event('input', { bubbles: true })
  element.dispatchEvent(event)
}

export default dispatchChangeInputEvent
