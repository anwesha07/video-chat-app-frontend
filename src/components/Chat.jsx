import { Box, Card, InputBase, Typography, IconButton, Paper } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import PropTypes from 'prop-types';
import chattingStyles from './styles/chattingStyles';

function Chat(props) {
  const { roomId, userName } = props;

  const socket = useRef(null);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    // set up web socket conn with server
    socket.current = io(process.env.REACT_APP_SERVER_URL);
    socket.current.on('connect', () => {
      socket.current.emit('clientConnected', roomId);
    });
    socket.current.on('messageReceived', (messageObject) => {
      setChatMessages((currentChatMessages) => [
        ...currentChatMessages,
        {
          ...messageObject,
          timestamp: new Date(),
        },
      ]);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      const messageObject = {
        name: userName,
        message,
      };
      socket.current.emit('message', messageObject);
      setChatMessages((currentChatMessages) => [
        ...currentChatMessages,
        {
          ...messageObject,
          timestamp: new Date(),
        },
      ]);
    }
    setMessage('');
  };

  const displayChat = () =>
    // eslint-disable-next-line implicit-arrow-linebreak
    chatMessages.map((messageObj, idx) => (
      // eslint-disable-next-line react/no-array-index-key
      <Box sx={chattingStyles.messageBlockStyle} key={idx}>
        <Box sx={chattingStyles.senderDetails}>
          <Typography variant="caption" sx={chattingStyles.senderName}>
            {messageObj.name === userName ? 'You' : messageObj.name}
          </Typography>
          <Typography variant="subtitle" sx={chattingStyles.sendTime}>
            {messageObj.timestamp.toLocaleTimeString('en-IN', { timeStyle: 'short' })}
          </Typography>
        </Box>
        <Paper sx={chattingStyles.messageCard}>
          <Typography variant="body2">{messageObj.message}</Typography>
        </Paper>
      </Box>
    ));

  return (
    <Card sx={chattingStyles.chatContainer}>
      <Typography variant="h2" sx={chattingStyles.chatTitle}>
        Chat Messages
      </Typography>
      <Typography variant="caption" component="p" sx={chattingStyles.chatInfo}>
        The messages sent in the chat are not stored and will disappear once you disconnect
      </Typography>
      <Box sx={chattingStyles.chatDisplaysection}>{displayChat()}</Box>
      <Box component="form" sx={chattingStyles.messagingSection} onSubmit={(event) => sendMessage(event)}>
        <InputBase
          sx={chattingStyles.messageInputBox}
          placeholder="Enter your message here"
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <IconButton
          type="submit"
          color="primary"
          aria-label="Send"
          disabled={message.length === 0}
          sx={chattingStyles.messageSendButton}
        >
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
