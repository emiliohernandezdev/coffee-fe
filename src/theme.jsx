import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#8B7355', // Brown
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#6B8E23', // Olive green
    },
    background: {
      default: '#F5F5DC', // Beige
      paper: '#FFFFFF',
    },
    text: {
      primary: '#4A4A4A', // Dark gray
      secondary: '#8B7355', // Brown
    },
    action: {
      hover: '#A2B964', // Light olive green
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: '#8B7355', // Brown
            color: '#FFFFFF',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '10px',
            textTransform: 'none',
            backgroundColor: '#8B7355', // Brown
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#A2B964', // Light olive green
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: '#FFFFFF',
            '& fieldset': {
              borderColor: '#6B8E23', // Olive green
            },
            '&:hover fieldset': {
              borderColor: '#A2B964', // Light olive green
            },
            '&.Mui-focused fieldset': {
              borderColor: '#A2B964', // Light olive green
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
            backgroundColor: '#F5F5DC', // Beige
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
      main: '#A2B964', // Light olive green
    },
    secondary: {
      main: '#8B7355', // Brown
    },
    background: {
      default: '#1E1E1E', // Darker gray
      paper: '#2E2E2E', // Dark gray
    },
    text: {
      primary: '#F5F5DC', // Beige
      secondary: '#A2B964', // Light olive green
    },
    action: {
      hover: '#6B8E23', // Olive green
    },
    error: {
      main: '#FF6F61', // Coral for errors
    },
    warning: {
      main: '#FFD166', // Pastel yellow for warnings
    },
    info: {
      main: '#6B5B95', // Ube for info
    },
    success: {
      main: '#4CAF50', // Green for success
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: '#2E2E2E', // Dark gray
            color: '#F5F5DC', // Beige
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '10px',
            textTransform: 'none',
            backgroundColor: '#A2B964', // Light olive green
            color: '#1E1E1E', // Darker gray
            '&:hover': {
              backgroundColor: '#6B8E23', // Olive green
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: '#2E2E2E', // Dark gray
            color: '#F5F5DC', // Beige
            '& fieldset': {
              borderColor: '#A2B964', // Light olive green
            },
            '&:hover fieldset': {
              borderColor: '#6B8E23', // Olive green
            },
            '&.Mui-focused fieldset': {
              borderColor: '#6B8E23', // Olive green
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: '#2E2E2E', // Dark gray
            color: '#F5F5DC', // Beige
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            borderRadius: '12px',
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: '#2E2E2E', // Dark gray
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            backgroundColor: '#2E2E2E', // Dark gray
            color: '#F5F5DC', // Beige
            border: '1px solid #A2B964', // Light olive green
          },
          standardError: {
            backgroundColor: '#2E2E2E', // Dark gray
            color: '#FF6F61', // Coral
            borderColor: '#FF6F61', // Coral
          },
          standardWarning: {
            backgroundColor: '#2E2E2E', // Dark gray
            color: '#FFD166', // Pastel yellow
            borderColor: '#FFD166', // Pastel yellow
          },
          standardInfo: {
            backgroundColor: '#2E2E2E', // Dark gray
            color: '#6B5B95', // Ube
            borderColor: '#6B5B95', // Ube
          },
          standardSuccess: {
            backgroundColor: '#2E2E2E', // Dark gray
            color: '#4CAF50', // Green
            borderColor: '#4CAF50', // Green
          },
        },
      },
    },
  },
});