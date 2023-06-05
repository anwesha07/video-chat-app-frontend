/* eslint-disable max-len */
import { Grid, Box, Card, CardActions, CardContent, Button, CircularProgress, Alert } from '@mui/material';

import React, { useEffect, useState } from 'react';

import axios from 'axios';
import PropTypes from 'prop-types';

import { useLocation, useNavigate } from 'react-router-dom';
import lobbyStyles from './styles/lobbyStyles';
import NavBar from './NavBar';
import CreateMeeting from './CreateMeeting';
import JoinMeeting from './JoinMeeting';

function Lobby(props) {
  const location = useLocation();

  const [active, setActiveState] = useState(location.state && location.state.roomId ? 'joinMeeting' : 'createMeeting');
  const [joinMeeting, setJoinMeeting] = useState(false);
  const [roomId, setRoomId] = useState(location.state ? location.state.roomId : '');
  const [passcode, setPassCode] = useState('');
  const [isTokenLoading, setIsTokenLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [credentialError, setCredentialError] = useState(false);

  const navigate = useNavigate();

  const { setIsLoggedIn, userName } = props;

  useEffect(() => {
    if (!joinMeeting) return;

    const data = {
      roomId,
      passcode,
    };
    const TOKEN = localStorage.getItem('TOKEN');
    const config = {
      headers: {
        'x-token': TOKEN,
      },
    };

    // fetching token for creating new room
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/room/join`, data, config)
      .then((res) => {
        console.log(res.data);
        navigate(`/${roomId}`, { state: { token: res.data.token } });
        setIsTokenLoading(false);
        setJoinMeeting(false);
      })
      .catch((error) => {
        // something went wrong
        console.log(error);
        if (error.response.status === 400 || error.response.status === 404 || error.response.status === 403) {
          setCredentialError(true);
        } else setServerError(true);
        setIsTokenLoading(false);
        setJoinMeeting(false);
      });
  }, [joinMeeting]);

  const handleCreateMeeting = (newPasscode) => {
    setCredentialError(false);
    setServerError(false);
    setIsTokenLoading(true);
    console.log(newPasscode);
    const TOKEN = localStorage.getItem('TOKEN');
    const config = {
      headers: {
        'x-token': TOKEN,
      },
    };
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/room/`, { passcode: newPasscode }, config)
      .then((res) => {
        const { roomId: newRoomId } = res.data;
        setRoomId(newRoomId);
        setPassCode(newPasscode);
        console.log(res.data);
        setJoinMeeting(true);
        // navigate(`/${roomId}`, { state: { passcode } });
      })
      .catch((error) => {
        // something went wrong
        console.log(error);
        setServerError(true);
        setIsTokenLoading(false);
      });
  };

  const handleJoinMeeting = (newRoomId, newPasscode) => {
    setCredentialError(false);
    setServerError(false);
    setIsTokenLoading(true);
    setRoomId(newRoomId);
    setPassCode(newPasscode);
    setJoinMeeting(true);
  };

  // logging out user
  const logoutUser = () => {
    const TOKEN = localStorage.getItem('TOKEN');

    const config = {
      headers: {
        'x-token': TOKEN,
      },
    };

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/auth/logout`, {}, config)
      .then((res) => {
        console.log(res);
        localStorage.removeItem('TOKEN');
        setIsLoggedIn(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid container sx={lobbyStyles.container} direction="column">
      <Grid item>
        <NavBar userName={userName} logoutUser={logoutUser} />
      </Grid>
      <Grid item sx={lobbyStyles.contentContainer}>
        <Card sx={lobbyStyles.cardStyle}>
          <CardActions sx={lobbyStyles.cardActions}>
            <Button
              size="large"
              sx={{ ...lobbyStyles.cardButton, ...(active === 'createMeeting' ? lobbyStyles.activeCardButton : {}) }}
              onClick={() => {
                setCredentialError(false);
                setServerError(false);
                setIsTokenLoading(false);
                setActiveState('createMeeting');
              }}
              disabled={isTokenLoading}
            >
              Create Meeting
            </Button>
            <Button
              size="large"
              sx={{ ...lobbyStyles.cardButton, ...(active === 'joinMeeting' ? lobbyStyles.activeCardButton : {}) }}
              onClick={() => {
                setCredentialError(false);
                setServerError(false);
                setIsTokenLoading(false);
                setActiveState('joinMeeting');
              }}
              disabled={isTokenLoading}
            >
              Join Meeting
            </Button>
          </CardActions>
          <CardContent>
            {active === 'createMeeting' ? (
              <CreateMeeting handleCreateMeeting={handleCreateMeeting} />
            ) : (
              <JoinMeeting handleJoinMeeting={handleJoinMeeting} roomId={roomId} />
            )}
            {isTokenLoading ? (
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
                Connecting to room
              </Box>
            ) : null}
            {serverError ? <Alert severity="error">Something went wrong!</Alert> : null}
            {credentialError ? <Alert severity="error">Room ID and passcode donot match!</Alert> : null}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

Lobby.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
};

export default Lobby;
