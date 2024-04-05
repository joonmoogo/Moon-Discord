import { useState } from "react";

export default function Counter() {

    let [counter, setCounter] = useState(0);

    function btnClick() {
        setCounter(++counter);
    }
    return (
        <>
            

        </>
    )
}