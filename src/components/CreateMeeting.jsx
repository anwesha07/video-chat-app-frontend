import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Button, TextField, Typography } from '@mui/material';
import lobbyStyles from './styles/lobbyStyles';

function CreateMeeting(props) {
  const [passCode, setPassCode] = useState('');
  const [isPasscodeIncorrectError, setIsPasscodeIncorrectError] = useState(false);

  const { handleCreateMeeting } = props;

  const handleEnterPasscode = (event) => {
    if (isPasscodeIncorrectError) setIsPasscodeIncorrectError(false);
    setPassCode(event.target.value);
  };
  const handleCreateMeetingFormSubmission = (event) => {
    event.preventDefault();
    const regex = /^[a-zA-Z0-9]+$/;
    if (passCode.length !== 6 || !regex.test(passCode)) setIsPasscodeIncorrectError(true);
    else {
      handleCreateMeeting(passCode);
    }
  };

  return (
    <Box component="form" onSubmit={handleCreateMeetingFormSubmission} sx={lobbyStyles.formStyles}>
      <Typography>Enter a passcode for your meeting:</Typography>

      <TextField
        id="outlined-basic"
        label="Passcode"
        variant="outlined"
        onChange={handleEnterPasscode}
        value={passCode}
        sx={lobbyStyles.fieldEntryStyles}
        error={isPasscodeIncorrectError}
        helperText={isPasscodeIncorrectError ? 'please enter a valid six digit passcode!' : ''}
      />
      <Box>
        <Button variant="contained" type="submit">
          Create Meeting
        </Button>
      </Box>
    </Box>
  );
}

CreateMeeting.propTypes = {
  handleCreateMeeting: PropTypes.func.isRequired,
};

export default CreateMeeting;
