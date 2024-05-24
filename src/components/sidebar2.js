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
import { grey } from '@mui/material/colors';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // 서버 주소를 적절히 설정하세요



export default function SelectedListItem() {
  const [selectedIndex, setSelectedIndex] = useState(0); // 선택된 인덱스를 관리하는 상태
  const [channels, setChannels] = useState([]); // 채널 리스트를 관리하는 상태

  // 리스트 아이템 클릭 시 실행되는 함수
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  // 컴포넌트가 마운트될 때 실행되는 이펙트
  useEffect(() => {
    socket.on('channelJoin', (data) => {
      const newMember = {
        channelname: data.channelname,
        friendname: data.friendname,
        channelusers: data.channelusers,
        channeltype: data.channeltype,
      };
      setChannels((prevChannels) => [...prevChannels, newMember]); // 새로운 멤버를 채널 리스트에 추가
      console.log('채널 유저 수', data.channelusers.length);
    });

    return () => {
      socket.off('channelJoin');
    };
  }, []);

  // 멤버 초대 함수
  const handleInviteMember = (friendname) => {
    const newFriendName = prompt('초대할 친구 이름을 입력하세요', friendname);
    if (newFriendName) {
      socket.emit('inviteMember', { friendname: newFriendName });
    }
  };

  // 채널 나가기 함수
  const handleChannelExit = (index) => {
    const updatedChannels = channels.map((channel, i) => {
      if (i === index) {
        return {
          ...channel,
          channelusers: channel.channelusers.filter((user) => user !== '나의 이름'), // '나의 이름'을 현재 사용자 이름으로 대체하세요
        };
      }
      return channel;
    });

    setChannels(updatedChannels);
    socket.emit('channelExit', updatedChannels[index]);

    // 현재 선택된 채널을 나갈 경우 선택된 인덱스를 초기화
    if (selectedIndex === index) {
      setSelectedIndex(0);
    }
  };

  return (
<<<<<<< HEAD
    <Box sx={{ height: '100%', width: '100%', bgcolor: grey[800], display: 'flex', flexDirection: 'column' }}>
      <List component="nav" aria-label="channel members" sx={{ flex: 1, overflowY: 'auto' }}>
        {channels[selectedIndex] && channels[selectedIndex].channelusers.map((user, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: grey[500] }}>{user[0]}</Avatar>
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
=======

    <Box sx={{height: '100%', width: '100%', bgcolor: grey[800] }}>
      <Box sx={{padding: '10px 0px 0px 0px', height: '8%', width: '100%', bgcolor: grey[900] }}>
        <div class="server_name">
			  	<Avatar alt="" src=""></Avatar>
		  	</div>
      </Box>
      <Box sx={{ height: '90%', width: '100%', bgcolor: grey[800] }}>
      <List component="nav" aria-label="friends profile">
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: red[500] }}>SW</Avatar>
          </ListItemAvatar>
          <ListItemText sx={{color: grey[100]}} primary="김상원" />
        </ListItemButton>
        <ListItemButton 
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: orange[500] }}>GH</Avatar>
          </ListItemAvatar>
          <ListItemText sx={{color: grey[100]}} primary="이기환" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: yellow[500] }}>MJ</Avatar>
          </ListItemAvatar>
          <ListItemText sx={{color: grey[100]}} primary="이민준" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: green[500] }}>JJ</Avatar>
          </ListItemAvatar>
          <ListItemText sx={{color: grey[100]}} primary="임재정" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 4}
          onClick={(event) => handleListItemClick(event, 4)}
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: blue[500] }}>JM</Avatar>
          </ListItemAvatar>
          <ListItemText sx={{color: grey[100]}} primary="오준묵" />
        </ListItemButton>
      </List>
>>>>>>> df5f33ea1442ade734fddd9a4fa0e81418686ef5
      </Box>
    </Box>
  );
}
