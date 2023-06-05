import { grey } from '@mui/material/colors';

const styleClasses = {
  container: {
    width: '100vw',
    height: '100vh',
    margin: '0',
    padding: '0',
  },
  itemLeft: {
    height: '100%',
    width: '100%',
  },
  authForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: '8px',
    boxShadow: '0px 3px 17px -3px rgb(0 0 0 / 63%)',
    height: '90%',
    minHeight: '580px',
    marginBlock: 'auto',
    background: grey[900],
    padding: '2.5em',
    '@media screen and (max-width: 600px)': {
      padding: '1.5em',
      borderRadius: '0',
    },
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
    '@media screen and (max-width: 600px)': {
      fontSize: '0.1rem !important',
    },
  },
  errorMessage: {
    width: '100%',
    marginBottom: '2px',
  },
  formFooter: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '6px',
  },
  submitButtonContainer: {
    width: '100%',
    margin: '10px',
  },
  submitButton: {
    width: '100%',
    height: '48px',
    fontSize: '1rem',
    background: (theme) => theme.palette.primary.dark,
  },
  changePageLink: {
    '&:hover': {
      color: (theme) => theme.palette.primary.light,
    },
  },
  title: {
    textTransform: 'uppercase',
    fontFamily: '"Quicksand", sans-serif',
    fontSize: '4.5rem',
    '@media screen and (max-width: 600px)': {
      fontSize: '4rem',
    },
    fontWeight: 800,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: '60px',
    color: grey[500],
    fontWeight: '500',
  },
  logo: {
    display: 'block',
    height: '3.5rem',
    marginRight: '0.25em',
  },
};

export default styleClasses;
