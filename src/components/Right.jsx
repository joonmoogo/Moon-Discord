import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import socket from '../util/socket';
import { useRecoilState } from 'recoil';
import { userListState } from '../states/userList';
import { Box, Paper } from '@mui/material';

export default function Right({ setIsPopup, setPopupPosition,setTempClickedUser }) {

    const [userList, setUserList] = useRecoilState(userListState)
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    return (

        <>
            <List sx={{ width: '100%', height: '100%', bgcolor: '#2b2d31', paddingTop: 0 }} >
                <Box sx={{ height: '65px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottom:'1px solid #333638', fontWeight:'bold'}}>온라인 유저</Box>

                {
                    userList.map((e, i) => {
                        return (

                            <>
                                <ListItemButton
                                    onContextMenu={(event) => {
                                        event.preventDefault();
                                        const { x, y } = event.nativeEvent;
                                        setIsPopup(prevState => !prevState);
                                        setPopupPosition({ x: x, y: y });
                                        setTempClickedUser(e);
                                    }}
                                    onClick={() => {
                                        setIsPopup(false);
                                    }}>
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar >
                                            <Avatar sx={{backgroundColor:'#23a559'}} alt="U" src={'../assets/react.svg'} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={e.username}
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                </ListItemButton>
                            </>
                        )
                    })
                }

            </List >
        </>

    )
}