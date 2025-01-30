import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Importamos el contexto de autenticación
import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";

function Appbar({ darkMode, handleThemeChange }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { currentUser } = useAuth(); // Usamos el estado de autenticación
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  };

  // Los elementos de navegación del Drawer
  const navItems = [
    { label: "Inicio", path: "/" },
    { label: "Productos", path: "/products" },
    // Si el usuario está autenticado, no es necesario mostrar la opción "Login" en el Drawer
    ...(!currentUser ? [{ label: "Login", path: "/login" }] : []),
  ];

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        {/* Si el usuario está autenticado, agregar un link a "Mi cuenta" */}
        {currentUser && (
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Mi cuenta" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" color="primary" className="shadow-lg">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { sm: "none" }, mr: 2 }} // Solo visible en pantallas pequeñas
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Coffee Shop
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
            {currentUser ? (
              <>
                <IconButton onClick={handleMenuOpen}>
                  <Avatar src={currentUser.photoURL} />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to="/login"
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Mejora el rendimiento en pantallas móviles
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default Appbar;
