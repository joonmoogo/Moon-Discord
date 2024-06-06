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
import { useGlobalState } from '../util/globalState';

export default function Right() {

    const [channel,setChannel,userList,setUserList] = useGlobalState();
    return (
        
        <List sx={{ width: '100%',height:'100%', bgcolor: grey[800]}} >
            {
                userList.map((e,i) => {
                    return (
                        <>
                            <ListItemButton>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src={'../assets/react.svg'} />
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

        </List>


    )
}