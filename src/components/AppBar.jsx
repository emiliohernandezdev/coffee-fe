import { useState, useEffect } from "react";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import settigsIconLottie from "../JSON/setting.json";
import { Link, useNavigate } from "react-router-dom";
import { MaterialUISwitch } from "./CustomComponents";
import { useTheme } from "@mui/material/styles";
import Lottie from 'lottie-react';


function Appbar({ darkMode, handleThemeChange }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  // Aquí manejamos el tema de manera controlada
  const theme = useTheme();
  const [localDarkMode, setLocalDarkMode] = useState(darkMode || false); // Aseguramos que darkMode tenga un valor definido

  useEffect(() => {
    setLocalDarkMode(darkMode); // Sincronizamos el estado cuando el valor de darkMode cambie desde el componente padre
  }, [darkMode]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navItems = [
    { label: "Inicio", path: "/" },
    { label: "Menú", path: "/menu" },
    { label: "Acerca de", path: "/about" },
    { label: "Nuestro Proyecto", path: "/project" },
    { label: "Contactanos", path: "/contact" }
  ];

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleSwitchChange = () => {
    setLocalDarkMode((prevMode) => !prevMode); // Actualizamos el valor de darkMode
    handleThemeChange(); // Llamamos al cambio de tema
  };

  const [isHovered, setIsHovered] = useState(false); // Estado para el hover

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
          <ListItemButton>
            {/* <MaterialUISwitch checked={localDarkMode} onChange={handleSwitchChange} /> */}
            <ListItemText primary="Modo Oscuro" />
          </ListItemButton>
        </ListItem>
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
            <IconButton
              color="inherit"
              onClick={handleDialogOpen}
              onMouseEnter={() => setIsHovered(true)}//Button hover y dialogo "SettingsIconLottie"
              onMouseLeave={() => setIsHovered(false)} // Manejar el hover
            >
              <Lottie animationData={settigsIconLottie} loop={isHovered} /> {/* Usar el estado de hover */}
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
          {/* <MaterialUISwitch checked={localDarkMode} onChange={handleSwitchChange} /> */}
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