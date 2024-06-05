import { createContext, useContext, useState } from "react";

const GlobalStateContext = createContext(undefined);

export const GlobalStateProvider = ({ children }) => {
    const [channel, setChannel] = useState(false);

    return (
        <GlobalStateContext.Provider value={[ channel, setChannel ]}>
            {children}
        </GlobalStateContext.Provider>
    )
}

export const useGlobalState = () => {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error("no context");
    }
    return context
}