import React, { useState, useRef, useEffect } from 'react';
import { Box, Paper, List, ListItem, Card, CardContent, Avatar, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { deepPurple, grey } from '@mui/material/colors';

function ChatUI() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [messageTimes, setMessageTimes] = useState([]);

  const sendMessage = () => {
    if (currentMessage.trim() !== "") {
      const newTime = new Date();
      const newMessage = {
        text: currentMessage, // 메시지 텍스트
        userId: myUserId, // 메시지를 보내는 유저의 ID
        time: new Date() // 메시지 보낸 시간
      };
      setMessages([...messages, newMessage]);
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

  // 시간을 원하는 포맷으로 변환하는 함수
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };

  const myUserId = 'user123';
  const myUserName = 'MYNAME';
  const myUserAvatar = 'U';
  const otherUserId = 'user2';
  const otherUserName = 'OTHERNAME';
  const otherUserAvatar = 'U';

  const isMyMessage = (userId) => userId === myUserId;

  return (
    <Box sx={{ width: '100%', maxWidth: 1200, bgcolor: grey[900] }}>
      <Box sx={{ 
  display: 'flex', 
  alignItems: 'center', 
  bgcolor: grey[900], 
  padding: '10px',
}}>
  <Avatar sx={{ bgcolor: grey[500], width: '20px', height: '20px', fontSize: '10px'}}>{otherUserAvatar}</Avatar>
  <Box sx={{ marginLeft: '10px', color: 'white', fontWeight: 'bold', fontSize:'15px'}}>
    {otherUserName}
  </Box>
</Box>
      <Paper elevation={3} sx={{ bgcolor: grey[800] }}>
        <List sx={{ maxHeight: 300, overflow: 'auto', bgcolor: grey[800] }}>
        <ListItem key="1" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginY: 1 }}>
            <Card variant="borderless" sx={{ bgcolor: grey[800],  padding: '8px 16px' }}>
              <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* 상대방 메시지일 경우 */}
                    <Avatar sx={{ bgcolor: grey[500], marginRight: 1 }}>{otherUserAvatar}</Avatar>
                    <Box sx={{ fontWeight: 'bold', color: 'white', fontSize: '20px', marginTop: '-15px'}}>Other</Box>
                  </Box>
                <Box sx={{ fontSize: '16px', wordWrap: 'break-word', color: 'white' }}>테스트 용 메세지</Box> {/* 상대방 메세지 확인 용 테스트 List */}
                <Box sx={{ fontSize: '12px', color: grey[500]}}>{formatTime(new Date())}</Box>
              </CardContent>
            </Card>
          </ListItem>
        {messages.map((message, index) => (
          <ListItem key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems:'flex-start', marginY: 1 }}>
            <Card variant="borderless" sx={{ bgcolor: grey[800],  padding: '8px 16px' }}>
              <CardContent>
                {isMyMessage(message.userId) ? (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* 내 메시지일 경우 */}
                    <Avatar sx={{ bgcolor: deepPurple[500], marginRight: 1 }}>{myUserAvatar}</Avatar>
                    <Box sx={{ fontWeight: 'bold', color: 'white', fontSize: '20px', marginTop: '-15px'}}>{myUserName}</Box>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* 상대방 메시지일 경우 */}
                    <Avatar sx={{ bgcolor: grey[500], marginRight: 1 }}>{otherUserAvatar}</Avatar>
                    <Box sx={{ fontWeight: 'bold', color: 'white', fontSize: '20px', marginTop: '-15px'}}>{otherUserName}</Box>
                  </Box>
                )}
                <Box sx={{ fontSize: '16px', wordWrap: 'break-word', color: 'white' }}>{message.text}</Box>
                <Box sx={{ fontSize: '12px', color: grey[500] }}>{formatTime(message.time)}</Box>
              </CardContent>
            </Card>
          </ListItem>
        ))}
          <div ref={messagesEndRef} />
        </List>
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
          <IconButton color="primary" aria-label="add photo">
            <AddAPhotoIcon />
          </IconButton>
          <TextField
            fullWidth
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            margin="normal"
            inputProps={{ style: { fontSize: '14px' } }}
          />
          {/* 전송 아이콘을 IconButton에 넣기 */}
          <IconButton color="primary" aria-label="send message" onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
}

export default ChatUI;