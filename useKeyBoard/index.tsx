import { useEffect } from 'react'

type KeyboardEventGeneric = Omit<KeyboardEvent, 'target'> & { target: HTMLElement }
type FunctionGeneric = (e: KeyboardEventGeneric) => unknown

type Target = HTMLElement | Window
type KeyType = 'keyup' | 'keydown'

interface Options {
  type: KeyType
  target: Target
  callback: FunctionGeneric
}

const useKeyBoardHandle = (keyOrCode: string, { callback, target, type }: Options) => {
  useEffect(() => {
    const eventListenerObject: EventListenerObject = {
      handleEvent: (event: KeyboardEventGeneric) => {
        const keyCodeUnsensive = [event.key, event.code].map(v => v.toLowerCase())
        if (keyCodeUnsensive.includes(keyOrCode.toLowerCase())) {
          callback(event)
        }
      },
    }

    target.addEventListener(type, eventListenerObject, true)

    return () => {
      target.removeEventListener(type, eventListenerObject, true)
    }
  }, [callback, keyOrCode, target, type])
}

/**
 * useKeyUp
 * @param {string} keyOrCode - the name of the key to respond to, compared against event.{key,code}
 * @param {Options} callback
 * @param {Target} target
 */
export const useKeyUp = (
  keyOrCode: string,
  callback: FunctionGeneric,
  target: Target = window
) =>
  useKeyBoardHandle(keyOrCode, {
    type: 'keyup',
    target,
    callback,
  })

/**
 * useKeyDown
 * @param {string} keyOrCode - the name of the key to respond to, compared against event.{key,code}
 * @param {Options} callback
 * @param {Target} target
 */
export const useKeyDown = (
  keyOrCode: string,
  callback: FunctionGeneric,
  target: Target = window
) => useKeyBoardHandle(keyOrCode, { type: 'keydown', target, callback })
