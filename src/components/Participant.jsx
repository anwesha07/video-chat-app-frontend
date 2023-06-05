import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, CardMedia, Typography } from '@mui/material';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import CallEndRoundedIcon from '@mui/icons-material/CallEndRounded';
import VideocamOffRoundedIcon from '@mui/icons-material/VideocamOffRounded';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import participantStyles from './styles/participantStyles';
import meetingStyles from './styles/meetingStyles';

function Participant(props) {
  // eslint-disable-next-line max-len
  const { participant, isLocal, toggleAudio, toggleVideo, endMeeting, audioOff, videoOff } = props;
  // audio and video tracks of all participants
  const [audioTracks, setAudioTracks] = useState([]);
  const [videoTracks, setVideoTracks] = useState([]);
  const [isAudioEnabled, setIsAudioEnabled] = useState(!audioOff);
  const [isVideoEnabled, setIsVideoEnabled] = useState(!videoOff);

  // refs to access the audio and video elements
  const audioRef = useRef();
  const videoRef = useRef();

  useEffect(() => {
    setIsAudioEnabled(!audioOff);
  }, [audioOff]);

  useEffect(() => {
    setIsVideoEnabled(!videoOff);
  }, [videoOff]);

  // the participant object contains a trackMap of track publications, we have to extract
  // tracks from them to attach to the video and audio elements
  const convertTrackPublicationToTrack = (trackMap) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    Array.from(trackMap.values())
      // extracting tracks from track publication in track map of participant
      .map((trackPub) => trackPub.track)
      // removing the null tracks
      .filter((track) => track !== null);

  const handleTrackUpdate = (track) => {
    if (track.kind === 'video') setIsVideoEnabled(track.isEnabled);
    if (track.kind === 'audio') setIsAudioEnabled(track.isEnabled);

    track.on('enabled', () => {
      if (track.kind === 'video') setIsVideoEnabled(true);
      if (track.kind === 'audio') setIsAudioEnabled(true);
    });
    track.on('disabled', () => {
      if (track.kind === 'video') setIsVideoEnabled(false);
      if (track.kind === 'audio') setIsAudioEnabled(false);
    });
  };

  useEffect(() => {
    const trackSubscribed = (track) => {
      if (track.kind === 'video') {
        setVideoTracks((videotracks) => [...videotracks, track]);
      } else {
        setAudioTracks((audiotracks) => [...audiotracks, track]);
      }
      track.on('enabled', () => {
        if (track.kind === 'video') {
          setIsVideoEnabled(true);
        } else {
          setIsAudioEnabled(true);
        }
      });
      track.on('disabled', () => {
        if (track.kind === 'video') {
          setIsVideoEnabled(false);
        } else {
          setIsAudioEnabled(false);
        }
      });
    };

    const trackUnsubscribed = (track) => {
      if (track.kind === 'video') {
        // eslint-disable-next-line max-len
        setVideoTracks((existingVideoTracks) => existingVideoTracks.filter((videotrack) => videotrack !== track));
      } else {
        // eslint-disable-next-line max-len
        setAudioTracks((existingAudioTracks) => existingAudioTracks.filter((audiotrack) => audiotrack !== track));
      }
    };

    // add the existing audio and video tracks from the trackMap
    // of the participant object to the state
    setAudioTracks(convertTrackPublicationToTrack(participant.audioTracks));
    setVideoTracks(convertTrackPublicationToTrack(participant.videoTracks));

    participant.tracks.forEach((publication) => {
      if (publication.isSubscribed) {
        handleTrackUpdate(publication.track);
      }
      publication.on('subscribed', handleTrackUpdate);
    });

    participant.on('trackSubscribed', trackSubscribed);
    participant.on('trackUnsubscribed', trackUnsubscribed);

    // cleanup function
    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  // To attach the video tracks to the <video/> element
  useEffect(() => {
    // get the first video track from the videoTracks in state and,
    //  if it exists, attach it to the <video/> DOM node captured with a ref
    const videoTrack = videoTracks[0];
    if (videoTrack) videoTrack.attach(videoRef.current);

    // cleanup function to detach the video tracks
    return () => {
      if (videoTrack) videoTrack.detach();
    };
  }, [videoTracks]);

  // To attach the audio tracks to the <audio/> element
  useEffect(() => {
    // get the first audio track from the audioTracks in state and,
    //  if it exists, attach it to the <audio/> DOM node captured with a ref
    const audioTrack = audioTracks[0];
    if (audioTrack) audioTrack.attach(audioRef.current);

    return () => {
      // cleanup function to detach the audio tracks
      if (audioTrack) audioTrack.detach();
    };
  }, [audioTracks]);

  return (
    <Box
      sx={
        isLocal
          ? participantStyles.participant
          : { ...participantStyles.participant, ...participantStyles.remoteParticipant }
      }
    >
      {!isVideoEnabled && (
        <Typography sx={meetingStyles.participantIcon}>
          {participant.identity.slice(0, 2)}
        </Typography>
      )}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <Box sx={participantStyles.participantVideoContainer}>
        <Typography variant="body1" sx={participantStyles.participantName}>
          {isLocal ? 'You' : (
            <>
              {!isAudioEnabled
                && <VolumeOffIcon sx={participantStyles.remoteParticipantMutedIcon} />}
              {participant.identity}
            </>
          )}
        </Typography>
        <CardMedia component="video" ref={videoRef} autoPlay sx={participantStyles.participantVideo} />
      </Box>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} autoPlay />
      {isLocal ? (
        <Box sx={participantStyles.meetingControlContainer}>
          <IconButton
            color="primary"
            aria-label="Mute"
            onClick={toggleAudio}
            sx={{
              ...meetingStyles.meetingControls,
              ...participantStyles.meetingControls,
              ...(!isAudioEnabled ? meetingStyles.meetingControlsOff : {}),
            }}
          >
            {!isAudioEnabled ? (
              <VolumeOffRoundedIcon sx={participantStyles.meetingControlIcons} />
            ) : (
              <VolumeUpRoundedIcon sx={participantStyles.meetingControlIcons} />
            )}
          </IconButton>
          <IconButton
            color="primary"
            aria-label="Video off"
            onClick={toggleVideo}
            sx={{
              ...meetingStyles.meetingControls,
              ...participantStyles.meetingControls,
              ...(!isVideoEnabled ? meetingStyles.meetingControlsOff : {}),
            }}
          >
            {!isVideoEnabled ? (
              <VideocamOffRoundedIcon sx={participantStyles.meetingControlIcons} />
            ) : (
              <VideocamRoundedIcon sx={participantStyles.meetingControlIcons} />
            )}
          </IconButton>
          <IconButton
            color="primary"
            aria-label="Mute"
            onClick={endMeeting}
            sx={{
              ...meetingStyles.meetingControls,
              ...participantStyles.meetingControls,
              ...meetingStyles.endMeetingButton,
            }}
          >
            <CallEndRoundedIcon sx={participantStyles.meetingControlIcons} />
          </IconButton>
          {/* <Button aria-label="end" onClick={endMeeting}>
            End
          </Button>
          <Button onClick={toggleAudio}>Mute</Button>
          <Button onClick={toggleVideo}>Video off</Button> */}
        </Box>
      ) : null}
    </Box>
  );
}

Participant.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  participant: PropTypes.object.isRequired,
  toggleAudio: PropTypes.func.isRequired,
  toggleVideo: PropTypes.func.isRequired,
  endMeeting: PropTypes.func.isRequired,
  isLocal: PropTypes.bool.isRequired,
  audioOff: PropTypes.bool,
  videoOff: PropTypes.bool,
};

Participant.defaultProps = {
  audioOff: false,
  videoOff: false,
};

export default Participant;
