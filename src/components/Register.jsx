import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid, Typography, Link, Alert } from '@mui/material';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import styleClasses from './styles/authStyles';

function Register(props) {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const [isPasswordMismatchError, setIsPasswordMismatchError] = useState(false);
  const [userNameMissingError, setUserNameMissingError] = useState(false);
  const [passwordMissingError, setPasswordMissingError] = useState(false);
  const [invalidPasswordError, setInvalidPasswordError] = useState(false);
  const [invalidUserNameError, setInvalidUserNameError] = useState(false);
  // const [confirmPasswordMisssingError, setConfirmPasswordMissingError] = useState(false);

  const { handleRegisterFormSubmission, setRegisteredUser, registerError } = props;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleUserNameInput = (event) => {
    // if (event.target.value && userNameMissingError) setUserNameMissingError(false);
    setUserNameMissingError(false);
    setInvalidUserNameError(false);

    setUsername(event.target.value);
  };
  const handlePasswordInput = (event) => {
    setIsPasswordMismatchError(false);
    setPasswordMissingError(false);
    setInvalidPasswordError(false);
    // if (event.target.value && passwordMissingError) setPasswordMissingError(false);
    setPassword(event.target.value);
  };

  const handleConfirmPasswordInput = (event) => {
    setIsPasswordMismatchError(false);
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userName || !password) {
      if (!userName) setUserNameMissingError(true);
      if (!password) setPasswordMissingError(true);
    } else if (password.length < 8 || userName.length < 3) {
      if (password.length < 8) setInvalidPasswordError(true);
      if (userName.length < 3) setInvalidUserNameError(true);
    } else if (confirmPassword !== password) setIsPasswordMismatchError(true);
    else {
      handleRegisterFormSubmission({ userName, password, confirmPassword });
    }
  };

  const passwordErrorHelperText = () => {
    if (passwordMissingError) return 'Password is required!';
    if (invalidPasswordError) return 'Password should be atleast 8 characters long!';
    // if (isPasswordMismatchError) return 'Passwords are not matching!';
    return '';
  };

  const userNameErrorHelperText = () => {
    if (userNameMissingError) return 'Username s required!';
    if (invalidUserNameError) return 'Username should be atleast 3 characters long!';
    return '';
  };

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      <Grid container sx={styleClasses.formHeader}>
        <Typography variant="h5" gutterBottom>
          {' '}
          Register Yourself
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
            error={userNameMissingError || invalidUserNameError}
            helperText={userNameErrorHelperText()}
          />

          <TextField
            type={showPassword ? 'text' : 'password'}
            label="Password"
            variant="outlined"
            sx={styleClasses.inputBox}
            onChange={handlePasswordInput}
            value={password}
            error={passwordMissingError || invalidPasswordError || isPasswordMismatchError}
            helperText={passwordErrorHelperText()}
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

          <TextField
            type={showConfirmPassword ? 'text' : 'password'}
            label="Confirm Password"
            variant="outlined"
            sx={styleClasses.inputBox}
            onChange={handleConfirmPasswordInput}
            value={confirmPassword}
            error={isPasswordMismatchError}
            helperText={isPasswordMismatchError ? 'Passwords are not matching' : ''}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {registerError ? (
            <Alert severity="error" sx={styleClasses.errorMessage}>
              {registerError}
            </Alert>
          ) : null}

          <Box sx={styleClasses.submitButtonContainer}>
            <Button variant="contained" type="submit" sx={styleClasses.submitButton}>
              Submit
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
            setRegisteredUser(true);
          }}
        >
          Already registered? Login here
        </Link>
      </Grid>
    </Grid>
  );
}

Register.propTypes = {
  handleRegisterFormSubmission: PropTypes.func.isRequired,
  setRegisteredUser: PropTypes.func.isRequired,
  registerError: PropTypes.string.isRequired,
};

export default Register;
