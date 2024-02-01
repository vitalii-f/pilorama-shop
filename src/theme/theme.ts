import { ThemeOptions, createTheme } from '@mui/material/styles';

export const theme: ThemeOptions = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0072CE',
    },
    secondary: {
      main: '#FFFFFF',
    },
    background: {
      default: '#1F1F1F',
      paper: '#1F1F1F',
    },
    divider: '#0072CE',
    text: {
      secondary: '#C4C4C4',
    },
  },
});