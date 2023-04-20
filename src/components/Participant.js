import React, { useState, useEffect, useRef } from 'react'

function Participant({participant}) {

  //audio and video tracks of all participants
  const [audioTracks, setAudioTracks] = useState([]);
  const [videoTracks, setVideoTracks] = useState([]);

  // refs to access the audio and video elements
  const audioRef = useRef();
  const videoRef = useRef();

  // the participant object contains a trackMap of track publications, we have to extract tracks from them to attach to the video and audio elements
  const convertTrackPublicationToTrack = (trackMap) => {
    return Array.from(trackMap.values())
      .map((trackPub) => trackPub.track) // extracting tracks from track publication in track map of participant
      .filter((track) => track !== null) // removing the null tracks
  }

  useEffect(() => {

    const trackSubscribed = (track) => {
      console.log({track});
      if (track.type === 'video') {
        setVideoTracks((videotracks) => [...videotracks, track]);
      } else {
        setAudioTracks((audiotracks) => [...audiotracks, track]);
      }
    }

    const trackUnsubscribed = (track) => {
      console.log({track});
      if (track.type === 'video') {
        setVideoTracks(videoTracks => videoTracks.filter(videotrack => videotrack !== track));
      } else {
        setAudioTracks(audioTracks => audioTracks.filter(audiotrack => audiotrack !== track));
      }
    }

    // add the existing audio and video tracks from the trackMap of the participant object to the state
    setAudioTracks(convertTrackPublicationToTrack(participant.audioTracks));
    setVideoTracks(convertTrackPublicationToTrack(participant.videoTracks));

    participant.on('trackSubscribed', trackSubscribed);
    participant.on('trackUnsubscribed', trackUnsubscribed);
  
    // cleanup function
    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    }
  }, [participant])
  


  // To attach the video tracks to the <video/> element
  useEffect(() => {
    // get the first video track from the videoTracks in state and, if it exists, attach it to the <video/> DOM node captured with a ref 
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);

      // cleanup function to detach the video tracks
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);


  // To attach the audio tracks to the <audio/> element
  useEffect(() => {
    // get the first audio track from the audioTracks in state and, if it exists, attach it to the <audio/> DOM node captured with a ref 
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);

      // cleanup function to detach the video tracks
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);



  return (
    <div className="participant">
      <h3>{participant.identity}</h3>
      <video ref={videoRef} autoPlay={true} />
      <audio ref={audioRef} autoPlay={true} muted={true}/>
    </div>
  );
}

export default Participant