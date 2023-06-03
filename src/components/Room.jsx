import React, { useEffect, useState } from 'react';
// import Button from '@mui/material/Button';
import { Typography, Grid, Box, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
// import Video from 'twilio-video';
// oqqzekwnlc
import Participant from './Participant';
import meetingStyles from './styles/meetingStyles';
import Chat from './Chat';

function Room(props) {
  const { room, endMeeting, videoOffState, audioOffState, userName } = props;
  // participants will contain all remote participants
  const [participants, setParticipants] = useState([]);
  const [videoOff, setVideoOff] = useState(videoOffState);
  const [audioOff, setAudioOff] = useState(audioOffState);

  useEffect(() => {
    const onParticipantConnect = (participant) => {
      // eslint-disable-next-line max-len
      setParticipants((existingParticipants) => [
        ...existingParticipants,
        participant,
        participant,
        participant,
        participant,
      ]);
    };
    const onParticipantDisconnect = (participant) => {
      console.log(`participant Disconnected: ${participant}`);
      setParticipants(
        (existingParticipants) =>
          // console.log(existingParticipants);
          // eslint-disable-next-line implicit-arrow-linebreak
          existingParticipants.filter((existingParticipant) => existingParticipant !== participant),
        // eslint-disable-next-line function-paren-newline
      );
    };

    // set event handlers for participant connected and disconnected in room
    room.on('participantConnected', onParticipantConnect);
    room.on('participantDisconnected', onParticipantDisconnect);

    // add existing participants of the room in the participant array in state
    room.participants.forEach((participant) => {
      onParticipantConnect(participant);
    });

    // cleanup function to disconect from the room when room component is unmounted
    return () => {
      if (room.localParticipant.state === 'connected') {
        // stop all the tracks of the local participant
        room.localParticipant.tracks.forEach((trackPublication) => {
          trackPublication.track.stop();
        });

        // disconnect from the room
        room.disconnect();
        endMeeting();
      }
    };
  }, [room]);

  useEffect(() => {
    console.log({ useEffect: true, audioOff });
    if (audioOff) {
      room.localParticipant.audioTracks.forEach((trackPublication) => {
        trackPublication.track.disable();
      });
    } else {
      room.localParticipant.audioTracks.forEach((trackPublication) => {
        trackPublication.track.enable();
      });
    }
  }, [audioOff]);

  useEffect(() => {
    if (videoOff) {
      room.localParticipant.videoTracks.forEach((trackPublication) => {
        trackPublication.track.disable();
      });
    } else {
      room.localParticipant.videoTracks.forEach((trackPublication) => {
        trackPublication.track.enable();
      });
    }
  }, [videoOff]);

  const toggleAudio = () => {
    setAudioOff((currentState) => !currentState);
    console.log({ audioOff });
  };

  const toggleVideo = () => {
    setVideoOff((currentState) => !currentState);
  };

  const displayParticipants = () => {
    if (!room) return;
    const numberOfRemoteParticipants = participants.length;
    if (numberOfRemoteParticipants === 0) {
      // eslint-disable-next-line consistent-return
      return (
        <Box sx={meetingStyles.noRemoteParticipants}>
          <Box sx={meetingStyles.localParticipant}>
            <Participant
              participant={room.localParticipant}
              isLocal
              toggleAudio={toggleAudio}
              toggleVideo={toggleVideo}
              endMeeting={endMeeting}
              audioOff={audioOff}
              videoOff={videoOff}
            />
          </Box>
        </Box>
      );
    }
    if (numberOfRemoteParticipants === 1) {
      // eslint-disable-next-line consistent-return
      return (
        <Box sx={meetingStyles.oneRemoteParticipant}>
          <Box sx={meetingStyles.localParticipantOrderTwo}>
            <Participant
              participant={room.localParticipant}
              isLocal
              toggleAudio={toggleAudio}
              toggleVideo={toggleVideo}
              endMeeting={endMeeting}
              audioOff={audioOff}
              videoOff={videoOff}
            />
          </Box>
          <Box className="remoteParticipants" sx={meetingStyles.remoteParticipantOrderTwo}>
            {participants.map((participant) => (
              <Participant key={participant.sid} participant={participant} isLocal={false} />
            ))}
          </Box>
        </Box>
      );
    }
    if (numberOfRemoteParticipants >= 2) {
      // eslint-disable-next-line consistent-return
      return (
        <Box sx={meetingStyles.oneRemoteParticipant}>
          <Box sx={meetingStyles.localParticipantOrderThree}>
            <Participant
              participant={room.localParticipant}
              isLocal
              toggleAudio={toggleAudio}
              toggleVideo={toggleVideo}
              endMeeting={endMeeting}
              audioOff={audioOff}
              videoOff={videoOff}
            />
          </Box>
          <Box
            className="remoteParticipants"
            sx={{
              ...meetingStyles.remoteParticipantOrderThree,
              ...(numberOfRemoteParticipants >= 4 ? { justifyContent: 'start' } : {}),
            }}
          >
            {participants.map((participant) => (
              <Participant key={participant.sid} participant={participant} isLocal={false} />
            ))}
          </Box>
        </Box>
      );
    }
  };

  console.log(participants);

  return room ? (
    <Grid container direction="row">
      <Grid item sx={meetingStyles.participantsContainer}>
        {displayParticipants()}
      </Grid>
      <Grid item sx={meetingStyles.chatSection}>
        {console.log(userName)}
        <Chat roomId={room.name} userName={userName} />
      </Grid>
    </Grid>
  ) : (
    <Box sx={{ display: 'flex' }}>
      <Typography variant="h4">Connecting to room</Typography>
      <CircularProgress />
    </Box>
  );
}

Room.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  room: PropTypes.object.isRequired,
  endMeeting: PropTypes.func.isRequired,
  videoOffState: PropTypes.bool.isRequired,
  audioOffState: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
};

export default Room;
