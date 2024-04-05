import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { red, orange, yellow, green, blue, grey } from '@mui/material/colors';

// 클라이언트, 서버, DB

localhost:3000/api/user

// 클라이언트 -> 서버 fetch('/localhost:3000/api/user')
// 서버 -> 클라이언트 
// SQL -> CREATE TABLE user (id number, username: string);
//  SELECT * FROM user
//  SELECT * FROM user WHERE id='1';
// db.collection.get({username:joon});
// respond.json({id:1,username:joon});

// /api/user/1 : 아이디 1번인 정보만 리턴하겠따
// /api/user : 모든 정보 리턴하겠따

// fetch(/api/user)



export default function SelectedListItem() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const data = fetch('/user');

  data ={id:1,username:joon};

  const userid = data.id;
  const username = data.username

  return (
    <Box sx={{ width: '20%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="friends profile">
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: red[500] }}></Avatar>
          </ListItemAvatar>
          <ListItemText sx={{color: grey[900]}} primary="김상원" />
        </ListItemButton>
        <ListItemButton 
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: orange[500] }}>GH</Avatar>
          </ListItemAvatar>
          <ListItemText sx={{color: grey[900]}} primary="이기환" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: yellow[500] }}>MJ</Avatar>
          </ListItemAvatar>
          <ListItemText sx={{color: grey[900]}} primary="이민준" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: green[500] }}>JJ</Avatar>
          </ListItemAvatar>
          <ListItemText sx={{color: grey[900]}} primary="임재정" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 4}
          onClick={(event) => handleListItemClick(event, 4)}
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: blue[500] }}>JM</Avatar>
          </ListItemAvatar>
          <ListItemText sx={{color: grey[900]}} primary="오준묵" />
        </ListItemButton>
      </List>
    </Box>
  );
}