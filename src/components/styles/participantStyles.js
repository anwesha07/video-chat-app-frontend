const participantStyles = {
  participant: {
    position: 'relative',
    maxHeight: '100%',
    borderRadius: '10px',
    overflow: 'hidden',
    minWidth: '33%',
    aspectRatio: '4/3',
  },
  remoteParticipant: {
    margin: '0px 8px',
  },
  participantName: {
    fontWeight: 'bold',
    position: 'absolute',
    backgroundColor: 'primary.main',
    borderRadius: '20px',
    padding: '4px 12px',
    left: '10px',
    top: '10px',
    color: 'white',
  },
  participantVideo: {
    height: '100%',
    width: '100%',
    maxWidth: '640px',
    aspectRatio: '4/3',
  },
  meetingControls: {
    position: 'absolute',
    bottom: '0',
    left: '50%',
    transform: 'translate(-50%)',
  },
};
export default participantStyles;
