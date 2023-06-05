import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#495a6b',
      paper: grey[900],
    },
    error: {
      main: '#f44336',
    },
  },
  typography: {
    fontFamily: '"Montserrat", sans-serif',
  },
});
root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
