import { useCallback, useEffect, useRef, useState } from 'react'
type Updater<T> = (arg1: T) => void;
type SetAtomState<T> = (arg1: T) => T;

export class Atom<T> {
  subscribers: {
    [key: number]: Updater<T>;
  } = {}

  value: T
  constructor (value: T) {
    this.value = value
  }

  subscribeAnyFunction (fn: Updater<T>) {
    const lastKey = Object.keys(this.subscribers).at(-1)
    const newKey = (lastKey as unknown as number || 0) + 1
    this.subscribers[newKey] = fn
    return newKey
  }

  unsub (key: number) {
    delete this.subscribers[key]
  }

  setValue (fn: SetAtomState<T>) {
    this.value = fn(this.value)
    Object.keys(this.subscribers).map((x) => {
      this.subscribers[x as unknown as number](this.value)
    })
  }
}

export const useAtomValue = <T>(atom: Atom<T>) => {
  const [state, setState] = useState(atom.value)
  const subRef = useRef<number>()
  useEffect(() => {
    subRef.current = atom.subscribeAnyFunction((x) => {
      setState(x)
    })
    return () => {
      subRef.current && atom.unsub(subRef.current)
    }
  }, [atom])

  return state
}
export const useAtomSetState = <T>(atom: Atom<T>) => {
  const update = useCallback(
    (x) => {
      atom.setValue(x)
    },
    [atom],
  )
  return update
}
export const useAtomState = <T>(atom: Atom<T>) => {
  const [state, setState] = useState(atom.value)
  const subRef = useRef<number>()
  useEffect(() => {
    subRef.current = atom.subscribeAnyFunction((x) => {
      setState(x)
    })
    return () => {
      subRef.current && atom.unsub(subRef.current)
    }
  }, [atom])
  const update = useCallback(
    (x) => {
      atom.setValue(x)
    },
    [atom],
  )
  return [state, update]
}
