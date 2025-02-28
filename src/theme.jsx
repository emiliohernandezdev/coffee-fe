import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#8d7966', 
      contrastText: '#121012', 
    },
    secondary: {
      main: '#d8c8b8', 
    },
    background: {
      default: '#e2ddd9', 
      paper: '#FFFFFF', 
    },
    text: {
      primary: '#121012', 
      secondary: '#2e1f1c', 
    },
    action: {
      hover: '#b5a18e', 
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#8d7966', 
          color: '#121012', 
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          textTransform: 'none',
          backgroundColor: '#8d7966', 
          color: '#121012', 
          '&:hover': {
            backgroundColor: '#b5a18e', 
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#f5f0ed', 
          '& fieldset': {
            borderColor: '#d8c8b8', 
          },
          '&:hover fieldset': {
            borderColor: '#b5a18e', 
          },
          '&.Mui-focused fieldset': {
            borderColor: '#b5a18e', 
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '12px',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#e2ddd9', 
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
      main: '#4E2C19',
    },
    secondary: {
      main: '#9C7E3B',
    },
    background: {
      default: '#2C1B0D',
      paper: '#3E2C1C',
    },
    text: {
      primary: '#F4E1C1',
      secondary: '#9C7E3B',
    },
    action: {
      hover: '#E9A47B',
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: '#4E2C19',
            color: '#FFF',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '10px',
            textTransform: 'none',
            backgroundColor: '#4E2C19',
            color: '#FFF',
            '&:hover': {
              backgroundColor: '#E9A47B',
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: '#3B2C1D',
            '& fieldset': {
              borderColor: '#4E2C19',
            },
            '&:hover fieldset': {
              borderColor: '#E9A47B',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#E9A47B',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: '#3E2C1C',
            color: '#F4E1C1',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            borderRadius: '12px',
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: '#3B2C1D',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
  },
});
