// import { createContext, useContext, useEffect, useState } from "react";
// import socket from "./socket";

// const GlobalStateContext = createContext(undefined);

// export const GlobalStateProvider = ({ children }) => {

//     const [currentChannel, setCurrentChannel] = useState('test');
//     const [userList, setUserList] = useState([]);
//     const [user, setUser] = useState();
//     const [thisChannel, setThisChannel] = useState({
//         channelName:"",
//         channelUsers:[],
//         chattingLogs:[]
//     });


//     useEffect(() => {

//         socket.on('user', (data) => {
//             console.log(data);
//             setUser(data);
//             setCurrentChannel(data.currentChannel)
//         })

//         socket.on('userlist', (data) => {
//             setUserList(data)
//         })

//         socket.on('channel', (data) => {
//             console.log(data)
//             setUser(data);
//         });

//         socket.on('channelJoin', (data) => {
//             console.log(data);
//         })

//         socket.on('getChannel', (data) => {
//             setThisChannel(data);
//         })

//         return () => {
//             socket.off('user');
//             socket.off('userlist');
//             socket.off('channel');
//         };
//     }, [])

//     return (
//         <GlobalStateContext.Provider value={[
//             currentChannel, setCurrentChannel,
//             userList, setUserList,
//             user, setUser,
//             thisChannel,setThisChannel
//         ]}>
//             {children}
//         </GlobalStateContext.Provider>
//     )
// }

// export const useGlobalState = () => {
//     const context = useContext(GlobalStateContext);
//     if (!context) {
//         throw new Error("no context");
//     }
//     return context
// }