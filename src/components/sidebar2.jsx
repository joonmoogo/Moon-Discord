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
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import { Collapse, ListItemIcon } from '@mui/material';

export default function SelectedListItem() {

  // const [currentChannel, setCurrentChannel, userList, setUserList, user, setUser,thisChannel,setThisChannel] = useGlobalState();

  const [thisChannel, setThisChannel] = useRecoilState(thisChannelState)

  const [chatopen, setChatOpen] = useState(true);
  const inviteButtonClick = () => {

  }

  const exitButtonClick = () => {

  }


  return (
    <Box sx={{ height: '100%', width: '100%', bgcolor: '#2b2d31', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ height: '65px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottom: '1px solid #333638', fontWeight: 'bold' }}>
        {thisChannel?.channelName} 서버
      </Box>

      <List component="nav" aria-label="channel members" sx={{ flex: 1, overflowY: 'auto' }}>
        <ListItemButton onClick={() => { setChatOpen(!chatopen) }}>
          <ListItemText primary="채팅방" />
          {chatopen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={chatopen} timeout="auto" unmountOnExit>
          <List component='div' disablePadding>


            {thisChannel?.channelUsers.map((user, index) => (
              <ListItemButton sx={{ pl: 4 }}>
                <ListItem key={index}>
                  <ListItemAvatar>
                    {<Avatar sx={{ bgcolor: grey[500] }}>{user}</Avatar>}
                  </ListItemAvatar>
                  <ListItemText sx={{ color: grey[100] }} primary={user} />
                </ListItem>
              </ListItemButton>

            ))}
          </List>
        </Collapse>
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2, borderTop: `1px solid #333638` }}>
        <Tooltip title="새로운 유저 초대">
          <IconButton onClick={inviteButtonClick} sx={{ marginRight: 1 }}>
            <PersonAddAlt1Icon  />
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
