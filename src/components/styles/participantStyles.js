const participantStyles = {
  participant: {
    position: 'relative',
    maxHeight: '100%',
    borderRadius: '4px',
    overflow: 'hidden',
    minWidth: '33%',
    aspectRatio: '4/3',
  },
  remoteParticipant: {
    margin: '0px 8px',
  },
  participantName: {
    fontSize: '0.75rem',
    position: 'absolute',
    backgroundColor: 'primary.dark',
    borderRadius: '16px',
    padding: '4px 8px',
    left: '10px',
    top: '10px',
    color: 'white',
    textTransform: 'capitalize',
    display: 'flex',
    alignItems: 'center',
  },
  participantVideoContainer: {
    maxHeight: '100%',
    maxWidth: '100%',
    width: 'auto',
    aspectRatio: '4/3',
    position: 'relative',
    margin: '0 auto',
    borderRadius: '4px',
    backgroundColor: 'black',
  },
  remoteParticipantMutedIcon: {
    fontSize: '1rem',
    marginRight: '0.25em',
  },
  participantVideo: {
    maxHeight: '100%',
    maxWidth: '100%',
    width: 'auto',
    aspectRatio: '4/3',
    borderRadius: '4px',
    boxShadow: '0px 3px 17px -3px rgb(0 0 0 / 36%)',
  },
  meetingControlContainer: {
    position: 'absolute',
    bottom: '1em',
    left: '50%',
    transform: 'translate(-50%)',
  },
  meetingControls: {
    borderRadius: '50%',
    height: '45px',
    width: '45px',
  },
  meetingControlIcons: {
    fontSize: '1.6rem',
  },
};
export default participantStyles;
