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
import { Box, List, ListItem, ListItemButton, ListItemText, Modal, Typography } from '@mui/material';
import { GlobalStateProvider } from './states/stateProvider';
import { useRecoilState } from 'recoil';
import { myUsernameState } from './states/myUsername';

function App() {

  const deviceType = useDeviceType();
  const userType = useUserType();
  const [myUserName,setMyUserName] = useRecoilState(myUsernameState);

  const [isPopup, setIsPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });


  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('history'));
    if (!history) {
      const username = prompt('username?');
      if (username) {
        setMyUserName(username);
        localStorage.setItem('history',JSON.stringify(username));
        socket.emit('user', { name: username });
      }
      else{
        alert('유저 네임 입력 안했어')
      }
    }
    else{

    }

  }, [])

  const Popup = ({ visible, position }) => {
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
            <ListItemButton sx={{
              '&:hover': {
                backgroundColor: '#505cdc',
                color: '#fff',
              },
            }} >
              <ListItemText primary="친구 추가" />
            </ListItemButton>
          </ListItem>
          <ListItem >
            <ListItemButton sx={{
              '&:hover': {
                backgroundColor: '#505cdc',
                color: '#fff',
              },
            }}>
              <ListItemText primary="채팅 하기" />
            </ListItemButton>
          </ListItem>
          <ListItem >
            <ListItemButton sx={{
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
          <Right setIsPopup={setIsPopup} setPopupPosition={setPopupPosition}></Right>
        </div>
      </div>
    </>
  );
}

export default App;
