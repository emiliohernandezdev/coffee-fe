import { createTheme } from '@mui/material/styles';

// Colores base que se transformarán para dark/light
const baseColors = {
  primary: '#6D4C41', // Café oscuro principal
  secondary: '#D7CCC8', // Beige claro
  error: '#D32F2F', // Rojo
  background: '#FFF8F0', // Crema muy clara
  textPrimary: '#3E2723', // Café casi negro
  textSecondary: '#5D4037', // Café oscuro
  paper: '#FFFFFF' // Blanco
};

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: baseColors.primary,
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: baseColors.secondary,
    },
    background: {
      default: baseColors.background,
      paper: baseColors.paper,
    },
    text: {
      primary: baseColors.textPrimary,
      secondary: baseColors.textSecondary,
    },
    error: {
      main: baseColors.error,
    },
    divider: '#E0E0E0', // Gris muy claro
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    allVariants: {
      color: baseColors.textPrimary, // Todos los textos usan este color por defecto
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px 16px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: baseColors.primary,
          color: '#FFFFFF',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: baseColors.paper,
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#D7CCC8', // El secondary light ahora es primary
      contrastText: baseColors.textPrimary,
    },
    secondary: {
      main: baseColors.primary, // El primary light ahora es secondary
    },
    background: {
      default: '#1A120B', // Café muy oscuro
      paper: '#2A211C', // Café oscuro
    },
    text: {
      primary: '#EFEBE9', // Beige claro
      secondary: '#D7CCC8', // Beige
    },
    error: {
      main: '#FF6E6E', // Rojo claro
    },
    divider: '#5D4037', // Café para dividers
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    allVariants: {
      color: '#EFEBE9', // Todos los textos claros en dark
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px 16px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#2A211C',
          color: '#D7CCC8',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#2A211C',
        },
      },
    },
  },
});