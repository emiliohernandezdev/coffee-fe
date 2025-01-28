import React, { useState } from "react";
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
} from "@mui/material";
import { MaterialUISwitch } from "./CustomComponents";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";

function Appbar({ darkMode, handleThemeChange }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Opciones de navegación
  const navItems = [
    { label: "Inicio", path: "/" },
    { label: "Productos", path: "/products" },
    { label: "Login", path: "/login" },
  ];

  // Drawer (menú móvil)
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
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" color="primary" className="shadow-lg">
        <Toolbar>
          {/* Ícono de menú para móviles */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { sm: "none" }, mr: 2 }} // Solo visible en pantallas pequeñas
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          {/* Título */}
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Coffee Shop
          </Typography>

          {/* Navegación para pantallas grandes */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
            {navItems.map((item) => (
              <Button key={item.label} color="inherit" component={Link} to={item.path}>
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Interruptor de tema */}
          <MaterialUISwitch
            checked={darkMode !== null ? darkMode : false}
            onChange={handleThemeChange}
            color="default"
            size="medium"
            inputProps={{ "aria-label": "theme switch" }}
          />
        </Toolbar>
      </AppBar>

      {/* Drawer para navegación en pantallas pequeñas */}
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
