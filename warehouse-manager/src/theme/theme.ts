import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    warehouse: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
  }
  interface PaletteOptions {
    warehouse: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2B4570',
      light: '#446899',
      dark: '#1B2C47',
    },
    secondary: {
      main: '#E8A87C',
      light: '#FFCBA4',
      dark: '#B58661',
    },
    warehouse: {
      main: '#41B3A3',
      light: '#63D7C6',
      dark: '#2D7D72',
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#2B4570',
        },
      },
    },
  },
});