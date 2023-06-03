const styleClasses = {
  container: {
    // outline: '1px solid red',
    width: '100vw',
    height: '100vh',
    margin: '0',
    padding: '0',
  },
  itemLeft: {
    height: '100%',
    width: '100%',
  },
  itemRight: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formHeader: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '15px',
  },
  inputBox: {
    marginBottom: '10px',
    width: '70%',
  },
  errorMessage: {
    // outline: '2px solid white',
    width: '70%',
    marginBottom: '2px',
  },
  formFooter: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '6px',
  },
  submitButtonContainer: {
    width: '60%',
    margin: '10px',
  },
  submitButton: {
    width: '100%',
  },
  changePageLink: {
    '&:hover': {
      color: 'red',
    },
  },
};
export default styleClasses;
