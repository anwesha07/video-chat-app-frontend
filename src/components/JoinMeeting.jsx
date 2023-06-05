import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import lobbyStyles from './styles/lobbyStyles';

function JoinMeeting(props) {
  const { handleJoinMeeting, roomId: newRoomId, isTokenLoading } = props;

  const [roomId, setRoomId] = useState(newRoomId);
  const [passcode, setPasscode] = useState('');
  const [isRoomIdIncorrectError, setIsRoomIdIncorrectError] = useState(false);
  const [isPasscodeIncorrectError, setIsPasscodeIncorrectError] = useState(false);

  const handleEnterRoomId = (event) => {
    if (isRoomIdIncorrectError) setIsRoomIdIncorrectError(false);
    setRoomId(event.target.value);
  };
  const handleEnterPasscode = (event) => {
    if (isPasscodeIncorrectError) setIsPasscodeIncorrectError(false);
    setPasscode(event.target.value);
  };
  const handleJoinMeetingFormSubmission = (event) => {
    event.preventDefault();
    const regex = /^[a-zA-Z0-9]+$/;
    if (roomId.length !== 10 || !regex.test(roomId)) setIsRoomIdIncorrectError(true);
    if (passcode.length !== 6) setIsPasscodeIncorrectError(true);
    else {
      handleJoinMeeting(roomId, passcode);
    }
  };
  return (
    <Box component="form" onSubmit={handleJoinMeetingFormSubmission} sx={lobbyStyles.formStyles}>
      <Typography>Enter your room ID:</Typography>
      <TextField
        id="outlined-basic"
        label="Room ID"
        variant="outlined"
        fullWidth
        autoComplete="off"
        onChange={handleEnterRoomId}
        value={roomId}
        sx={lobbyStyles.fieldEntryStyles}
        error={isRoomIdIncorrectError}
        helperText={isRoomIdIncorrectError ? 'Please enter a valid ten digit roomId!' : ''}
      />
      <Typography>Enter passcode:</Typography>
      <TextField
        id="outlined-basic"
        label="Passcode"
        variant="outlined"
        fullWidth
        autoComplete="off"
        onChange={handleEnterPasscode}
        value={passcode}
        sx={lobbyStyles.fieldEntryStyles}
        error={isPasscodeIncorrectError}
        helperText={isPasscodeIncorrectError ? 'Please enter a valid six digit passcode!' : ''}
      />
      <Button variant="contained" type="submit" disabled={isTokenLoading} sx={lobbyStyles.button}>
        {!isTokenLoading ? 'Join Room' : 'Connecting...'}
      </Button>
    </Box>
  );
}

JoinMeeting.propTypes = {
  handleJoinMeeting: PropTypes.func.isRequired,
  roomId: PropTypes.string.isRequired,
  isTokenLoading: PropTypes.bool.isRequired,
};

export default JoinMeeting;
