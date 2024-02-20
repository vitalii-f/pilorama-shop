import { ThemeOptions, createTheme } from '@mui/material/styles';

export const lightTheme: ThemeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#333',
    },
    secondary: {
      main: '#333',
    },
    background: {
      default: '#333',
      paper: '#333',
    },
    divider: '#333',
    text: {
      secondary: '#333',
    },
  },
});
