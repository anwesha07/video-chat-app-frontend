import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import lobbyStyles from './styles/lobbyStyles';

function JoinMeeting(props) {
  const { handleJoinMeeting, roomId: newRoomId } = props;

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
        onChange={handleEnterRoomId}
        value={roomId}
        sx={lobbyStyles.fieldEntryStyles}
        error={isRoomIdIncorrectError}
        helperText={isRoomIdIncorrectError ? 'please enter a valid ten digit roomId!' : ''}
      />
      <Typography>Enter passcode:</Typography>
      <TextField
        id="outlined-basic"
        label="Passcode"
        variant="outlined"
        onChange={handleEnterPasscode}
        value={passcode}
        sx={lobbyStyles.fieldEntryStyles}
        error={isPasscodeIncorrectError}
        helperText={isPasscodeIncorrectError ? 'please enter a valid six digit passcode!' : ''}
      />
      <Box>
        <Button variant="contained" type="submit">
          Join Room
        </Button>
      </Box>
    </Box>
  );
}

JoinMeeting.propTypes = {
  handleJoinMeeting: PropTypes.func.isRequired,
  roomId: PropTypes.string.isRequired,
};

export default JoinMeeting;
