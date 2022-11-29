# @tory.ir/react-atomic

An atomic state manager just like recoil.

In under 100 lines of code, plain and simple.

Without the need to have a context provider in component tree.

With selector functions rerendering only if the selected value is changed.

`npm i @tory.ir/react-atomic `

## demo

[sandbox demo](https://codesandbox.io/s/tory-ir-react-atomic-s43ms1?file=/src/App.tsx)

```
export const stateAtom = new Atom({ a: 1, b: 1 });

// inside component
    const setState = useAtomSetState(stateAtom);
// or
    const state = useAtomValue(stateAtom);
// or
    const selectedState = useAtomSelectValue(stateAtom,(x) => x.a);
// or
    const [state,setState] = useAtomState(stateAtom);
```

made with ❤️
