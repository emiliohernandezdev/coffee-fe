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
  Fade
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Coffee } from "@mui/icons-material";
import Loader from "../components/Loader";

const ForgotPasswordPage = () => {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulación de servicio
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSnackbarMessage("Te hemos enviado un enlace para restablecer tu contraseña");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage("Error al enviar el correo de restablecimiento");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
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
              Recupera tu acceso
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: theme.palette.text.secondary,
                mb: 3
              }}
            >
              Ingresa tu correo y te enviaremos instrucciones para restablecer tu contraseña
            </Typography>
          </Box>

          <form onSubmit={handlePasswordReset}>
            <TextField
              fullWidth
              label="Correo Electrónico"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 3 }}
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

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
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
              {loading ? "Enviando..." : "Enviar instrucciones"}
            </Button>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Link 
                href="/login" 
                variant="body2" 
                sx={{ 
                  textDecoration: "none",
                  color: theme.palette.primary.main,
                  '&:hover': {
                    textDecoration: "underline",
                  }
                }}
              >
                Volver al inicio de sesión
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

      {loading && <Loader />}
    </Box>
  );
};

export default ForgotPasswordPage;