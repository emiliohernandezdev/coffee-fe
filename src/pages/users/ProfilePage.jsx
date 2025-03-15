import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  useTheme,
  Box,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { Edit, Email, Phone, LocationOn, Cake } from "@mui/icons-material";
import { AuthService } from "../../services/AuthService";

const ProfilePage = () => {
  const theme = useTheme();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await AuthService.getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6" color="error">
          Error al cargar el perfil.
        </Typography>
      </Box>
    );
  }

  // Obtener iniciales del nombre y apellido
  const getInitials = (name) => {
    const names = name.split(" ");
    return names.map((n) => n[0]).join("");
  };

  return (
    <Box className="p-4 md:p-8">
      {/* Portada */}
      <Box
        className="h-48 md:h-64 bg-cover bg-center rounded-lg mb-8 relative"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
        }}
      >
        {/* Foto de Perfil */}
        <Avatar
          sx={{
            width: 100,
            height: 100,
            position: "absolute",
            bottom: "-50px",
            left: "50%",
            transform: "translateX(-50%)",
            border: `4px solid ${theme.palette.background.paper}`,
            backgroundColor: theme.palette.primary.main,
            fontSize: "2rem",
          }}
        >
          {getInitials(profile.user.name)} {/* Usar profile.user.name */}
        </Avatar>
      </Box>

      {/* Información del Perfil */}
      <Card className="shadow-lg mb-8" style={{ backgroundColor: theme.palette.background.paper }}>
        <CardContent>
          <Typography variant="h4" className="font-bold" style={{ color: theme.palette.text.primary }}>
            {profile.user.name} {/* Usar profile.user.name */}
          </Typography>
          <Typography variant="body1" className="mt-2" style={{ color: theme.palette.text.secondary }}>
            {profile.user.email} {/* Usar profile.user.email */}
          </Typography>
          <Box className="mt-4">
            <Button
              variant="outlined"
              startIcon={<Edit />}
              sx={{
                color: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
                "&:hover": { borderColor: theme.palette.primary.dark },
              }}
            >
              Editar Perfil
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Detalles adicionales */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card className="shadow-lg" style={{ backgroundColor: theme.palette.background.paper }}>
            <CardContent>
              <Typography variant="h6" className="font-bold mb-4" style={{ color: theme.palette.text.primary }}>
                Información Personal
              </Typography>
              <Divider className="mb-4" />
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Email style={{ color: theme.palette.primary.main }} />
                  </ListItemIcon>
                  <ListItemText primary="Correo Electrónico" secondary={profile.user.email} /> {/* Usar profile.user.email */}
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Phone style={{ color: theme.palette.primary.main }} />
                  </ListItemIcon>
                  <ListItemText primary="Teléfono" secondary={profile.user.phone || "No proporcionado"} /> {/* Usar profile.user.phone */}
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LocationOn style={{ color: theme.palette.primary.main }} />
                  </ListItemIcon>
                  <ListItemText primary="Dirección" secondary={profile.user.address || "No proporcionada"} /> {/* Usar profile.user.address */}
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Cake style={{ color: theme.palette.primary.main }} />
                  </ListItemIcon>
                  <ListItemText primary="Fecha de Nacimiento" secondary={profile.user.birthdate || "No proporcionada"} /> {/* Usar profile.user.birthdate */}
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className="shadow-lg" style={{ backgroundColor: theme.palette.background.paper }}>
            <CardContent>
              <Typography variant="h6" className="font-bold mb-4" style={{ color: theme.palette.text.primary }}>
                Actividad Reciente
              </Typography>
              <Divider className="mb-4" />
              <Typography variant="body1" style={{ color: theme.palette.text.secondary }}>
                No hay actividad reciente.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;