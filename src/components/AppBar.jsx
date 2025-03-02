import { useState, useEffect, useContext } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { MaterialUISwitch } from "./CustomComponents";
import { useTheme } from "@mui/material/styles";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext"; // Importa el CartContext

function Appbar({ darkMode, handleThemeChange }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext); // Usa el CartContext

  const theme = useTheme();
  const [localDarkMode, setLocalDarkMode] = useState(darkMode || false);

  useEffect(() => {
    setLocalDarkMode(darkMode);
  }, [darkMode]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleSwitchChange = () => {
    setLocalDarkMode((prevMode) => !prevMode);
    handleThemeChange();
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/");
  };

  const handleCartClick = () => {
    navigate("/cart"); // Redirige a la página del carrito
  };

  const navItems = [
    { label: "Inicio", path: "/" },
    { label: "Menú", path: "/menu" },
    { label: "Contactanos", path: "/contact" },
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
        <ListItem disablePadding>
          {isAuthenticated ? (
            <Button color="inherit" onClick={handleLogoutClick} fullWidth>
              Cerrar sesión
            </Button>
          ) : (
            <Button color="inherit" onClick={handleLoginClick} fullWidth>
              Iniciar sesión
            </Button>
          )}
        </ListItem>
        <ListItem disablePadding>
          <IconButton color="inherit" onClick={handleDialogOpen}>
            <SettingsIcon />
          </IconButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" color="primary" className="shadow-lg">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { sm: "none" }, mr: 2 }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              cursor: "pointer",
              fontFamily: "'Lobster', cursive",
              letterSpacing: 1,
            }}
            onClick={() => navigate("/")}
          >
            Coffee Shop
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                color="inherit"
                component={Link}
                to={item.path}
              >
                {item.label}
              </Button>
            ))}

            {/* Ícono del carrito con badge */}
            <IconButton color="inherit" onClick={handleCartClick}>
              <Badge badgeContent={cart.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {isAuthenticated ? (
              <Button color="inherit" onClick={handleLogoutClick}>
                Cerrar sesión
              </Button>
            ) : (
              <Button color="inherit" onClick={handleLoginClick}>
                Iniciar sesión
              </Button>
            )}

            <IconButton color="inherit" onClick={handleDialogOpen}>
              <SettingsIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>

      {/* Diálogo para cambiar el tema */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Configuración</DialogTitle>
        <DialogContent>
          <MaterialUISwitch checked={localDarkMode} onChange={handleSwitchChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Appbar;