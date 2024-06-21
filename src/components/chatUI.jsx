import React, { useState, useRef, useEffect } from 'react';
import { Box, Paper, List, ListItem, Card, CardContent, Avatar, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { deepOrange, deepPurple, grey } from '@mui/material/colors';
import socket from '../util/socket';
import { useRecoilState } from 'recoil';
import { userState } from '../states/user';
import { thisChannelState } from '../states/thisChannel';
import { myUsernameState } from '../states/myUsername';
import { currentChannelState } from '../states/currentChannel';

function ChatUI() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [messageTimes, setMessageTimes] = useState([]);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);


  /* 채널 state는 전역 state임  */
  // const [currentChannel, setCurrentChannel, userList, setUserList, user, setUser, thisChannel, setThisChannel] = useGlobalState();

  const [user, setUser] = useRecoilState(userState);
  const [thisChannel, setThisChannel] = useRecoilState(thisChannelState)
  const [myUserName, setMyUserName] = useRecoilState(myUsernameState);


  useEffect(() => {
    socket.on('message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log([...messages, data]);
    })
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

  const [currentChannel, setCurrentChannel] = useRecoilState(currentChannelState)

  const sendMessage = () => {
    const newTime = new Date();
    if (currentMessage === '!greet') {

      socket.emit('message', { room: currentChannel, text: currentMessage, username: user.username, time: new Date() });
      setMessageTimes([...messageTimes, newTime]);
      setCurrentMessage("");

      const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

      const botChat = async () => {
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        const FIRST_WORD = ['안녕하세요 👋', '반가워요', 'ㅎㅇ', '왜요', '누구세요', 'ㅎㅇ요',]
        const SECOND_WORD = ['안녕히가세요', '랩 해줄까요?', 'ㅎㅎ', 'ㅋㅋㅋ']

        const first_message = {
          room: currentChannel,
          text: getRandomElement(FIRST_WORD),
          username: 'BOT',
          time: new Date()
        }

        await delay(1000);
        socket.emit('message', first_message);

        const second_message = {
          room: currentChannel,
          text: getRandomElement(SECOND_WORD),
          username: 'BOT',
          time: new Date()
        }
        await delay(2500);
        socket.emit('message', second_message);
      }

      botChat();
    }

    else if (currentMessage === '!badword') {
      socket.emit('message', { room: currentChannel, text: currentMessage, username: user.username, time: new Date() });
      setMessageTimes([...messageTimes, newTime]);
      setCurrentMessage("");

      const botChat = async () => {
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        let newMessage = {
          room: currentChannel,
          text: 'x발',
          username: 'BOT',
          time: new Date()
        }

        await delay(2000);
        socket.emit('message', newMessage);

        newMessage.text = 'x까';
        await delay(3000);
        socket.emit('message', newMessage);
      }

      botChat();
    }

    else {
      const newMessage = {
        room: currentChannel,
        text: currentMessage, // 메시지 텍스트
        username: user.username,
        time: new Date() // 메시지 보낸 시간
      };
      socket.emit('message', newMessage);
      setMessageTimes([...messageTimes, newTime]);
      setCurrentMessage("");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages(thisChannel.chattingLogs);
  }, [thisChannel])

  const myUserAvatar = '';

  const otherUserAvatar = 'O';

  const [greeting, setGreeting] = useState([]);

  useEffect(() => {
    setGreeting([]);
  }, [thisChannel])


  const isMyMessage = (userId) => userId === user?.username;

  return (
    <Box sx={{ overflow: 'auto' }}>
      <Box sx={{ width: '100%', bgcolor: '#313338' }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          bgcolor: '#313338',
          padding: '10px',
        }}>
          <Avatar sx={{ bgcolor: grey[500], width: '46px', height: '46px', fontSize: '20px' }}>#</Avatar>
          <Box sx={{ marginLeft: '10px', color: 'white', fontWeight: 'bold', fontSize: '15px' }}>
            {thisChannel.channelName ? thisChannel.channelName : 'moon discord'}

          </Box>
        </Box>
        <Paper elevation={3} sx={{ bgcolor: '#313338' }}>
          <List sx={{ maxHeight: `${windowHeight}`, height: `${windowHeight - 191}px`, overflow: 'auto', bgcolor: '#313338' }}>
            <ListItem key="1" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginY: 1 }}>
              <Card variant="borderless" sx={{ bgcolor: '#313338', padding: '8px 16px' }}>
                {greeting.map((e) => {
                  return (
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* 상대방 메시지일 경우 */}
                        <Avatar sx={{ bgcolor: grey[500], marginRight: 1 }}>{otherUserAvatar}</Avatar>
                        <Box sx={{ fontWeight: 'bold', color: 'white', fontSize: '20px', marginTop: '-3px' }}>{e.name}</Box>
                      </Box>
                      <Box sx={{ fontSize: '16px', wordWrap: 'break-word', color: 'white' }}>{e.content}</Box> {/* 상대방 메세지 확인 용 테스트 List */}
                      <Box sx={{ fontSize: '12px', color: '#313338' }}>{ }</Box>
                    </CardContent>
                  )
                })}
              </Card>
            </ListItem>
            {messages.map((message, index) => (
              <ListItem key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginY: 1 }}>
                <Card variant="borderless" sx={{ bgcolor: '#313338', padding: '8px 16px' }}>
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
                        <Avatar sx={{ bgcolor: deepOrange[500], marginRight: 1 }}>{otherUserAvatar}</Avatar>
                        <Box sx={{ fontWeight: 'bold', color: 'white', fontSize: '20px', marginTop: '-3px' }}>{message?.username}</Box>
                      </Box>
                    )}
                    <Box sx={{ fontSize: '16px', wordWrap: 'break-word', color: 'white' }}>{message.text}</Box>
                    <Box sx={{ fontSize: '12px', color: '#313338' }}></Box>
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
