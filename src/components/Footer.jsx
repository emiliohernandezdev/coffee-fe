import React from 'react';
import { Container, Grid, Typography, Link, IconButton, Box } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
  const theme = useTheme();

  const footerBackgroundColor = theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.grey[200];
  const footerTextColor = theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.text.secondary;

  return (
    <footer style={{ backgroundColor: footerBackgroundColor, color: footerTextColor, padding: '2rem 0', marginTop: 'auto' }}>
      <Container>
        {/* Logo centrado arriba */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
              fontFamily: 'cursive', // Cambia la fuente si lo prefieres
            }}
          >
            Coffee Shop
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {/* Sección de enlaces rápidos */}
          <Grid item xs={12} sm={6} md={4} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Enlaces Rápidos
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="inherit" underline="hover">
                Tu Privacidad
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Política de Privacidad
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Términos de Uso
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Preguntas Frecuentes
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Mapa del Sitio
              </Link>
            </Box>
          </Grid>

          {/* Sección de contacto */}
          <Grid item xs={12} sm={6} md={4} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Contacto
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Dirección de la cafetería, Ciudad.
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              info@coffeeshop.com
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Teléfono: +123 456 789
            </Typography>
          </Grid>

          {/* Sección de redes sociales */}
          <Grid item xs={12} sm={6} md={4} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Síguenos
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <IconButton
                href="https://www.facebook.com"
                target="_blank"
                color="inherit"
                aria-label="Facebook"
              >
                <Facebook />
              </IconButton>
              <IconButton
                href="https://www.twitter.com"
                target="_blank"
                color="inherit"
                aria-label="Twitter"
              >
                <Twitter />
              </IconButton>
              <IconButton
                href="https://www.instagram.com"
                target="_blank"
                color="inherit"
                aria-label="Instagram"
              >
                <Instagram />
              </IconButton>
              <IconButton
                href="https://www.linkedin.com"
                target="_blank"
                color="inherit"
                aria-label="LinkedIn"
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          {/* Derechos de autor */}
          <Grid item xs={12} sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="body2">
              &copy; {new Date().getFullYear()} Coffee Shop. Todos los derechos reservados.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;