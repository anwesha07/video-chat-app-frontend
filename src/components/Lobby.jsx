/* eslint-disable max-len */
import { Grid, Card, CardActions, CardContent, Button, Alert } from '@mui/material';

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
        navigate(`/${roomId}`, { state: { token: res.data.token } });
        setIsTokenLoading(false);
        setJoinMeeting(false);
      })
      .catch((error) => {
        // something went wrong
        if (error.response?.status === 400 || error.response?.status === 404 || error.response?.status === 403) {
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
        setJoinMeeting(true);
      })
      .catch(() => {
        // something went wrong
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

    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/logout`, {}, config).then(() => {
      localStorage.removeItem('TOKEN');
      setIsLoggedIn(false);
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
              <CreateMeeting isTokenLoading={isTokenLoading} handleCreateMeeting={handleCreateMeeting} />
            ) : (
              <JoinMeeting isTokenLoading={isTokenLoading} handleJoinMeeting={handleJoinMeeting} roomId={roomId} />
            )}
            {serverError ? (
              <Alert severity="error" sx={lobbyStyles.errorAlert}>
                Something went wrong!
              </Alert>
            ) : null}
            {credentialError ? (
              <Alert severity="error" sx={lobbyStyles.errorAlert}>
                Room ID and passcode don&rsquo;t match!
              </Alert>
            ) : null}
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
