# @tory.ir/react-atomic

An atomic state manager just like recoil.
Without the need to have a context provider in component tree.
With selector functions rerendering only if the selected value is changed.
In under 100 lines, plain and simple.

```
const stateAtom = new Atom({ a: 1, b: 1 });

// inside component
    const setState = useAtomSetState(stateAtom);
// or
    const state = useAtomValue(stateAtom);
// or
    const selectedState = useAtomSelectValue(stateAtom,(x) => x.a);
// or
    const [state,setState] = useAtomState(stateAtom);
```
