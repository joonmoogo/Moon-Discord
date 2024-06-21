import './App.css';
import Counter from './components/counter';

import * as React from 'react';
import Right from './components/Right';
import SelectedListItem from './components/sidebar2';
import ChatUI from './components/chatUI';
import Sidebar from './components/sidebar';
import { useState, useEffect } from 'react';
import socket from './util/socket';
import useDeviceType from './util/useDeviceType.';
import useUserType from './util/useUserType';
import { Box, Dialog, List, ListItem, ListItemButton, ListItemText, Modal, Typography, Avatar, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { GlobalStateProvider } from './states/stateProvider';
import { useRecoilState } from 'recoil';
import { myUsernameState } from './states/myUsername';
import { MyDialog } from './components/Dialog';
import { userState } from './states/user';

function App() {

  const deviceType = useDeviceType();
  const userType = useUserType();
  const [myUserName, setMyUserName] = useRecoilState(myUsernameState);

  const [isPopup, setIsPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [tempClickedUser, setTempClickedUser] = useState();

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('gasd');

  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    socket.on('friendRequest', (data) => {
      setOpen(true)
      setSelectedValue(data)
    })
    socket.on('inviteChannelRequest', (data) => {
      setOpen(true)
      setSelectedValue(data)
    })
    socket.on('personalChattingRequest', (data) => {
      setOpen(true)
      setSelectedValue(data)
    })
  })

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };


  useEffect(() => {
    const getUsername = () => {
      const username = prompt('username?');
      if (username) {
        setMyUserName(username);
        localStorage.setItem('history', JSON.stringify(username));
        socket.emit('user', { name: username });
      }
      else {
        alert('유저 네임 입력 안했어')
        getUsername();
      }
    }
    getUsername();
  }, [])



  const Popup = ({ visible, position }) => {

    const friendButton = () => {
      if (tempClickedUser.socketId !== user.socketId) {
        socket.emit('friend', tempClickedUser.socketId);
      }
    }
    const chattingButton = () => {
      if (tempClickedUser.socketId !== user.socketId) {
        socket.emit('personalChatting', tempClickedUser.socketId);
      }
    }
    const inviteButton = () => {
      if (tempClickedUser.socketId !== user.socketId) {
        socket.emit('inviteChannel', tempClickedUser.socketId);
      }
    }

    const { x, y } = position
    const offset = 10
    return (
      visible === true
        ?
        <List style={{
          paddingTop: 0,
          paddingBottom: 0,
          position: 'absolute',
          borderRadius: '10px',
          top: y + offset,
          left: x,
          zIndex: 999,
          backgroundColor: '#111214',
          width: '10%',
          color: '#aaafb6'
        }}>
          <ListItem >
            <ListItemButton onClick={friendButton} sx={{
              '&:hover': {
                backgroundColor: '#505cdc',
                color: '#fff',
              },
            }} >
              <ListItemText primary="친구 추가" />
            </ListItemButton>
          </ListItem>
          <ListItem >
            <ListItemButton onClick={chattingButton} sx={{
              '&:hover': {
                backgroundColor: '#505cdc',
                color: '#fff',
              },
            }}>
              <ListItemText primary="채팅 하기" />
            </ListItemButton>
          </ListItem>
          <ListItem >
            <ListItemButton onClick={inviteButton} sx={{
              '&:hover': {
                backgroundColor: '#505cdc',
                color: '#fff',
              },
            }}>
              <ListItemText primary="초대 하기" />
            </ListItemButton>
          </ListItem>
        </List>
        : null
    )
  }

  const windowClickHandler = (e) => {
    e.preventDefault();
    setIsPopup(false);

  }

  useEffect(() => {
    window.addEventListener('click', windowClickHandler);

    return () => {
      window.removeEventListener('click', windowClickHandler);
    }
  }, [])

  return (
    <>
      <Popup visible={isPopup} position={popupPosition} />
      {/* <MyDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      /> */}
      {<Dialog
        sx={{ scale: '1.2' }}
        open={open}
        onClose={() => { setOpen(false) }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {selectedValue.message}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => { setOpen(false) }}>Disagree</Button>
          <Button onClick={() => {
            selectedValue.type === 1 ? socket.emit('acceptFriend', selectedValue.socketId) : null;
            selectedValue.type === 2 ? socket.emit('acceptInviteChannel', selectedValue.socketId) : null;
            selectedValue.type === 3 ? socket.emit('acceptPersonalChatting', selectedValue.socketId) : null;
            setOpen(false);
          }} autoFocus>
            Agree
          </Button>
        </DialogActions>

      </Dialog>}
      <div className='container' style={{ display: 'flex', height: '100dvh', width: '100vw', overflow: 'hidden' }}>
        {/* 내가 속한 채널 */}
        <div className='left-left' style={{
          height: '100%',
          width: '4%',
        }}>
          <Sidebar />
        </div>
        {/* 채널 안에 속한 사람들 */}
        <div className='left' style={{
          height: '100%',
          width: '12%',
        }}
        >
          <SelectedListItem />
        </div>
        {/* 채팅 UI */}
        <div className='mid' style={{
          height: '100%',
          width: '72%',
          backgroundColor: '#313338'

        }}
        >
          <ChatUI></ChatUI>
        </div>
        {/* 글로벌 친구 모음 */}
        <div className='right' style={{
          height: '100%',
          width: '12%',
          overflow: 'hidden',
          // overflowY: 'scroll',
          // scrollbarWidth: 'none'
        }}
        >
          <Right setIsPopup={setIsPopup} setPopupPosition={setPopupPosition} setTempClickedUser={setTempClickedUser}></Right>
        </div>
      </div>
    </>
  );
}

export default App;
