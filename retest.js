import { useState } from "react";

function App() {
    const [counter, setCounter] = useState(0);
    console.log(`현재 State 값 : ${counter}`)
  
    const upgradeCounter = () => {
      setCounter(counter + 1)
    }
    return (
      <div>
          <span>Number : {counter}</span>
          <div>
            <button onClick={upgradeCounter}>UPGRADE</button>
          </div>
      </div>
    );
 
}

export default App;

