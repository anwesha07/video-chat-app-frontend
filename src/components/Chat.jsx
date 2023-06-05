import { Box, Card, InputBase, Typography, IconButton, Paper } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import PropTypes from 'prop-types';
import chattingStyles from './styles/chattingStyles';

const URL = process.env.REACT_APP_SERVER_URL;

function Chat(props) {
  const { roomId, userName } = props;

  const socket = useRef(null);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  console.log(chatMessages);

  useEffect(() => {
    socket.current = io(URL);
    socket.current.on('connect', () => {
      console.log(`Client connected to server: ${socket.current.id}`);
      socket.current.emit('clientConnected', roomId, (response) => {
        console.log(response);
      });
    });
    socket.current.on('messageReceived', (messageObject) => {
      console.log(messageObject);
      setChatMessages((currentChatMessages) => [...currentChatMessages, messageObject]);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      console.log(message);
      const messageObject = {
        name: userName,
        message,
      };
      console.log(messageObject);
      socket.current.emit('message', messageObject);
      setChatMessages((currentChatMessages) => [...currentChatMessages, messageObject]);
    }
    setMessage('');
  };

  const displayChat = () =>
    // eslint-disable-next-line implicit-arrow-linebreak
    chatMessages.map((messageObj) => (
      <Box
        sx={
          messageObj.name === userName
            ? { ...chattingStyles.messageBlockStyle, ...chattingStyles.messageBlockUser }
            : { ...chattingStyles.messageBlockStyle, ...chattingStyles.messageBlockOthers }
        }
      >
        <Box sx={chattingStyles.senderNameStyle}>
          {messageObj.name === userName ? (
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
              You
            </Typography>
          ) : (
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
              {messageObj.name}
            </Typography>
          )}
        </Box>
        <Paper sx={chattingStyles.messageCard}>
          <Box sx={chattingStyles.messageContainer}>
            <Typography variant="body2">{messageObj.message}</Typography>
          </Box>
        </Paper>
      </Box>
    ));

  return (
    <Card sx={chattingStyles.chatContainer}>
      <Box sx={chattingStyles.chatDisplaysection}>{displayChat()}</Box>
      <Box component="form" sx={chattingStyles.messagingSection} onSubmit={(event) => sendMessage(event)}>
        {/* <TextField variant="Outlined" /> */}
        <InputBase
          sx={chattingStyles.messageInputBox}
          placeholder="Enter your message here"
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <IconButton type="submit" color="primary" aria-label="Send" sx={chattingStyles.messageSendButton}>
          <SendRoundedIcon />
        </IconButton>
      </Box>
    </Card>
  );
}
Chat.propTypes = {
  roomId: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};
export default Chat;
