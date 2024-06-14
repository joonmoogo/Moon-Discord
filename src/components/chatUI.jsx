import React, { useState, useRef, useEffect } from 'react';
import { Box, Paper, List, ListItem, Card, CardContent, Avatar, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { deepPurple, grey } from '@mui/material/colors';
import socket from '../util/socket';
import { useGlobalState } from '../util/globalState';

function ChatUI() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [messageTimes, setMessageTimes] = useState([]);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const [myUserName, setMyUserName] = useState('hi');

  /* 채널 state는 전역 state임  */
  const [currentChannel, setCurrentChannel, userList, setUserList, user, setUser, thisChannel, setThisChannel] = useGlobalState();

  useEffect(() => {

    socket.on('message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log([...messages, data]);
    })
  }, [])

  useEffect(() => {
    const username = prompt('username?');
    if (username) {
      setMyUserName(username);
      socket.emit('user', { name: username });
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const sendMessage = () => {
    const newTime = new Date();
    const newMessage = {
      room: thisChannel.channelName,
      text: currentMessage, // 메시지 텍스트
      username: user.username,
      time: new Date() // 메시지 보낸 시간
    };
    socket.emit('message', newMessage);
    setMessageTimes([...messageTimes, newTime]);
    setCurrentMessage("");

  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  // 시간을 원하는 포맷으로 변환하는 함수
  // const formatTime = (date) => {
  //   return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  // };

  // const myUserId = user.username;
  const myUserAvatar = 'U';

  const otherUserAvatar = 'O';


  const isMyMessage = (userId) => userId === user?.username;

  return (
    <Box sx={{ overflow: 'auto' }}>
      <Box sx={{ width: '100%', bgcolor: grey[900] }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          bgcolor: grey[900],
          padding: '10px',
        }}>
          <Avatar sx={{ bgcolor: grey[500], width: '46px', height: '46px', fontSize: '20px' }}>{otherUserAvatar}</Avatar>
          <Box sx={{ marginLeft: '10px', color: 'white', fontWeight: 'bold', fontSize: '15px' }}>
            {thisChannel.channelName}
          </Box>
        </Box>
        <Paper elevation={3} sx={{ bgcolor: grey[800] }}>
          <List sx={{ maxHeight: `${windowHeight}`, height: `${windowHeight - 191}px`, overflow: 'auto', bgcolor: grey[800] }}>
            <ListItem key="1" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginY: 1 }}>
              <Card variant="borderless" sx={{ bgcolor: grey[800], padding: '8px 16px' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* 상대방 메시지일 경우 */}
                    <Avatar sx={{ bgcolor: grey[500], marginRight: 1 }}>{otherUserAvatar}</Avatar>
                    <Box sx={{ fontWeight: 'bold', color: 'white', fontSize: '20px', marginTop: '-3px' }}>Other</Box>
                  </Box>
                  <Box sx={{ fontSize: '16px', wordWrap: 'break-word', color: 'white' }}>테스트 용 메세지</Box> {/* 상대방 메세지 확인 용 테스트 List */}
                  <Box sx={{ fontSize: '12px', color: grey[500] }}>{ }</Box>
                </CardContent>
              </Card>
            </ListItem>
            {messages.map((message, index) => (
              <ListItem key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginY: 1 }}>
                <Card variant="borderless" sx={{ bgcolor: grey[800], padding: '8px 16px' }}>
                  <CardContent>
                    {isMyMessage(message?.username) ? (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* 내 메시지일 경우 */}
                        <Avatar sx={{ bgcolor: deepPurple[500], marginRight: 1 }}>{myUserAvatar}</Avatar>
                        <Box sx={{ fontWeight: 'bold', color: 'white', fontSize: '20px', marginTop: '-3px' }}>{myUserName}</Box>
                      </Box>
                    ) : (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* 상대방 메시지일 경우 */}
                        <Avatar sx={{ bgcolor: grey[500], marginRight: 1 }}>{otherUserAvatar}</Avatar>
                        <Box sx={{ fontWeight: 'bold', color: 'white', fontSize: '20px', marginTop: '-3px' }}>{message?.username}</Box>
                      </Box>
                    )}
                    <Box sx={{ fontSize: '16px', wordWrap: 'break-word', color: 'white' }}>{message.text}</Box>
                    <Box sx={{ fontSize: '12px', color: grey[500] }}></Box>
                  </CardContent>
                </Card>
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
          </List>
          <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center' }}>
            <IconButton color="primary" aria-label="add photo">
              <AddAPhotoIcon />
            </IconButton>
            <TextField
              fullWidth
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder={`@ 상대방 에게 메세지 보내기`}
              margin="normal"
              inputProps={{ style: { fontSize: '16px', color: 'white', height: '12px' } }}
            />
            {/* 전송 아이콘을 IconButton에 넣기 */}
            <IconButton color="primary" aria-label="send message" onClick={sendMessage}>
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default ChatUI;
