import React, { useEffect, useRef, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress, Button, IconButton, Card, CardMedia } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Video from 'twilio-video';
import PropTypes from 'prop-types';
import axios from 'axios';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import CallEndRoundedIcon from '@mui/icons-material/CallEndRounded';
import VideocamOffRoundedIcon from '@mui/icons-material/VideocamOffRounded';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import LoadingButton from '@mui/lab/LoadingButton';
import Room from './Room';
import meetingStyles from './styles/meetingStyles';
import lobbyStyles from './styles/lobbyStyles';

import NavBar from './NavBar';

function Meeting(props) {
  const { setIsLoggedIn, userName, isLoggedIn } = props;

  const location = useLocation();
  const navigate = useNavigate();
  const videoElement = useRef();

  const [stream, setStream] = useState(null);
  const [muteVideo, setMuteVideo] = useState(false);
  const [muteAudio, setMuteAudio] = useState(false);
  const [room, setRoom] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  const [token, setToken] = useState(location.state ? location.state.token : false);
  const { id: roomId } = useParams();

  const startWebCam = () => {
    const video = videoElement.current;
    const constraints = { audio: true, video: { width: 640, height: 480 } };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((mediaStream) => {
        setStream(mediaStream);
        video.srcObject = mediaStream;
        video.onloadedmetadata = () => {
          setIsVideoLoading(false);
          video.play();
        };
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const toggleVideo = () => {
    if (!stream) return;
    setMuteVideo((currentState) => !currentState);
    stream.getTracks().forEach((track) => {
      if (track.kind === 'video') {
        // eslint-disable-next-line no-param-reassign
        track.enabled = !track.enabled;
      }
    });
  };

  const toggleAudio = () => {
    if (!stream) return;
    setMuteAudio((currentState) => !currentState);
    stream.getTracks().forEach((track) => {
      if (track.kind === 'audio') {
        // eslint-disable-next-line no-param-reassign
        track.enabled = !track.enabled;
      }
    });
  };

  // if user is not logged in redirect to home page
  useEffect(() => {
    if (!isLoggedIn) navigate('/');
  }, [isLoggedIn]);

  // no token implies directly link is entered so redirect to join meeting page
  useEffect(() => {
    if (!token) navigate('/', { state: { roomId } });
  }, [token]);

  // if token then start camera
  useEffect(() => {
    if (token && !stream) {
      startWebCam();
      setIsVideoLoading(true);
    }

    return () => {
      if (!stream) return;
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, [stream, token]);

  const endMeeting = () => {
    setToken(false);
    navigate('/');
  };

  const connectToRoom = () => {
    setRoom(null);
    Video.connect(token, {
      name: roomId,
    })
      .then((newRoom) => {
        setRoom(newRoom);
      })
      .catch((error) => {
        console.log(error);
        setRoom(false);
      });
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
      endMeeting();
      navigate('/');
    });
  };

  // once room is set go to room page
  if (room) {
    return (
      <Room
        room={room}
        endMeeting={endMeeting}
        audioOffState={muteAudio}
        videoOffState={muteVideo}
        userName={userName}
      />
    );
  }

  return token ? (
    <Grid container sx={lobbyStyles.container} direction="column">
      <Grid item>
        <NavBar userName={userName} logoutUser={logoutUser} />
      </Grid>
      <Grid item sx={lobbyStyles.contentContainer}>
        <Card sx={meetingStyles.cardStyles}>
          <Box sx={meetingStyles.upperContentStyles}>
            {isVideoLoading ? (
              <Box sx={meetingStyles.loaderStyles}>
                {/* eslint-disable-next-line max-len */}
                <CircularProgress size={20} thickness={5} sx={meetingStyles.loaderContentStyles} />
                <Typography sx={meetingStyles.loaderTextStyles}>Loading your video...</Typography>
              </Box>
            ) : null}
            <Box sx={meetingStyles.videoContainer}>
              {/* eslint-disable-next-line max-len */}
              {muteVideo && <Typography sx={meetingStyles.participantIcon}>{userName.slice(0, 2)}</Typography>}
              <CardMedia
                component="video"
                autoPlay
                id="videoElement"
                ref={videoElement}
                muted
                sx={meetingStyles.videoStyles}
              />
            </Box>
          </Box>
          <Grid container sx={meetingStyles.cardFooter}>
            <Grid lg={6} md={6} sm={12}>
              <IconButton
                color="primary"
                aria-label="Mute"
                onClick={toggleAudio}
                sx={{
                  ...meetingStyles.meetingControls,
                  ...(muteAudio ? meetingStyles.meetingControlsOff : {}),
                }}
              >
                {muteAudio ? <VolumeOffRoundedIcon /> : <VolumeUpRoundedIcon />}
              </IconButton>
              <IconButton
                color="primary"
                aria-label="Video off"
                onClick={toggleVideo}
                sx={{
                  ...meetingStyles.meetingControls,
                  ...(muteVideo ? meetingStyles.meetingControlsOff : {}),
                }}
              >
                {muteVideo ? <VideocamOffRoundedIcon /> : <VideocamRoundedIcon />}
              </IconButton>
              <IconButton
                color="primary"
                aria-label="End Meeting"
                onClick={endMeeting}
                sx={{ ...meetingStyles.meetingControls, ...meetingStyles.endMeetingButton }}
              >
                <CallEndRoundedIcon />
              </IconButton>
            </Grid>
            {/* eslint-disable-next-line max-len */}
            <Grid lgOffset={1} lg={5} md={6} sm={12} sx={meetingStyles.joinMeetingButtonContainerStyle}>
              {room === false ? (
                <Button
                  onClick={() => connectToRoom()}
                  // eslint-disable-next-line max-len
                  sx={{ ...meetingStyles.meetingControls, ...meetingStyles.joinMeetingButtonStyle }}
                >
                  Join Meeting
                </Button>
              ) : (
                <LoadingButton
                  disabled
                  loading
                  loadingPosition="end"
                  variant="contained"
                  // eslint-disable-next-line max-len
                  sx={{ ...meetingStyles.meetingControls, ...meetingStyles.joinMeetingButtonStyle }}
                >
                  <span>Joining</span>
                </LoadingButton>
              )}
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  ) : null;
}

Meeting.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
  userName: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired,
};

Meeting.defaultProps = {
  userName: 'Guest',
};

export default Meeting;
