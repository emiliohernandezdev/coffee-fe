import { useContext, useState } from "react";
import { Button, TextField, Typography, Box, useTheme, Paper, useMediaQuery, Snackbar, Link, InputAdornment, IconButton, Divider } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Coffee, Google } from "@mui/icons-material";
import { AuthService } from '../services/AuthService';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
    const theme = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useContext(AuthContext);

    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthService.login(email, password);
            if (response.success) {
                setSnackbarMessage("¡Inicio de sesión exitoso!");
                setSnackbarSeverity("success");
                setOpenSnackbar(true);
                login(response.token);
            } else {
                setSnackbarMessage(response.message);
                setSnackbarSeverity("error");
                setOpenSnackbar(true);
            }
        } catch (error) {
            setSnackbarMessage("Error al iniciar sesión");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: "url('https://wallpapers.com/images/featured/coffee-bean-wmhqt5jyr77cxa4v.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Contenedor principal */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: isSmallScreen ? "90%" : "800px",
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: "12px",
                    boxShadow: theme.shadows[10],
                    overflow: "hidden",
                }}
            >
                {/* Imagen a la izquierda (solo en pantallas grandes) */}
                {!isSmallScreen && (
                    <Box
                        sx={{
                            flex: 1,
                            backgroundImage: "url('https://images.unsplash.com/photo-1498804103079-a6351b050096?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: "500px",
                        }}
                    />
                )}

                {/* Formulario de login */}
                <Paper
                    elevation={0}
                    sx={{
                        flex: 1,
                        padding: isSmallScreen ? "24px" : "32px",
                        backgroundColor: theme.palette.background.paper,
                    }}
                >
                    <Box sx={{ textAlign: "center", mb: 4 }}>
                        <Coffee sx={{ fontSize: 48, color: theme.palette.primary.main }} />
                        <Typography variant="h4" sx={{ fontWeight: 700, mt: 2 }}>
                            ¡Bienvenido!
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                            Inicia sesión para continuar
                        </Typography>
                    </Box>

                    <form onSubmit={handleLogin}>
                        <TextField
                            label="Correo Electrónico"
                            type="email"
                            variant="outlined"
                            fullWidth
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ mb: 3 }}
                            InputProps={{
                                sx: {
                                    borderRadius: "8px",
                                },
                            }}
                        />

                        <TextField
                            label="Contraseña"
                            type={showPassword ? "text" : "password"}
                            variant="outlined"
                            fullWidth
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ mb: 3 }}
                            InputProps={{
                                sx: {
                                    borderRadius: "8px",
                                },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleTogglePassword}
                                            edge="end"
                                            aria-label="toggle password visibility"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                padding: "12px",
                                borderRadius: "8px",
                                fontSize: "1rem",
                                fontWeight: "bold",
                                textTransform: "none",
                                ":hover": {
                                    backgroundColor: theme.palette.primary.dark,
                                },
                            }}
                        >
                            Iniciar Sesión
                        </Button>
                    </form>

                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                        <Link href="/recover" variant="body2" sx={{ textDecoration: "none", color: theme.palette.text.primary }}>
                            ¿Olvidaste tu contraseña?
                        </Link>
                        <Link href="/signup" variant="body2" sx={{ textDecoration: "none", color: theme.palette.text.primary }}>
                            Crear cuenta
                        </Link>
                    </Box>
                </Paper>
            </Box>

            {/* Snackbar para mensajes */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <MuiAlert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </Box>
    );
};

export default LoginPage;