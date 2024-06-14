import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { deepPurple, grey } from '@mui/material/colors';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import socket from '../util/socket';
import { useRecoilState } from 'recoil';
import { thisChannelState } from '../states/thisChannel';

export default function SelectedListItem() {

  // const [currentChannel, setCurrentChannel, userList, setUserList, user, setUser,thisChannel,setThisChannel] = useGlobalState();

  const [thisChannel,setThisChannel] = useRecoilState(thisChannelState)
  const inviteButtonClick = () => {

  }

  const exitButtonClick = () => {

  }

  return (
    <Box sx={{ height: '100%', width: '100%', bgcolor: '#2b2d31', display: 'flex', flexDirection: 'column' }}>

      <List component="nav" aria-label="channel members" sx={{ flex: 1, overflowY: 'auto' }}>
        {/* <Avatar sx={{ bgcolor: deepPurple[500] }}>{user}</Avatar> */}
        {thisChannel?.channelUsers.map((user, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              {<Avatar sx={{ bgcolor: grey[500] }}>{user}</Avatar>}
            </ListItemAvatar>
            <ListItemText sx={{ color: grey[100] }} primary={user} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2, borderTop: `1px solid ${grey[700]}` }}>
        <Box>
          {thisChannel?.channelName}
        </Box>
        <Tooltip title="새로운 유저 초대">
          <IconButton onClick={inviteButtonClick} sx={{ marginRight: 1 }}>
            <PersonAddAlt1Icon />
          </IconButton>
        </Tooltip>
        <Tooltip title="채널 나가기">
          <IconButton onClick={exitButtonClick}>
            <ExitToAppIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
