import logo from './logo.svg';
import './App.css';
import Counter from './components/counter';
import Button from '@mui/joy/Button';
import * as React from 'react';
import Right from './components/Right';
import ChatUI from './components/chatUI';
import Sidebar from './components/sidebar';
import SelectedListItem from './components/sidebar2';

function App() {

  return (
    <div className='container' style={{ display: 'flex', height: '100vh' }}>
      <div className='left-left' style={{
        backgroundColor: 'red',
        height: '100%',
        width: '5%'
      }}>
        <Sidebar />
      </div>
      <div className='left' style={{
        backgroundColor: 'orange',
        height: '100%',
        width: '20%',
      }}
      >
        <SelectedListItem />

      </div>
      <div className='mid' style={{
        backgroundColor: 'blue',
        height: '100%',
        width: '70%',
      }}
      >
        <ChatUI />


      </div>
      <div className='right' style={{
        backgroundColor: 'green',
        height: '100%',
        width: '15%',
        overflow: 'hidden'
      }}
      >
        <Right />
      </div>
    </div>
  );
}

export default App;
