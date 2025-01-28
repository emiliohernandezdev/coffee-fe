import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6f4f1e', // Un café cálido, evoca la madera.
    },
    background: {
      default: '#e3d1b3', // Un beige cálido que recuerda a la madera clara.
      paper: '#fff', // Blanco para las tarjetas y elementos que necesitan destacarse.
    },
    text: {
      primary: '#3e2723', // Un tono oscuro de café para el texto principal.
      secondary: '#6f4f1e', // Un café medio que se complementa con el color principal.
    },
    sections: {
      background: '#d8c6a5', // Un tono suave de madera más clara para las secciones.
      text: '#3e2723', // Texto oscuro para buena legibilidad.
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#8B5E3C', // Color madera cálido para las tarjetas.
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: '#6f4f1e', // Borde café cálido.
          },
          '&:hover fieldset': {
            borderColor: '#3e2723', // Más oscuro cuando el input es enfocado.
          },
          '&.Mui-focused fieldset': {
            borderColor: '#3e2723', // Borde más oscuro al enfocarse.
          },
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3e2723', // Un café oscuro para el tema principal.
    },
    background: {
      default: '#2c1a1a', // Un tono oscuro que recuerda a la madera de café.
      paper: '#3e2723', // Fondo oscuro para las tarjetas, coherente con el tema.
    },
    text: {
      primary: '#e0e0e0', // Texto claro para asegurar legibilidad sobre el fondo oscuro.
      secondary: '#a1887f', // Un tono suave y cálido, relacionado con la madera.
    },
    sections: {
      background: '#3e2723', // Fondo cálido y oscuro para las secciones.
      text: '#e0e0e0', // Texto claro para contraste.
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#5B3D28', // Madera oscura para las tarjetas.
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: '#e0e0e0', // Borde claro para los inputs.
          },
          '&:hover fieldset': {
            borderColor: '#D4A373', // Un toque cálido de dorado suave al pasar el mouse.
          },
          '&.Mui-focused fieldset': {
            borderColor: '#D4A373', // Borde dorado al enfocarse.
          },
        },
      },
    },
  },
});
