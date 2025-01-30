import { useTheme } from '@mui/material/styles';
import { Container, Typography, Grid, Button, Box } from '@mui/material';
import { motion } from 'framer-motion'; // Animaciones
import { Card, CardContent } from '@mui/material';

const HomePage = () => {
  // Obtén el tema actual
  const theme = useTheme();

  // Colores de fondo claros y oscuros
  const lightBackground = theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.background.default;
  const darkBackground = theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.background.paper;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] flex flex-col justify-center items-center text-white">
        {/* Fondo desenfocado */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images3.alphacoders.com/870/870597.jpg")',
            filter: 'blur(8px)', // Solo desenfoque sin filtro de color
            zIndex: -1 // Asegúrate de que este div esté detrás del contenido
          }}
        />
        {/* Fondo de la hero section sin filtro de color */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundColor: theme.palette.mode === 'dark' ? darkBackground : lightBackground, 
            opacity: 0.4
          }}
        ></div>

        {/* Contenido animado */}
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
          <br/>
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

      {/* Productos Destacados */}
      <section className="py-16" style={{ backgroundColor: theme.palette.mode === 'dark' ? darkBackground : lightBackground }}>
        <Container>
          <Typography variant="h4" className="text-center text-3xl font-semibold mb-8" style={{ color: theme.palette.text.primary }}>
            Productos Destacados
          </Typography>
          <br/>
          <Grid container spacing={4} justifyContent="center">
            {/* Producto 1 */}
            <Grid item xs={12} sm={6} md={4}>
              <motion.div whileHover={{ scale: 1.05 }} className="transition duration-300 ease-in-out">
                <Card className="shadow-lg rounded-lg overflow-hidden">
                  {/* Imagen como header completo de la tarjeta */}
                  <Box
                    sx={{
                      width: "100%",
                      height: 200, // Altura ajustada de la imagen
                      backgroundImage: "url('https://www.lavanguardia.com/files/og_thumbnail/files/fp/uploads/2022/07/08/62c818a1aae37.r_d.627-418-9569.jpeg')", // Imagen de fondo
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderTopLeftRadius: "16px",
                      borderTopRightRadius: "16px",
                    }}
                  />
                  <CardContent sx={{ paddingTop: "16px", textAlign: "center" }}>
                    <Typography variant="h6" fontWeight="bold" style={{ color: theme.palette.text.primary }}>
                      Café Espresso
                    </Typography>
                    <Typography variant="body2" className="mt-2" style={{ color: theme.palette.text.secondary }}>
                      Un café intenso y aromático que te despierta en cada sorbo.
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            {/* Producto 2 */}
            <Grid item xs={12} sm={6} md={4}>
              <motion.div whileHover={{ scale: 1.05 }} className="transition duration-300 ease-in-out">
                <Card className="shadow-lg rounded-lg overflow-hidden">
                  {/* Imagen como header completo de la tarjeta */}
                  <Box
                    sx={{
                      width: "100%",
                      height: 200, // Altura ajustada de la imagen
                      backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Caffe_Latte_at_Pulse_Cafe.jpg/1200px-Caffe_Latte_at_Pulse_Cafe.jpg')", // Imagen de fondo
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderTopLeftRadius: "16px",
                      borderTopRightRadius: "16px",
                    }}
                  />
                  <CardContent sx={{ paddingTop: "16px", textAlign: "center" }}>
                    <Typography variant="h6" fontWeight="bold" style={{ color: theme.palette.text.primary }}>
                      Café Latte
                    </Typography>
                    <Typography variant="body2" className="mt-2" style={{ color: theme.palette.text.secondary }}>
                      Cremoso y suave, el favorito para los amantes del café dulce.
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            {/* Producto 3 */}
            <Grid item xs={12} sm={6} md={4}>
              <motion.div whileHover={{ scale: 1.05 }} className="transition duration-300 ease-in-out">
                <Card className="shadow-lg rounded-lg overflow-hidden">
                  {/* Imagen como header completo de la tarjeta */}
                  <Box
                    sx={{
                      width: "100%",
                      height: 200, // Altura ajustada de la imagen
                      backgroundImage: "url('https://ineffablecoffee.com/wp-content/uploads/2021/05/blog-ineffablecoffee-roasters-cafe-cold-brew-00.jpg')", // Imagen de fondo
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderTopLeftRadius: "16px",
                      borderTopRightRadius: "16px",
                    }}
                  />
                  <CardContent sx={{ paddingTop: "16px", textAlign: "center" }}>
                    <Typography variant="h6" fontWeight="bold" style={{ color: theme.palette.text.primary }}>
                      Cold Brew
                    </Typography>
                    <Typography variant="body2" className="mt-2" style={{ color: theme.palette.text.secondary }}>
                      Refrescante y perfecto para los días calurosos.
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Recetas */}
      <section className="py-16" style={{ backgroundColor: theme.palette.mode === 'dark' ? darkBackground : lightBackground }}>
        <Container>
          <Typography variant="h4" className="text-center text-3xl font-semibold mb-8" style={{ color: theme.palette.text.primary }}>
            Nuestras Recetas
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Card className="shadow-lg rounded-lg p-6">
                <Typography variant="h6" className="text-xl font-semibold mb-4" style={{ color: theme.palette.text.primary }}>
                  Café Mocha
                </Typography>
                <Typography variant="body2" style={{ color: theme.palette.text.secondary }}>
                  Un delicioso mix de café espresso y chocolate, perfecto para los días fríos.
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className="shadow-lg rounded-lg p-6">
                <Typography variant="h6" className="text-xl font-semibold mb-4" style={{ color: theme.palette.text.primary }}>
                  Affogato
                </Typography>
                <Typography variant="body2" style={{ color: theme.palette.text.secondary }}>
                  Un espresso caliente servido sobre una bola de helado de vainilla.
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Eventos */}
      <section className="py-16" style={{ backgroundColor: theme.palette.mode === 'dark' ? darkBackground : lightBackground }}>
        <Container>
          <Typography variant="h4" className="text-center text-3xl font-semibold mb-8" style={{ color: theme.palette.text.primary }}>
            Próximos Eventos
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Card className="shadow-lg rounded-lg p-6">
                <Typography variant="h6" className="text-xl font-semibold mb-4" style={{ color: theme.palette.text.primary }}>
                  Tarde de Café y Música
                </Typography>
                <Typography variant="body2" style={{ color: theme.palette.text.secondary }}>
                  Ven a disfrutar de una tarde relajada con café y música en vivo. ¡No te lo pierdas!
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className="shadow-lg rounded-lg p-6">
                <Typography variant="h6" className="text-xl font-semibold mb-4" style={{ color: theme.palette.text.primary }}>
                  Taller de Latte Art
                </Typography>
                <Typography variant="body2" style={{ color: theme.palette.text.secondary }}>
                  Aprende las técnicas del arte latte con nuestros expertos baristas.
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;
