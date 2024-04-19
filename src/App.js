import logo from './logo.svg';
import './App.css';
import Counter from './components/counter';

import * as React from 'react';
import Right from './components/Right';
import SelectedListItem from './components/sidebar2';
import ChatUI from './components/chatUI';
import Sidebar from './components/sidebar';

function App() {

  return (
    <div className='container' style={{ display: 'flex', height: '100vh' }}>
      <div className='left-left' style={{
        backgroundColor: 'red',
        height: '100%',
        width: '5%',
        border: '1px solid black',

      }}>
        <Sidebar/>
      </div>
      <div className='left' style={{
        backgroundColor: 'orange',
        height: '100%',
        width: '20%',
        border: '1px solid black',
      }}
      >
        <SelectedListItem />
      </div>
      <div className='mid' style={{
        backgroundColor: 'blue',
        height: '100%',
        width: '60%',
        border: '1px solid black',

      }}
      >
        <ChatUI></ChatUI>
      </div>
      <div className='right' style={{
        backgroundColor: 'green',
        height: '100%',
        width: '15%',
        overflow: 'hidden',
        border: '1px solid black',
      }}
      >
        <Right></Right>
      </div>
    </div>
  );
}

export default App;
