import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#5D4037', // Café oscuro (más contrastante)
      contrastText: '#FFFFFF', // Blanco para texto sobre fondos oscuros
    },
    secondary: {
      main: '#8D6E63', // Café más claro
    },
    background: {
      default: '#FFF8E1', // Beige claro (fondo suave)
      paper: '#FFFFFF', // Blanco para tarjetas y contenedores
    },
    text: {
      primary: '#3E2723', // Café muy oscuro para texto principal
      secondary: '#5D4037', // Café oscuro para texto secundario
    },
    action: {
      hover: '#A1887F', // Café medio para hovers
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      color: '#3E2723', // Café muy oscuro
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      color: '#3E2723',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      color: '#3E2723',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#3E2723',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#3E2723',
    },
    h6: {
      fontSize: '1.2em',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#3E2723', // Texto principal oscuro
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#5D4037', // Texto secundario un poco más claro
    },
    button: {
      textTransform: 'none',
      fontSize: '1rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '16px',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          marginBottom: '8px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          padding: '8px 16px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#5D4037', // Café oscuro
          color: '#FFFFFF', // Texto blanco
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF', // Fondo blanco para tarjetas
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
          padding: '16px',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FFF8E1', // Beige claro para diálogos
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#A1887F', // Café claro para modo oscuro
      contrastText: '#FFFFFF', // Texto blanco
    },
    secondary: {
      main: '#8D6E63', // Café medio
    },
    background: {
      default: '#212121', // Gris oscuro para fondo
      paper: '#424242', // Gris más claro para tarjetas
    },
    text: {
      primary: '#FFFFFF', // Texto blanco
      secondary: '#BCAAA4', // Café claro para texto secundario
    },
    action: {
      hover: '#6D4C41', // Café oscuro para hovers
    },
    error: {
      main: '#FF6F61', // Coral para errores
    },
    warning: {
      main: '#FFD166', // Amarillo pastel para advertencias
    },
    info: {
      main: '#6B5B95', // Ube para información
    },
    success: {
      main: '#4CAF50', // Verde para éxito
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      color: '#FFFFFF', // Texto blanco
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      color: '#FFFFFF',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      color: '#FFFFFF',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#FFFFFF',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#FFFFFF',
    },
    h6: {
      fontSize: '1.2rem',
      fontWeight: 500,
      color: '#FFFFFF',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#FFFFFF', // Texto blanco
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#BCAAA4', // Café claro para texto secundario
    },
    button: {
      textTransform: 'none',
      fontSize: '1rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '16px',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          marginBottom: '8px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          padding: '8px 16px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#424242', // Gris oscuro
          color: '#FFFFFF', // Texto blanco
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#424242', // Gris oscuro para tarjetas
          color: '#FFFFFF', // Texto blanco
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          borderRadius: '12px',
          padding: '16px',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#424242', // Gris oscuro para diálogos
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        },
      },
    },
  },
});