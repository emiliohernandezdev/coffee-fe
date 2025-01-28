import React from 'react';
import { Container, Grid, Typography, IconButton } from '@mui/material';
import { Facebook, Instagram, Twitter, LinkedIn } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
  const theme = useTheme();

  // Determinamos el color de fondo según el tema actual
  const footerBackgroundColor = theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.grey[200];
  const footerTextColor = theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.text.secondary;

  return (
    <footer style={{ backgroundColor: footerBackgroundColor, color: footerTextColor, padding: '2rem 0' }}>
      <Container>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4} className="text-center">
            <Typography variant="h6" className="font-semibold text-2xl">
              Coffee Shop
            </Typography>
            <Typography variant="body2" className="mt-2">
              Dirección de la cafetería, Ciudad.
            </Typography>
            <Typography variant="body2" className="mt-2">
              info@coffeeshop.com
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} className="text-center">
            <Typography variant="body2" className="text-lg mb-4">
              Síguenos en redes sociales
            </Typography>
            <div className="mt-2 flex justify-center">
              <IconButton
                href="https://www.facebook.com"
                target="_blank"
                color="inherit"
                aria-label="Facebook"
              >
                <Facebook />
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
                href="https://www.twitter.com"
                target="_blank"
                color="inherit"
                aria-label="Twitter"
              >
                <Twitter />
              </IconButton>
              <IconButton
                href="https://www.linkedin.com"
                target="_blank"
                color="inherit"
                aria-label="LinkedIn"
              >
                <LinkedIn />
              </IconButton>
            </div>
          </Grid>
          <Grid item xs={12} className="text-center mt-6">
            <Typography variant="body2">
              &copy; {new Date().getFullYear()} Cafe. Todos los derechos reservados.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
