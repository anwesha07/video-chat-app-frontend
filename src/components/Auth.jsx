/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';

import meetCover from '../meetCover.png';
import styleClasses from './styles/authStyles';
import Login from './Login';
import Register from './Register';

function Auth(props) {
  const { setIsLoggedIn, setUser } = props;

  const [registeredUser, setRegisteredUser] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');

  const registerUser = (userData) => {
    // console.log(userData);
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/auth/register`, userData)
      .then((res) => {
        // console.log(res);
        localStorage.setItem('TOKEN', res.data.token);
        setIsLoggedIn(true);
        setUser({ userId: res.data._id, userName: res.data.userName });
      })
      .catch((error) => {
        console.log(error.response.data.message);
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
    console.log(userData);
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/auth/login`, userData)
      .then((res) => {
        console.log(res);
        localStorage.setItem('TOKEN', res.data.token);
        setIsLoggedIn(true);
        setUser({ userId: res.data._id, userName: res.data.userName });
      })
      .catch((error) => {
        // console.log(error.response.data.message);
        if (!error.response || error.response.status === 500) {
          setLoginError('Something went wrong!');
        } else {
          setLoginError('Incorrect Credentials!');
        }
      });
  };

  return (
    <Grid container sx={styleClasses.container}>
      <Grid item xs={8} sx={styleClasses.itemLeft}>
        <Box component="img" src={meetCover} alt="no image here" sx={styleClasses.image} />
      </Grid>
      <Grid item xs={4}>
        <Box sx={styleClasses.itemRight}>
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
