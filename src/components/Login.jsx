import React, { useState } from 'react';

import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid, Typography, Link, Alert } from '@mui/material';
import Box from '@mui/material/Box';

import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import styleClasses from './styles/authStyles';

function Login(props) {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [userNameMissingError, setUserNameMissingError] = useState(false);
  const [passwordMissingError, setPasswordMissingError] = useState(false);

  const { setRegisteredUser, handleLoginFormSubmission, loginError } = props;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleUserNameInput = (event) => {
    if (event.target.value && userNameMissingError) {
      setUserNameMissingError(false);
    }

    setUsername(event.target.value);
  };
  const handlePasswordInput = (event) => {
    if (event.target.value && passwordMissingError) {
      setPasswordMissingError(false);
    }
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userName || !password) {
      if (!userName) setUserNameMissingError(true);
      if (!password) setPasswordMissingError(true);
    } else {
      handleLoginFormSubmission({ userName, password });
    }
  };

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      <Grid container sx={styleClasses.formHeader}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
      </Grid>
      <Grid item sx={styleClasses.form}>
        <Box component="form" sx={styleClasses.form} onSubmit={handleSubmit}>
          <TextField
            type="text"
            label="Username"
            variant="outlined"
            sx={styleClasses.inputBox}
            onChange={handleUserNameInput}
            value={userName}
            error={userNameMissingError}
            helperText={userNameMissingError ? 'Userename is required' : ''}
          />

          <TextField
            type={showPassword ? 'text' : 'password'}
            label="Password"
            variant="outlined"
            sx={styleClasses.inputBox}
            onChange={handlePasswordInput}
            value={password}
            error={passwordMissingError}
            helperText={passwordMissingError ? 'Password is required' : ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {loginError ? (
            <Alert severity="error" sx={styleClasses.errorMessage}>
              {loginError}
            </Alert>
          ) : null}

          <Box sx={styleClasses.submitButtonContainer}>
            <Button variant="contained" type="submit" sx={styleClasses.submitButton}>
              Login
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid container sx={styleClasses.formFooter}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link
          component="button"
          variant="body2"
          underline="none"
          sx={styleClasses.changePageLink}
          onClick={() => {
            setRegisteredUser(false);
          }}
        >
          Not yet registered? Register here
        </Link>
      </Grid>
    </Grid>
  );
}

Login.propTypes = {
  loginError: PropTypes.string.isRequired,
  setRegisteredUser: PropTypes.func.isRequired,
  handleLoginFormSubmission: PropTypes.func.isRequired,
};

export default Login;
