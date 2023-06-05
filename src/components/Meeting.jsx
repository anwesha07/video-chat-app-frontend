import React, { useEffect, useRef, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Grid, Box, Typography, CircularProgress, Button, IconButton, Card, CardMedia } from '@mui/material';
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
        // console.log(track.enabled);
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
        // console.log(track.enabled);
        // eslint-disable-next-line no-param-reassign
        track.enabled = !track.enabled;
      }
    });
  };
  useEffect(() => {
    if (!isLoggedIn) navigate('/');
  }, [isLoggedIn]);

  useEffect(() => {
    if (!stream) {
      startWebCam();
      setIsVideoLoading(true);
    }

    return () => {
      if (!stream) return;
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, [stream]);

  const endMeeting = () => {
    setToken(false);
    navigate('/');
  };

  useEffect(() => {
    if (!token) navigate('/', { state: { roomId } });
  }, [token]);

  const connectToRoom = () => {
    setRoom(null);
    Video.connect(token, {
      name: roomId,
    })
      .then((newRoom) => {
        // console.log(room);
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

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/auth/logout`, {}, config)
      .then((res) => {
        console.log(res);
        localStorage.removeItem('TOKEN');
        setIsLoggedIn(false);
        endMeeting();
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // eslint-disable-next-line max-len
  if (room) {
    console.log(userName);
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
          <Box sx={meetingStyles.cardFooter}>
            <IconButton
              color="primary"
              aria-label="Mute"
              onClick={() => toggleAudio()}
              sx={meetingStyles.meetingControlStyles}
            >
              {muteAudio ? <VolumeOffRoundedIcon /> : <VolumeUpRoundedIcon />}
            </IconButton>
            <IconButton
              color="primary"
              aria-label="Video off"
              onClick={() => toggleVideo()}
              sx={meetingStyles.meetingControlStyles}
            >
              {muteVideo ? <VideocamOffRoundedIcon /> : <VideocamRoundedIcon />}
            </IconButton>
            <IconButton
              color="primary"
              aria-label="Mute"
              onClick={() => endMeeting()}
              sx={{ ...meetingStyles.meetingControlStyles, ...meetingStyles.endMeetingButtonstyle }}
            >
              <CallEndRoundedIcon />
            </IconButton>
            <Box sx={meetingStyles.joinMeetingButtonContainerStyle}>
              {room === false ? (
                <Button
                  onClick={() => connectToRoom()}
                  // eslint-disable-next-line max-len
                  sx={{ ...meetingStyles.meetingControlStyles, ...meetingStyles.joinMeetingButtonStyle }}
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
                  sx={{ ...meetingStyles.meetingControlStyles, ...meetingStyles.joinMeetingButtonStyle }}
                >
                  <span>Joining</span>
                </LoadingButton>
              )}
            </Box>
          </Box>
          {/* {room === null ? (
            <Box sx={{ display: 'flex' }}>
              <Typography variant="h6">Connecting to room</Typography>
              <CircularProgress size={20} thickness={5} />
            </Box>
          ) : null} */}
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
