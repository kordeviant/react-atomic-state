import { useEffect, useState } from "react";
import { Atom, useAtomSetState, useAtomValue } from "./lib";


const stateAtom = new Atom({ a: 1, b: 1 });

const Menu = () => {
    const setState = useAtomSetState(stateAtom);
    useEffect(() => {
        setInterval(() => {
            setState((x) => ({ a: x.a + 1, b: x.b + 1 }));
        }, 1000);
    }, []);
    return (
        <button
            onClick={() => {
                setState((x) => ({ a: x.a + 1, b: x.b + 1 }));
            }}
        >
            test
        </button>
    );
};

const ShowState = ({ t }: { t: "a" | "b" }) => {
    const state = useAtomValue(stateAtom);
    return <div>{state[t]}</div>;
};

function App() {
    const [show, setShow] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setShow(false);
        }, 10000);
    });
    return (
        <div className="App">
            <header className="App-header">
                <Menu />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                {show && <ShowState t={"a"} />}
                <ShowState t={"b"} />
            </header>
        </div>
    );
}
export default App;