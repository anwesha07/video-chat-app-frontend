import React, { useEffect, useState } from 'react'
import Participant from './Participant.js'
import Video from 'twilio-video'

function Room({token, roomName, resetToken}) {

  const [room, setRoom] = useState(null);
  // participants will contain all remote participants
  const [participants, setParticipants] = useState([]);

  useEffect(()=> {
    // connecting to a room using the token
    Video.connect(token, {
      name: roomName
    })
    .then((room) => {
      // console.log(room);
      setRoom(room);

      const onParticipantConnect = participant => {
        setParticipants((existingParticipants) => [...existingParticipants, participant]);
      };
      const onParticipantDisconnect = participant => {
        setParticipants((existingParticipants) => {
          return existingParticipants.filter((existingParticipant) => existingParticipant !== participant)
        });
      }

      //set event handlers for participant connected and disconnected in room
      room.on('participantConnected', onParticipantConnect);
      room.on('participantDisconnected', onParticipantDisconnect);

      //add existing participants of the room in the participant array in state
      room.participants.forEach(participant => {
        onParticipantConnect(participant);
      });
    });

    //cleanup function to disconect from the room when room component is unmounted
    return () => {
      setRoom((currentRoom) => {
        if (currentRoom && currentRoom.localParticipant.state === 'connected') {

          // stop all the tracks of the local participant
          currentRoom.localParticipant.tracks.forEach((trackPublication) => {
            trackPublication.track.stop();
          });

          // disconnect from the room
          currentRoom.disconnect();

          // set the room as null
          return null;
        } else {
          return currentRoom;
        }
      });
    }
  }, [token, roomName])


  console.log(participants);

  return (
    <>
      {
        room ? 
          <div>

            {/* render the local participant */}
            <div className='localParticipant'>
              <Participant participant={room.localParticipant} />
            </div>


            <button onClick={()=> resetToken()}>Logout</button>



            {/* render the remote participants in the participant array state of the room component*/}
            <div className='remoteParticipants'>
              {
                participants.map((participant) => {
                  return <Participant key={participant.sid} participant={participant} />
                })
              }
            </div>
          </div>
        :
          <h1>
            Connecting to room...
          </h1>
      }
    </>
  )
}

export default Room