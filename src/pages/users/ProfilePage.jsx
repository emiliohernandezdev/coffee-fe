import React from "react";
import {
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  useTheme,
  Box,
} from "@mui/material";
import { Edit } from "@mui/icons-material";

const ProfilePage = () => {
  const theme = useTheme();

  return (
    <div className="p-8">
      {/* Portada */}
      <Box
        className="h-64 bg-cover bg-center rounded-lg mb-8 relative"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
        }}
      >
        {/* Foto de Perfil */}
        <Avatar
          src="https://via.placeholder.com/150"
          alt="Foto de Perfil"
          sx={{
            width: 100,
            height: 100,
            position: "absolute",
            bottom: "-50px",
            left: "50%",
            transform: "translateX(-50%)",
            border: `4px solid ${theme.palette.background.paper}`,
          }}
        />
      </Box>

      {/* Información del Perfil */}
      <Card className="shadow-lg" style={{ backgroundColor: theme.palette.background.paper }}>
        <CardContent className="text-center">
          <Typography variant="h4" className="font-bold mt-12" style={{ color: theme.palette.text.primary }}>
            Nombre del Usuario
          </Typography>
          <Typography variant="body1" className="mt-2" style={{ color: theme.palette.text.secondary }}>
            usuario@example.com
          </Typography>
          <Button
            variant="outlined"
            className="mt-4"
            startIcon={<Edit />}
            sx={{
              color: theme.palette.primary.main,
              borderColor: theme.palette.primary.main,
              "&:hover": { borderColor: theme.palette.primary.dark },
            }}
          >
            Editar Perfil
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;