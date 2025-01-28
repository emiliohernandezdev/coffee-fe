import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6f4f1e', // Café
    },
    background: {
      default: '#f4e1c1', // Fondo claro de café
      paper: '#fff', // Fondo de las tarjetas
    },
    text: {
      primary: '#3e2723', // Texto en marrón oscuro
      secondary: '#6f4f1e', // Texto en marrón
    },
    // Definir colores específicos para las secciones importantes
    sections: {
      background: '#fff3e0', // Fondo claro pero distinto para secciones especiales
      text: '#3e2723', // Texto en marrón oscuro para visibilidad
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3e2723', // Café oscuro
    },
    background: {
      default: '#2c1a1a', // Fondo oscuro café negro
      paper: '#3e2723',
    },
    text: {
      primary: '#e0e0e0', // Texto claro
      secondary: '#b39ddb', // Texto secundario en gris claro
    },
    // Colores para secciones en modo oscuro
    sections: {
      background: '#3e2723', // Fondo oscuro en las secciones especiales
      text: '#e0e0e0', // Texto claro para secciones especiales
    },
  },
});
