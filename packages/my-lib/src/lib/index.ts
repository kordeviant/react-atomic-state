import { useCallback, useEffect, useRef, useState } from 'react'
type Updater<T> = (arg1: T) => void;
type Selector<T, A> = (arg1: T) => A;
type SetAtomState<T> = (arg1: T) => T;

export class Atom<T> {
    subscribers: {
        [key: number]: Updater<T>;
    } = {}

    value: T
    constructor(value: T) {
        this.value = value
    }

    subscribeAnyFunction(fn: Updater<T>) {
        const lastKey = Object.keys(this.subscribers).at(-1)
        const newKey = (lastKey as unknown as number || 0) + 1
        this.subscribers[newKey] = fn
        return newKey
    }

    unsub(key: number) {
        delete this.subscribers[key]
    }

    setValue(fn: SetAtomState<T>) {
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
export const useAtomSelectValue = <T, A>(atom: Atom<T>, selector: Selector<T, A>) => {
    const [state, setState] = useState(selector(atom.value))
    const subRef = useRef<number>()
    const preRef = useRef<A>()
    useEffect(() => {
        subRef.current = atom.subscribeAnyFunction((x) => {
            const newVal = selector(x)
            if (preRef.current !== newVal) {
                preRef.current = newVal;
                setState(newVal)
            }
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
