import './App.css';
import Counter from './components/counter';

import * as React from 'react';
import Right from './components/Right';
import SelectedListItem from './components/sidebar2';
import ChatUI from './components/chatUI';
import Sidebar from './components/sidebar';
import { useEffect } from 'react';
import socket from './util/socket';
import useDeviceType from './util/useDeviceType.';
import useUserType from './util/useUserType';
import { GlobalStateProvider } from './util/globalState';
function App() {

  const deviceType = useDeviceType();
  const userType = useUserType();

  /*
  TODO-
  1) 채널 추가,
  2) 들어온 친구들
  3) 
   */

  return (
    <GlobalStateProvider>
      <div className='container' style={{ display: 'flex', height: '100dvh', width:'100vw',overflow:'hidden' }}>
        {/* 내가 속한 채널 */}
        <div className='left-left' style={{
          backgroundColor: 'red',
          height: '100%',
          width: '5%',
          border: '1px solid black',
        }}>
          <Sidebar />
        </div>
        {/* 채널 안에 속한 사람들 */}
        <div className='left' style={{
          backgroundColor: 'orange',
          height: '100%',
          width: '20%',
          border: '1px solid black',
        }}
        >
          <SelectedListItem />
        </div>
        {/* 채팅 UI */}
        <div className='mid' style={{
          backgroundColor: 'blue',
          height: '100%',
          width: '60%',
          border: '1px solid black',

        }}
        >
          <ChatUI></ChatUI>
        </div>
        {/* 글로벌 친구 모음 */}
        <div className='right' style={{
          backgroundColor: 'green',
          height: '100%',
          width: '15%',
          overflow: 'hidden',
          border: '1px solid black',
          overflowY: 'scroll',
          scrollbarWidth:'none'
        }}
        >
          <Right></Right>
        </div>
      </div>
    </GlobalStateProvider>
  );
}

export default App;
