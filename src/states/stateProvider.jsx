import { RecoilRoot, useRecoilState } from "recoil";
import { currentChannelState } from "./currentChannel";
import { thisChannelState } from "./thisChannel";
import { userState } from "./user";
import { userListState } from "./userList";
import socket from "../util/socket";
import { useEffect } from "react";


export const GlobalStateProvider = ({ children }) => {
    const [currentChannel, setCurrentChannel] = useRecoilState(currentChannelState);
    const [userList, setUserList] = useRecoilState(userListState);
    const [user, setUser] = useRecoilState(userState);
    const [thisChannel, setThisChannel] = useRecoilState(thisChannelState);

    useEffect(() => {
        socket.on('user', (data) => {
            console.log(data);
            setUser(data);
            setCurrentChannel(data.currentChannel);
        });

        socket.on('userlist', (data) => {
            setUserList(data);
        });

        socket.on('channel', (data) => {
            console.log(data);
            setUser(data);
        });

        socket.on('channelJoin', (data) => {
            console.log(data);
        });

        socket.on('getChannel', (data) => {
            setThisChannel(data);
        });

        return () => {
            socket.off('user');
            socket.off('userlist');
            socket.off('channel');
            socket.off('getChannel');
        };
    }, [setUser, setCurrentChannel, setUserList, setThisChannel]);

    return (
        <>
            {children}
        </>
    );
};