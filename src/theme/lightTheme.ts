import { ThemeOptions, createTheme } from '@mui/material/styles';

export const lightTheme: ThemeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0072CE',
    },
    secondary: {
      main: '#333',
    },
    background: {
      default: '#e0e0e0',
      paper: '#e0e0e0',
    },
    divider: '#0072CE',
    text: {
      secondary: '#3b3b3b',
    },
  },
});
