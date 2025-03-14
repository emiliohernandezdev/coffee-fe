import { useState } from "react";
import { Button, TextField, Typography, Box, useTheme, Paper, useMediaQuery, Snackbar, Link, Divider } from "@mui/material";
import Loader from "../components/Loader";
import MuiAlert from "@mui/material/Alert";
import { Coffee, Google } from "@mui/icons-material";

const SignUpPage = () => {
    const theme = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setSnackbarMessage("Las contraseñas no coinciden");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
            return;
        }
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("Usuario registrado:", userCredential.user);

            setSnackbarMessage("¡Registro exitoso!");
            setSnackbarSeverity("success");
            setOpenSnackbar(true);
        } catch (error) {
            console.error("Error al registrar:", error);
            setSnackbarMessage("Error al registrar");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
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

                {/* Formulario de registro */}
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
                            ¡Regístrate!
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                            Crea tu cuenta para disfrutar del mejor café.
                        </Typography>
                    </Box>

                    <form onSubmit={handleSignUp}>
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
                            type="password"
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
                            }}
                        />

                        <TextField
                            label="Confirmar Contraseña"
                            type="password"
                            variant="outlined"
                            fullWidth
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            sx={{ mb: 3 }}
                            InputProps={{
                                sx: {
                                    borderRadius: "8px",
                                },
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
                            Crear Cuenta
                        </Button>
                    </form>

                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                        <Link href="/login" variant="body2" sx={{ textDecoration: "none", color: theme.palette.text.primary }}>
                            ¿Ya tienes cuenta? Inicia sesión
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

            {/* Loader */}
            {loading && <Loader />}
        </Box>
    );
};

export default SignUpPage;