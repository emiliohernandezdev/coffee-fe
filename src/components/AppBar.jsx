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
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import HistoryIcon from "@mui/icons-material/History";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { MaterialUISwitch } from "./CustomComponents";
import { useTheme } from "@mui/material/styles";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import MusicIcon from "@mui/icons-material/MusicNote";

function Appbar({ darkMode, handleThemeChange }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [spotifyConnected, setSpotifyConnected] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

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

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/");
    handleMenuClose();
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleSpotifyConnect = () => {
    const clientId = "71ee94f03f164016b9a3770d5375e3ef";
    const redirectUri = encodeURIComponent("http://localhost:5173/callback"); // Reemplaza con tu redirect URI
    const scopes = "streaming user-read-playback-state user-modify-playback-state";
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}`;
  
    window.location.href = authUrl;
  };

  const navItems = [
    { label: "Inicio", path: "/", icon: <HomeIcon /> },
    { label: "Menú", path: "/menu", icon: <RestaurantMenuIcon /> },
    { label: "Contactanos", path: "/contact", icon: <ContactMailIcon /> },
  ];

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          {isAuthenticated ? (
            <Button
              color="inherit"
              onClick={handleLogoutClick}
              fullWidth
              startIcon={<LogoutIcon />}
            >
              Cerrar sesión
            </Button>
          ) : (
            <Button
              color="inherit"
              onClick={handleLoginClick}
              fullWidth
              startIcon={<LoginIcon />}
            >
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
                startIcon={item.icon}
              >
                {item.label}
              </Button>
            ))}

            <IconButton color="inherit" onClick={handleCartClick}>
              <Badge badgeContent={cart.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {isAuthenticated ? (
              <>
                <Button
                  color="inherit"
                  onClick={handleMenuOpen}
                  startIcon={<AccountCircleIcon />}
                >
                  Mi cuenta
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    key="profile"
                    onClick={() => {
                      navigate("/profile");
                      handleMenuClose();
                    }}
                  >
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText>Mi perfil</ListItemText>
                  </MenuItem>
                  <MenuItem
                    key="history"
                    onClick={() => {
                      navigate("/order-history");
                      handleMenuClose();
                    }}
                  >
                    <ListItemIcon>
                      <HistoryIcon />
                    </ListItemIcon>
                    <ListItemText>Historial de pedidos</ListItemText>
                  </MenuItem>
                  <MenuItem
                    key="settings"
                    onClick={() => {
                      navigate("/settings");
                      handleMenuClose();
                    }}
                  >
                    <ListItemIcon>
                      <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText>Configuración</ListItemText>
                  </MenuItem>
                  <Divider key="divider" />
                  <MenuItem key="logout" onClick={handleLogoutClick}>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText>Cerrar sesión</ListItemText>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                color="inherit"
                onClick={handleLoginClick}
                startIcon={<LoginIcon />}
              >
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

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Configuración</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body1">Modo oscuro</Typography>
            <MaterialUISwitch checked={localDarkMode} onChange={handleSwitchChange} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
            <Typography variant="body1">Conectar con Spotify</Typography>
            <IconButton color="inherit" onClick={handleSpotifyConnect}>
              <MusicIcon />
            </IconButton>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reproductor flotante */}
      {spotifyConnected && (
        <Box
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            zIndex: 1000,
            backgroundColor: theme.palette.background.paper,
            borderRadius: 2,
            boxShadow: 3,
            p: 2,
          }}
        >
          <Typography variant="h6">Reproductor de Spotify</Typography>
          {/* Aquí iría el reproductor de Spotify */}
        </Box>
      )}
    </>
  );
}

export default Appbar;