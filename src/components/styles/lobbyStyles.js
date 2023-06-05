import { grey } from '@mui/material/colors';

const lobbyStyles = {
  container: {
    width: '100vw',
    height: '100vh',
  },
  navBar: {
    width: '100%',
  },
  contentContainer: {
    flexGrow: '1',
    display: 'flex',
    justifyContent: 'center',
    padding: '3em',
    '@media screen and (max-width: 600px)': {
      padding: '1em',
    },
    height: 'calc(100vh - 64px)',
  },
  content: {
    // outline: "2px solid red",
    height: '100%',
    // backgroundColor: '#e3f2fd',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginBottom: '2%',
    width: '12em',
  },
  formStyles: {
    width: '100%',
    margin: '20px',
  },
  fieldEntryStyles: {
    width: '80%',
    marginBottom: '20px',
    marginTop: '15px',
  },
  closeModalButtonStyle: {
    backgroundColor: '#6e6c6c',
    color: '#ffff',
    height: '30px',
    minWidth: '30px',
    borderRadius: '50%',
    margin: '0',
    padding: '0',
    fontSize: '1.5rem',
  },
  cardStyle: {
    width: '100%',
    maxWidth: '500px',
    height: '100%',
  },
  cardActions: {
    padding: '0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardButton: {
    color: 'white',
    flexGrow: '1',
    marginLeft: '0 !important',
    padding: '15px',
    fontSize: '1rem',
    backgroundColor: grey[800],
    border: '1px solid #74717129',
    borderRadius: '0',
    '&:hover': {
      backgroundColor: grey[700],
    },
  },
  activeCardButton: {
    backgroundColor: grey[900],
    '&:hover': {
      backgroundColor: grey[900],
    },
  },
  errorAlert: {
    margin: '20px',
  },
};

export default lobbyStyles;
