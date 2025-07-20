import { useTheme } from '@mui/material/styles';
import { Container, Typography, Grid, Button, Box, Card, CardContent, CardMedia, Avatar, Paper, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import StarIcon from '@mui/icons-material/Star';

const HomePage = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const lightBackground = theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.background.default;
  const darkBackground = theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.background.paper;

  // Productos destacados (sin Cold Brew)
  const featuredProducts = [
    {
      title: "Café Espresso",
      description: "Un café intenso y aromático que te despierta en cada sorbo.",
      image: "https://www.lavanguardia.com/files/og_thumbnail/files/fp/uploads/2022/07/08/62c818a1aae37.r_d.627-418-9569.jpeg",
    },
    {
      title: "Café Latte",
      description: "Cremoso y suave, el favorito para los amantes del café dulce.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Caffe_Latte_at_Pulse_Cafe.jpg/1200px-Caffe_Latte_at_Pulse_Cafe.jpg",
    },
    {
      title: "Café Mocha",
      description: "Un delicioso mix de café espresso y chocolate.",
      image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
  ];

  const teamMembers = [
    {
      name: "Juan Pérez",
      role: "Barista Principal",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    },
    {
      name: "María Gómez",
      role: "Experta en Café",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    },
    {
      name: "Carlos López",
      role: "Gerente",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    },
  ];

  const testimonials = [
    {
      name: "Ana Torres",
      comment: "¡El mejor café que he probado! El ambiente es increíble.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    },
    {
      name: "Luis Ramírez",
      comment: "El Cold Brew es mi favorito. ¡Siempre fresco y delicioso!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    },
    {
      name: "Sofía Díaz",
      comment: "El taller de Latte Art fue una experiencia única. ¡Lo recomiendo!",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    },
  ];

  // Nueva sección: Ventajas/beneficios con emojis atractivos
  const benefits = [
    {
      icon: <Box component="span" sx={{ fontSize: 40 }}>☕️</Box>,
      title: "Café de Especialidad",
      desc: "Granos premium, frescura y sabor en cada taza.",
    },
    {
      icon: <Box component="span" sx={{ fontSize: 40 }}>🎓</Box>,
      title: "Baristas Certificados",
      desc: "Expertos apasionados por el arte del café.",
    },
    {
      icon: <Box component="span" sx={{ fontSize: 40 }}>🏡</Box>,
      title: "Ambiente Único",
      desc: "Espacio acogedor para relajarte, trabajar o compartir.",
    },
    {
      icon: <Box component="span" sx={{ fontSize: 40 }}>✨</Box>,
      title: "Innovación Constante",
      desc: "Nuevas recetas y experiencias cada temporada.",
    },
  ];

  // Nueva sección: Experiencia Coffee Shop
  const experience = [
    {
      emoji: "🌱",
      title: "Sostenibilidad",
      desc: "Comprometidos con el medio ambiente y el comercio justo.",
    },
    {
      emoji: "🎶",
      title: "Música y Cultura",
      desc: "Eventos, playlists y arte local para inspirarte.",
    },
    {
      emoji: "🍰",
      title: "Repostería Artesanal",
      desc: "Acompaña tu café con postres frescos y deliciosos.",
    },
    {
      emoji: "📶",
      title: "WiFi & Espacios Cómodos",
      desc: "Perfecto para estudiar, trabajar o reunirte.",
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: lightBackground,
        width: '100%',
        minWidth: 0,
        overflowX: 'clip',
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: 320, md: 440 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          mb: 0,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url("https://images3.alphacoders.com/870/870597.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(10px) brightness(0.7)',
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            bgcolor: theme.palette.primary.main,
            opacity: 0.3,
            zIndex: 2,
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          style={{
            position: 'relative',
            zIndex: 3,
            textAlign: 'center',
            width: '100%',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 900,
                mb: 0.5,
                letterSpacing: 2,
                fontSize: { xs: '2.1rem', sm: '2.7rem', md: '3.2rem' },
                lineHeight: 1.1,
                color: '#fff',
                textShadow: `
                  0 6px 32px rgba(0,0,0,0.85),
                  0 1px 1px rgba(0,0,0,0.18)
                `,
                px: 2,
                py: 0.5,
                borderRadius: 3,
                // background removed
                display: 'inline-block',
                fontFamily: `'Montserrat', 'Segoe UI', Arial, sans-serif`,
                transition: 'color 0.3s, background 0.3s',
              }}
            >
              ☕️ Coffee Shop
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 1.5,
                maxWidth: 600,
                mx: 'auto',
                color: '#fff',
                fontWeight: 500,
                letterSpacing: 0.5,
                fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.35rem' },
                lineHeight: 1.4,
                textShadow: `
                  0 2px 12px rgba(0,0,0,0.45)
                `,
                // background removed
                borderRadius: 2,
                px: 2,
                py: 0.5,
                display: 'inline-block',
                fontFamily: `'Montserrat', 'Segoe UI', Arial, sans-serif`,
                transition: 'color 0.3s, background 0.3s',
              }}
            >
              Bienvenido a tu espacio favorito para disfrutar el mejor café, ambiente y experiencias únicas.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 5,
                py: 1.2,
                borderRadius: 99,
                boxShadow: 4,
                fontWeight: 700,
                fontSize: { xs: '1rem', md: '1.08rem' },
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: theme.palette.getContrastText(theme.palette.primary.main),
                '&:hover': {
                  background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                  boxShadow: 8,
                },
              }}
            >
              Explora Nuestro Menú
            </Button>
          </Box>
        </motion.div>
      </Box>

      {/* Beneficios principales */}
      <Box sx={{ py: { xs: 5, md: 7 }, bgcolor: lightBackground }}>
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent="center">
            {benefits.map((benefit, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.1 }}
                  style={{ width: '100%' }}
                >
                  <Paper
                    elevation={6}
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      borderRadius: 4,
                      bgcolor: theme.palette.background.paper,
                      height: { xs: 180, sm: 180, md: 180 },
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1,
                      width: '100%',
                      maxWidth: '100%',
                    }}
                  >
                    {benefit.icon}
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5, color: theme.palette.text.primary }}>
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      {benefit.desc}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Experiencia Coffee Shop */}
      <Box sx={{ py: { xs: 5, md: 7 }, bgcolor: darkBackground }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: 700,
              mb: { xs: 4, md: 6 },
              color: theme.palette.primary.main,
              letterSpacing: 1,
              fontSize: { xs: '1.3rem', sm: '1.6rem', md: '2rem' },
            }}
          >
            Vive la Experiencia Coffee Shop
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {experience.map((exp, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.1 }}
                  style={{ width: '100%' }}
                >
                  <Paper
                    elevation={5}
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      borderRadius: 4,
                      bgcolor: theme.palette.background.paper,
                      height: { xs: 180, sm: 180, md: 180 }, // Igual que beneficios
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1,
                      width: '100%',
                      maxWidth: '100%',
                      fontSize: 36,
                    }}
                  >
                    <Box sx={{ fontSize: 48, mb: 1 }}>{exp.emoji}</Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5, color: theme.palette.text.primary }}>
                      {exp.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      {exp.desc}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Productos Destacados */}
      <Box sx={{ py: { xs: 5, md: 7 }, bgcolor: lightBackground }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: 700,
              mb: { xs: 4, md: 6 },
              // color: theme.palette.secondary.main,
              letterSpacing: 1,
              fontSize: { xs: '1.3rem', sm: '1.6rem', md: '2rem' },
            }}
          >
            Productos Destacados
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {featuredProducts.map((product, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.1 }}
                  style={{ width: '100%' }}
                >
                  <Card
                    sx={{
                      height: { xs: 320, sm: 340, md: 340 },
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: 8,
                      borderRadius: 4,
                      bgcolor: theme.palette.background.paper,
                      transition: 'box-shadow 0.3s',
                      position: 'relative',
                      overflow: 'hidden',
                      width: '100%',
                      maxWidth: '100%',
                    }}
                  >
                    <Box sx={{ position: 'relative', width: '100%', height: 170, overflow: 'hidden' }}>
                      <CardMedia
                        component="img"
                        image={product.image}
                        alt={product.title}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center',
                          borderTopLeftRadius: 16,
                          borderTopRightRadius: 16,
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          width: '100%',
                          bgcolor: 'rgba(0,0,0,0.45)',
                          color: '#fff',
                          px: 2,
                          py: 1,
                        }}
                      >
                        <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 700, fontSize: { xs: '1rem', md: '1.1rem' } }}>
                          {product.title}
                        </Typography>
                      </Box>
                    </Box>
                    <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: 400, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                        {product.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Sobre Nosotros */}
      <Box
        sx={{
          py: { xs: 5, md: 7 },
          bgcolor: darkBackground,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center" direction={isMd ? 'row' : 'column-reverse'}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                    color: theme.palette.primary.main,
                    letterSpacing: 1,
                    fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
                  }}
                >
                  Sobre Nosotros
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: '0.98rem', md: '1.08rem' },
                    color: theme.palette.text.secondary,
                    mb: 1.5,
                    lineHeight: 1.7,
                  }}
                >
                  En Coffee Shop, nos apasiona el café de calidad. Desde 2010, hemos estado sirviendo los mejores granos de café, tostados y preparados con cuidado para ofrecerte una experiencia única en cada taza.
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: '0.98rem', md: '1.08rem' },
                    color: theme.palette.text.primary,
                    fontWeight: 500,
                  }}
                >
                  Nuestro equipo de baristas expertos está dedicado a brindarte el mejor servicio y a compartir contigo el amor por el café.
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Box
                  sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: 8,
                    maxWidth: 380,
                    mx: 'auto',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    alt="Sobre Nosotros"
                    style={{ width: '100%', display: 'block', objectFit: 'cover', minHeight: 200 }}
                  />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Nuestro Equipo */}
      <Box sx={{ py: { xs: 5, md: 7 }, bgcolor: lightBackground }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: 700,
              mb: { xs: 4, md: 6 },
              // color: theme.palette.secondary.main,
              letterSpacing: 1,
              fontSize: { xs: '1.3rem', sm: '1.6rem', md: '2rem' },
            }}
          >
            Nuestro Equipo
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  whileHover={{
                    scale: 1.08,
                    boxShadow: '0 12px 32px rgba(0,0,0,0.22)',
                    rotateZ: 2,
                  }}
                  transition={{ type: 'spring', stiffness: 250 }}
                  style={{ height: '100%' }}
                >
                  <Paper
                    elevation={8}
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      borderRadius: '50%',
                      boxShadow: 8,
                      bgcolor: theme.palette.background.paper,
                      height: 220,
                      width: 220,
                      mx: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'box-shadow 0.3s',
                      position: 'relative',
                    }}
                  >
                    <Avatar
                      src={member.image}
                      alt={member.name}
                      sx={{
                        width: 80,
                        height: 80,
                        mb: 1,
                        boxShadow: 3,
                        border: `3px solid ${theme.palette.primary.main}`,
                        transition: 'transform 0.3s',
                        '&:hover': { transform: 'scale(1.1)' },
                      }}
                    />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 0.5, fontSize: { xs: '1rem', md: '1.08rem' } }}>
                      {member.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: 500, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                      {member.role}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonios */}
      <Box sx={{ py: { xs: 5, md: 7 }, bgcolor: darkBackground }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: 700,
              mb: { xs: 4, md: 6 },
              color: theme.palette.primary.main,
              letterSpacing: 1,
              fontSize: { xs: '1.3rem', sm: '1.6rem', md: '2rem' },
            }}
          >
            Testimonios
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  style={{ height: '100%' }}
                >
                  <Card
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      borderRadius: 4,
                      boxShadow: 6,
                      bgcolor: theme.palette.background.paper,
                      height: 220,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'box-shadow 0.3s',
                    }}
                  >
                    <Avatar
                      src={testimonial.image}
                      alt={testimonial.name}
                      sx={{
                        width: 60,
                        height: 60,
                        mb: 1,
                        boxShadow: 2,
                        border: `2px solid ${theme.palette.secondary.main}`,
                      }}
                    />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 0.5, fontSize: { xs: '1rem', md: '1.08rem' } }}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1, fontWeight: 500, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                      {testimonial.comment}
                    </Typography>
                    <Box>
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} sx={{ color: theme.palette.warning.main, fontSize: 18 }} />
                      ))}
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;