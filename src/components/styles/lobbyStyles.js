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
    padding: '50px',
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
    width: '300px',
    // backgroundColor: (theme) => theme.palette.secondary.main,
    backgroundColor: 'secondary.main',
    '&:hover': {
      backgroundColor: 'secondary.dark',
    },
  },
  modalStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #6e6c6c',
    boxShadow: 24,
    p: 4,
    padding: '5px',
    borderRadius: '10px',
  },
  modalTitleStyle: {
    // outline: "2px solid red",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: "5px",
    padding: '5px',
  },
  modalContentStyle: {
    // outline: "2px solid green",
    display: 'flex',
    flexDirection: 'column',
    padding: '5px',
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
    width: '500px',
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
    backgroundColor: '#4f4f4f70',
    border: '1px solid #74717129',
    borderRadius: '0',
    '&:hover': {
      backgroundColor: '#3b3a3a87',
    },
  },
  activeCardButton: {
    backgroundColor: '#3b3a3ab0',
    '&:hover': {
      backgroundColor: '#3b3a3ab0',
    },
  },
};

export default lobbyStyles;
