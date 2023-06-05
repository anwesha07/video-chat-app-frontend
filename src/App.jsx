/* eslint-disable react/jsx-wrap-multilines */
// import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './baseStyles.css';
// import VideoChat from './components/VideoChat';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
// import VideoChat from './components/VideoChat';
import { Container, CssBaseline, Typography } from '@mui/material';
import Home from './components';
import Meeting from './components/Meeting';
import NotFound from './components/NotFound';
import './components/styles/styles.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('TOKEN');
    const config = {
      headers: {
        'x-token': token,
      },
    };
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/auth/verify`, {}, config)
      .then((res) => {
        // console.log(res);
        setIsLoggedIn(res.data.isLoggedIn);
        setUser({ userId: res.data.userId, userName: res.data.userName });
      })
      .catch((error) => {
        console.log(error);
        setIsLoggedIn(false);
      });
  }, []);

  if (isLoggedIn === null) {
    return (
      <Container disableGutters>
        <Typography variant="h4">Loading....</Typography>
      </Container>
    );
  }

  return (
    <>
      <CssBaseline />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setIsLoggedIn={(status) => setIsLoggedIn(status)}
              isLoggedIn={isLoggedIn}
              user={user}
              setUser={(currentUser) => setUser(currentUser)}
            />
          }
        />
        <Route
          path="/:id"
          // eslint-disable-next-line max-len
          element={
            <Meeting
              setIsLoggedIn={(status) => setIsLoggedIn(status)}
              isLoggedIn={isLoggedIn}
              userName={user?.userName}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
