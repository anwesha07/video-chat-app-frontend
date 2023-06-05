import { grey } from '@mui/material/colors';

const chattingStyles = {
  chatContainer: {
    height: '100%',
    padding: '1em 1.5em',
    background: 'white',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
  },
  chatTitle: {
    color: 'black',
    fontSize: '1.25rem',
    letterSpacing: '-0.033rem',
    marginBlock: '0.75em',
  },
  chatInfo: {
    background: grey[300],
    padding: '1em',
    marginBottom: '1.25em',
    color: 'black',
    textAlign: 'center',
    borderRadius: '8px',
    width: '100%',
  },
  chatDisplaysection: {
    height: '100%',
    overflowY: 'auto',
    marginBottom: '1em',
  },
  messagingSection: {
    height: '3em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  messageInputBox: {
    height: '100%',
    width: '100%',
    padding: '1em',
    borderRadius: '25px',
    backgroundColor: grey[300],
    color: '#000',
    fontSize: '0.875rem',
  },
  messageSendButton: {
    height: '100%',
    position: 'absolute',
    right: '12px',
    padding: '0',
    top: '0',
    zIndex: 1,
    cursor: 'pointer',
    color: (theme) => theme.palette.primary.dark,
    '&:disabled': {
      color: grey[500],
    },
  },
  messageBlockStyle: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '0.65em',
  },
  senderName: {
    color: 'black',
    fontSize: '0.75rem',
    fontWeight: '600',
    marginRight: '0.5em',
  },
  sendTime: {
    color: 'grey',
    fontSize: '0.625rem',
    fontWeight: '600',
  },
  messageCard: {
    color: 'black',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    fontSize: '0.75rem',
  },
};

export default chattingStyles;
