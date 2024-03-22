import { useState } from "react"

function Test() {

    let [counter, setCounter] = useState(0)

    function clickButton(){
        setCounter(++counter);
    }

    function dClickButton(){
        setCounter(--counter);
    }

    return (
        <>
            <div>test</div>
            {counter}
            <button onClick={clickButton}>button</button>
            <button onClick={dClickButton}>DownButton</button>
        </>
    )
}

export default Test