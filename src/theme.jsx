import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6D4C41', // Café oscuro
      contrastText: '#FFFFFF', // Texto blanco
    },
    secondary: {
      main: '#D7CCC8', // Beige claro
    },
    background: {
      default: '#FFF8F0', // Fondo crema claro
      paper: '#FFFFFF',   // Superficies blancas
    },
    text: {
      primary: '#3E2723',  // Texto café oscuro
      secondary: '#5D4037', // Texto café medio
    },
    action: {
      active: '#5D4037',   // Color para elementos activos
      hover: '#D7CCC8',    // Color hover
    },
    divider: '#D7CCC8',    // Divisores beige
  },
  components: {
    // ESTILOS PARA INPUTS (LIGHT)
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(93, 64, 55, 0.5)', // Borde café semi-transparente
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme => theme.palette.primary.main, // Café oscuro al hover
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme => theme.palette.primary.main, // Café oscuro al focus
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: theme => theme.palette.text.secondary, // Café medio
          '&.Mui-focused': {
            color: theme => theme.palette.primary.main, // Café oscuro al focus
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: theme => theme.palette.text.secondary, // Café medio
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#D7CCC8', // Beige claro
      contrastText: '#3E2723', // Texto café oscuro
    },
    secondary: {
      main: '#8D6E63', // Café medio
    },
    background: {
      default: '#1A120B', // Fondo café muy oscuro
      paper: '#2A211C',   // Superficies café oscuro
    },
    text: {
      primary: '#EFEBE9',  // Texto beige claro
      secondary: '#D7CCC8', // Texto beige
    },
    action: {
      active: '#D7CCC8',   // Color para elementos activos
      hover: '#5D4037',    // Color hover
    },
    divider: '#5D4037',    // Divisores café
  },
  components: {
    // ESTILOS PARA INPUTS (DARK) - Igual estructura que light
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(215, 204, 200, 0.5)', // Borde beige semi-transparente
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme => theme.palette.primary.main, // Beige claro al hover
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme => theme.palette.primary.main, // Beige claro al focus
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: theme => theme.palette.text.secondary, // Beige
          '&.Mui-focused': {
            color: theme => theme.palette.primary.main, // Beige claro al focus
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: theme => theme.palette.text.secondary, // Beige
        },
      },
    },
  },
});