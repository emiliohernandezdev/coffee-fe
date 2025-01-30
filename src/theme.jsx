import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6A4E23',
      contrastText: '#fff',
    },
    secondary: {
      main: '#9C7E3B',
    },
    background: {
      default: '#F8F3E3',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#3E2C1C',
      secondary: '#6A4E23',
    },
    action: {
      hover: '#B98E4C',
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: '#6A4E23',
            color: '#FFF',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '10px',
            textTransform: 'none',
            backgroundColor: '#6A4E23',
            color: '#FFF',
            '&:hover': {
              backgroundColor: '#B98E4C',
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: '#F9F4E6',
            '& fieldset': {
              borderColor: '#9C7E3B',
            },
            '&:hover fieldset': {
              borderColor: '#B98E4C',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#B98E4C',
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
            backgroundColor: '#F8F3E3',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
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
