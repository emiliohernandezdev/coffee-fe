import { useState } from "react";
import { Button, TextField, Typography, Box, useTheme, Paper, useMediaQuery, Snackbar, Link } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Loader from "../components/Loader";
import MuiAlert from "@mui/material/Alert";
import { Coffee, Google } from "@mui/icons-material";

const LoginPage = () => {
    const theme = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Usuario autenticado:", userCredential.user);

            setSnackbarMessage("¡Inicio de sesión exitoso!");
            setSnackbarSeverity("success");
            setOpenSnackbar(true);
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            setSnackbarMessage("Error al iniciar sesión");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            console.log("Usuario autenticado con Google:", result.user);

            setSnackbarMessage("¡Inicio de sesión con Google exitoso!");
            setSnackbarSeverity("success");
            setOpenSnackbar(true);
        } catch (error) {
            console.error("Error con Google Sign-In:", error);
            setSnackbarMessage("Error al iniciar sesión con Google");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: "url('https://wallpapers.com/images/featured/coffee-bean-wmhqt5jyr77cxa4v.jpg')",
            }}
        >
            <Paper
                elevation={8}
                className="rounded-xl shadow-xl p-8 md:p-12 max-w-md w-full"
                sx={{
                    backgroundColor: theme.palette.mode === "dark" ? "#3C2F2A" : "#F1E5D1", // Fondo más cálido en modo oscuro
                    color: theme.palette.mode === "dark" ? "#FFF" : "#3E3E3E", // Texto claro en modo oscuro
                    borderRadius: "8px",
                    boxShadow:
                        theme.palette.mode === "dark"
                            ? "0px 8px 20px rgba(0, 0, 0, 0.5), 0px 4px 4px rgba(0, 0, 0, 0.2)"
                            : "0px 8px 20px rgba(0, 0, 0, 0.2), 0px 4px 4px rgba(0, 0, 0, 0.1)",
                    padding: isSmallScreen ? "16px" : "32px",
                    margin: isSmallScreen ? "16px" : "0",
                    transition: "box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out",
                    "&:hover": {
                        boxShadow:
                            theme.palette.mode === "dark"
                                ? "0px 12px 30px rgba(0, 0, 0, 0.7), 0px 6px 6px rgba(0, 0, 0, 0.3)"
                                : "0px 12px 30px rgba(0, 0, 0, 0.3), 0px 6px 6px rgba(0, 0, 0, 0.15)",
                        transform: "scale(1.02)",
                    },
                }}
            >
                <Box className="flex justify-center mb-6">
                    <Coffee />
                </Box>

                <Typography variant="h4" align="center" fontWeight="bold" mb={2}>
                    ¡Bienvenido a Coffee Shop!
                </Typography>

                <Typography variant="body1" align="center" mb={3}>
                    Disfruta del mejor café mientras gestionas tu cuenta.
                </Typography>

                <form onSubmit={handleLogin} className="space-y-4">
                    <TextField
                        label="Correo Electrónico"
                        type="email"
                        variant="outlined"
                        fullWidth
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{
                            backgroundColor: theme.palette.mode === "dark" ? "#5E4B3C" : "#E2D8B3", // Fondo de entrada marrón oscuro en modo oscuro
                            borderRadius: "8px",
                            color: theme.palette.mode === "dark" ? "#FFF" : "#3E3E3E", // Texto claro en modo oscuro
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
                        sx={{
                            backgroundColor: theme.palette.mode === "dark" ? "#5E4B3C" : "#E2D8B3", // Fondo de entrada marrón oscuro en modo oscuro
                            borderRadius: "8px",
                            color: theme.palette.mode === "dark" ? "#FFF" : "#3E3E3E", // Texto claro en modo oscuro
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

                <Box mt={3} display="flex" justifyContent="space-between" textAlign="center">
                    <Link href="/recover" variant="body2" sx={{ textDecoration: "none", color: theme.palette.text.primary }}>
                        ¿Se te olvidó tu contraseña?
                    </Link>
                    <Link href="/signup" variant="body2" sx={{ textDecoration: "none", color: theme.palette.text.primary }}>
                        Crear cuenta
                    </Link>
                </Box>
            </Paper>

            {loading && <Loader />}

            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <MuiAlert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </div>
    );
};

export default LoginPage;
