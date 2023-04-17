import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      paper: '#fafbfc'
    },
    primary: {
      main: '#CB3C2E',
      light: '#000000'
    },
    secondary: {
      main: '#89939a'
    }
  },
  typography: {
    fontFamily: 'Open Sans',
    h5: {
      fontFamily: 'Open Sans',
      fontWeight: 700,
      fontSize: '38px',
      lineHeight: '57px',
    },
    h6: {
      fontFamily: 'Open Sans',
      fontWeight: 400,
      fontSize: '36px',
      lineHeight: '54px',
    },
    subtitle1: {
      fontFamily: 'Open Sans',
      fontWeight: 400,
      fontSize: '32px',
      lineHeight: '48px',
    },
    subtitle2: {
      fontFamily: 'Open Sans',
      fontWeight: 400,
      fontSize: '24px',
      lineHeight: '36px',
    },
    body1: {
      fontFamily: 'Open Sans',
      fontWeight: 400,
      fontSize: '24px',
      lineHeight: '16px',
    },
    body2: {
      fontFamily: 'Open Sans',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '24px',
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: '80%',
        },
      },
    },
  },
});