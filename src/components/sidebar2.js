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

export default function SelectedListItem() {
  const [selectedIndex, setSelectedIndex] = useState(0); // 선택된 인덱스를 관리하는 상태
  const [channels, setChannels] = useState([]); // 채널 리스트를 관리하는 상태
  const [channelUsers,setChannelUsers] = useState([]);

  const me = window.localStorage.getItem('id');
  const parsedMe = JSON.parse(me).username;


  // 리스트 아이템 클릭 시 실행되는 함수
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  // 컴포넌트가 마운트될 때 실행되는 이펙트
  useEffect(() => {
    socket.on('channelJoin', (data) => {
      console.log('channelJoin Data: ',data);
      setChannels((prevChannels) => [...prevChannels, data]); // 새로운 멤버를 채널 리스트에 추가
      setChannelUsers((prevData)=>[...prevData, ...data.channelUsers])
      // console.log('채널 유저 수', data.channelusers.length);
    },[]);

    return () => {
      socket.off('channelJoin');
    };
  },[]);

  useEffect(()=>{
    // console.log('parsedMe: ',parsedMe);
    // console.log('channelusers: ',channelUsers);
  },[channelUsers])

  useEffect(()=>{
    socket.on('getChannel',(data)=>{
      const channelUsers = data.channelUsers;
      setChannelUsers(channelUsers);
    })
  },[])

  // 멤버 초대 함수
  const handleInviteMember = (friendname) => {
    const newFriendName = prompt('초대할 친구 이름을 입력하세요', friendname);
    if (newFriendName) {
      socket.emit('inviteMember', { friendname: newFriendName });
    }
  };

  // 채널 나가기 함수
  const handleChannelExit = (index) => {
    const updatedChannels = [...channels]; // 채널 리스트 복사
    updatedChannels[index].channelusers = updatedChannels[index].channelusers.filter((user) => user !== '나의 이름'); // 현재 사용자 제외
    setChannels(updatedChannels);
    socket.emit('channelExit', updatedChannels[index]);

    // 현재 선택된 채널을 나갈 경우 선택된 인덱스를 초기화
    if (selectedIndex === index) {
      setSelectedIndex(0);
    }
  };

  return (
    <Box sx={{ height: '100%', width: '100%', bgcolor: grey[800], display: 'flex', flexDirection: 'column' }}>
      <List component="nav" aria-label="channel members" sx={{ flex: 1, overflowY: 'auto' }}>
        {/* <Avatar sx={{ bgcolor: deepPurple[500] }}>{user}</Avatar> */}
        {channelUsers.map((user, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              {<Avatar sx={{ bgcolor: grey[500] }}>{user}</Avatar>}
            </ListItemAvatar>
            <ListItemText sx={{ color: grey[100] }} primary={user} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2, borderTop: `1px solid ${grey[700]}` }}>
        <Tooltip title="새로운 유저 초대">
          <IconButton onClick={() => handleInviteMember('')} sx={{ marginRight: 1 }}>
            <PersonAddAlt1Icon />
          </IconButton>
        </Tooltip>
        <Tooltip title="채널 나가기">
          <IconButton onClick={() => handleChannelExit(selectedIndex)}>
            <ExitToAppIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
