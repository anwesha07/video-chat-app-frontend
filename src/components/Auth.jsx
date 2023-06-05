/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import axios from 'axios';
import PropTypes from 'prop-types';

import styles from './styles/authStyles';
import Login from './Login';
import Register from './Register';
import EchoLogo from '../video-chat.png';

function Auth(props) {
  const { setIsLoggedIn, setUser } = props;

  const [registeredUser, setRegisteredUser] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');

  const registerUser = (userData) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/auth/register`, userData)
      .then((res) => {
        localStorage.setItem('TOKEN', res.data.token);
        setIsLoggedIn(true);
        setUser({ userId: res.data._id, userName: res.data.userName });
      })
      .catch((error) => {
        if (!error.response) {
          setRegisterError('Something went wrong!');
        } else if (error.response.status === 409) {
          setRegisterError('User already exists!');
        } else {
          setRegisterError('Something went wrong!');
        }
      });
  };

  const loginUser = (userData) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/auth/login`, userData)
      .then((res) => {
        localStorage.setItem('TOKEN', res.data.token);
        setIsLoggedIn(true);
        setUser({ userId: res.data._id, userName: res.data.userName });
      })
      .catch((error) => {
        if (!error.response || error.response.status === 500) {
          setLoginError('Something went wrong!');
        } else {
          setLoginError('Incorrect Credentials!');
        }
      });
  };

  return (
    <Grid container sx={styles.container}>
      <Grid lg={4} sm={6} xs={12} lgOffset={4} smOffset={3} sx={styles.innerContainer}>
        <Typography variant="h2" component="h1" sx={styles.title}>
          <Box component="img" src={EchoLogo} alt="Echo" sx={styles.logo} />
          Echo
        </Typography>
        <Typography variant="subtitle1" component="h3" sx={styles.subtitle}>
          Connect with your loved ones in a jiffy!
        </Typography>
        <Box sx={styles.authForm}>
          {registeredUser ? (
            <Login
              loginError={loginError}
              setRegisteredUser={(status) => setRegisteredUser(status)}
              handleLoginFormSubmission={(userData) => loginUser(userData)}
            />
          ) : (
            <Register
              registerError={registerError}
              setRegisteredUser={(status) => setRegisteredUser(status)}
              handleRegisterFormSubmission={(userData) => registerUser(userData)}
            />
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

Auth.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default Auth;
