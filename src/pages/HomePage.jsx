import { useTheme } from '@mui/material/styles';
import { Container, Typography, Grid, Button, Box, Card, CardContent, CardMedia, IconButton, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import StarIcon from '@mui/icons-material/Star';

const HomePage = () => {
  const theme = useTheme();
  const lightBackground = theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.background.default;
  const darkBackground = theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.background.paper;

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
      title: "Cold Brew",
      description: "Refrescante y perfecto para los días calurosos.",
      image: "https://ineffablecoffee.com/wp-content/uploads/2021/05/blog-ineffablecoffee-roasters-cafe-cold-brew-00.jpg",
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

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] flex flex-col justify-center items-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images3.alphacoders.com/870/870597.jpg")',
            filter: 'blur(8px)',
            zIndex: -1,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: theme.palette.mode === 'dark' ? darkBackground : lightBackground,
            opacity: 0.4,
          }}
        ></div>
        <motion.div
          className="z-10 text-center px-4 transition-all duration-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <Typography variant="h3" className="text-5xl font-bold mb-4" style={{ color: theme.palette.text.primary }}>
            Bienvenido a Coffee Shop
          </Typography>
          <Typography variant="h6" className="mb-8 text-lg max-w-3xl mx-auto" style={{ color: theme.palette.text.secondary }}>
            El mejor café para tu día, directo a tu taza.
          </Typography>
          <br />
          <Button
            variant="contained"
            color="primary"
            size="large"
            className="py-2 px-8 rounded-full shadow-lg transform transition duration-300 hover:scale-105"
            style={{ backgroundColor: theme.palette.primary.main }}
          >
            Explora Nuestro Menú
          </Button>
        </motion.div>
      </section>

      {/* Productos Destacados con Grid */}
      <section className="py-16" style={{ backgroundColor: theme.palette.mode === 'dark' ? darkBackground : lightBackground }}>
        <Container>
          <Typography variant="h4" className="text-center text-3xl font-semibold mb-8" style={{ color: theme.palette.text.primary }}>
            Productos Destacados
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {featuredProducts.map((product, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div whileHover={{ scale: 1.05 }} className="transition duration-300 ease-in-out">
                  <Card className="shadow-lg rounded-lg overflow-hidden">
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.image}
                      alt={product.title}
                    />
                    <CardContent sx={{ paddingTop: "16px", textAlign: "center" }}>
                      <Typography variant="h6" fontWeight="bold" style={{ color: theme.palette.text.primary }}>
                        {product.title}
                      </Typography>
                      <Typography variant="body2" className="mt-2" style={{ color: theme.palette.text.secondary }}>
                        {product.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Sobre Nosotros */}
      <section className="py-16" style={{ backgroundColor: theme.palette.mode === 'dark' ? darkBackground : lightBackground }}>
        <Container>
          <Typography variant="h4" className="text-center text-3xl font-semibold mb-8" style={{ color: theme.palette.text.primary }}>
            Sobre Nosotros
          </Typography>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                height="400"
                image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Sobre Nosotros"
                className="rounded-lg shadow-lg"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" className="text-lg" style={{ color: theme.palette.text.secondary }}>
                En Coffee Shop, nos apasiona el café de calidad. Desde 2010, hemos estado sirviendo los mejores granos de café, tostados y preparados con cuidado para ofrecerte una experiencia única en cada taza. Nuestro equipo de baristas expertos está dedicado a brindarte el mejor servicio y a compartir contigo el amor por el café.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Nuestro Equipo */}
      <section className="py-16" style={{ backgroundColor: theme.palette.mode === 'dark' ? darkBackground : lightBackground }}>
        <Container>
          <Typography variant="h4" className="text-center text-3xl font-semibold mb-8" style={{ color: theme.palette.text.primary }}>
            Nuestro Equipo
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div whileHover={{ scale: 1.05 }} className="transition duration-300 ease-in-out">
                  <Card className="shadow-lg rounded-lg p-6 text-center">
                    <Avatar
                      src={member.image}
                      alt={member.name}
                      sx={{ width: 120, height: 120, margin: '0 auto 16px' }}
                    />
                    <Typography variant="h6" className="text-xl font-semibold mb-2" style={{ color: theme.palette.text.primary }}>
                      {member.name}
                    </Typography>
                    <Typography variant="body2" style={{ color: theme.palette.text.secondary }}>
                      {member.role}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Testimonios */}
      <section className="py-16" style={{ backgroundColor: theme.palette.mode === 'dark' ? darkBackground : lightBackground }}>
        <Container>
          <Typography variant="h4" className="text-center text-3xl font-semibold mb-8" style={{ color: theme.palette.text.primary }}>
            Testimonios
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div whileHover={{ scale: 1.05 }} className="transition duration-300 ease-in-out">
                  <Card className="shadow-lg rounded-lg p-6 text-center">
                    <Avatar
                      src={testimonial.image}
                      alt={testimonial.name}
                      sx={{ width: 80, height: 80, margin: '0 auto 16px' }}
                    />
                    <Typography variant="h6" className="text-xl font-semibold mb-2" style={{ color: theme.palette.text.primary }}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" style={{ color: theme.palette.text.secondary }}>
                      {testimonial.comment}
                    </Typography>
                    <Box className="mt-4">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} style={{ color: theme.palette.warning.main }} />
                      ))}
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Contacto */}
      <section className="py-16" style={{ backgroundColor: theme.palette.mode === 'dark' ? darkBackground : lightBackground }}>
        <Container>
          <Typography variant="h4" className="text-center text-3xl font-semibold mb-8" style={{ color: theme.palette.text.primary }}>
            Contacto
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Card className="shadow-lg rounded-lg p-6 text-center">
                <ContactMailIcon fontSize="large" style={{ color: theme.palette.primary.main }} />
                <Typography variant="h6" className="text-xl font-semibold mb-2" style={{ color: theme.palette.text.primary }}>
                  ¡Contáctanos!
                </Typography>
                <Typography variant="body2" style={{ color: theme.palette.text.secondary }}>
                  Estamos aquí para responder tus preguntas y escuchar tus sugerencias.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className="mt-4"
                >
                  Enviar Mensaje
                </Button>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;