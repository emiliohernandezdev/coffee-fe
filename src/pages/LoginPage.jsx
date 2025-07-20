import { useState } from "react";
import { 
  Button, 
  TextField, 
  Typography, 
  Box, 
  useTheme, 
  Paper, 
  useMediaQuery, 
  Snackbar, 
  Link, 
  InputAdornment, 
  IconButton,
  Fade
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Coffee } from "@mui/icons-material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup
    .string()
    .email("Correo electrónico inválido")
    .required("Campo requerido"),
  password: Yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("Campo requerido"),
});

const LoginPage = () => {
  const theme = useTheme();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [showPassword, setShowPassword] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      // Lógica de autenticación aquí
      setSnackbarMessage("Inicio de sesión exitoso");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage("Error al iniciar sesión");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1498804103079-a6351b050096?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: isSmallScreen ? "100%" : "70%",
          maxWidth: "800px",
          borderRadius: "16px",
          overflow: "hidden",
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          bgcolor: theme.palette.background.paper,
        }}
      >
        {!isSmallScreen && (
          <Box
            sx={{
              flex: 1,
              backgroundImage: "url('https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "500px",
            }}
          />
        )}

        <Box
          sx={{
            flex: 1,
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Coffee 
              sx={{ 
                fontSize: 48, 
                color: theme.palette.primary.main,
                mb: 1
              }} 
            />
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700, 
                color: theme.palette.text.primary,
                mb: 1
              }}
            >
              ¡Bienvenido de nuevo!
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: theme.palette.text.secondary,
                mb: 3
              }}
            >
              Inicia sesión para acceder a tu cuenta
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Correo Electrónico"
              variant="outlined"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ mb: 2 }}
              InputProps={{
                sx: {
                  borderRadius: "8px",
                  bgcolor: theme.palette.background.default,
                },
              }}
              InputLabelProps={{
                sx: {
                  color: theme.palette.text.secondary,
                },
              }}
            />

            <TextField
              fullWidth
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{ mb: 3 }}
              InputProps={{
                sx: {
                  borderRadius: "8px",
                  bgcolor: theme.palette.background.default,
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                sx: {
                  color: theme.palette.text.secondary,
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={isSubmitting}
              sx={{
                py: 1.5,
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: 600,
                textTransform: "none",
                bgcolor: theme.palette.primary.main,
                '&:hover': {
                  bgcolor: theme.palette.primary.dark,
                },
                mb: 2,
              }}
            >
              {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>

            <Box sx={{ 
              display: "flex", 
              justifyContent: "space-between",
              mt: 2
            }}>
              <Link 
                href="/recover" 
                variant="body2" 
                sx={{ 
                  textDecoration: "none",
                  color: theme.palette.primary.main,
                  '&:hover': {
                    textDecoration: "underline",
                  }
                }}
              >
                ¿Olvidaste tu contraseña?
              </Link>
              <Link 
                href="/signup" 
                variant="body2" 
                sx={{ 
                  textDecoration: "none",
                  color: theme.palette.primary.main,
                  '&:hover': {
                    textDecoration: "underline",
                  }
                }}
              >
                Crear cuenta
              </Link>
            </Box>
          </form>
        </Box>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={Fade}
      >
        <MuiAlert 
          elevation={6} 
          variant="filled" 
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default LoginPage;