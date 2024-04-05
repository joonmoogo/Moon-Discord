import { useState } from "react";

export default function Counter() {

    let [counter, setCounter] = useState(0);

    function btnClick() {
        setCounter(++counter);
    }
    return (
        <>
            <div>counter</div>
            <button onClick={btnClick}>btn</button>
            <div>{counter}</div>
        </>
    )
}