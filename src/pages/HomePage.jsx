import { useTheme } from '@mui/material/styles';
import { Container, Typography, Grid, Button, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion'; // Animaciones
import { lighten } from '@mui/system'; // Para aclarar colores

const HomePage = () => {
  // Obtén el tema actual
  const theme = useTheme();

  // Aclara un poco el color primario
  const lightPrimary = lighten(theme.palette.primary.main, 0.2); // Ajusta el porcentaje según lo que necesites

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] flex flex-col justify-center items-center text-white">
        {/* Fondo desenfocado */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images3.alphacoders.com/870/870597.jpg")',
            filter: 'blur(8px)', // Desenfoque solo en el fondo
            zIndex: -1 // Asegúrate de que este div esté detrás del contenido
          }}
        />
        {/* Fondo con overlay oscuro */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Contenido animado */}
        <motion.div
          className="z-10 text-center px-4 transition-all duration-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <Typography variant="h3" className="text-5xl font-bold mb-4">
            Bienvenido a Coffee Shop
          </Typography>
          <Typography variant="h6" className="mb-8 text-lg max-w-3xl mx-auto">
            El mejor café para tu día, directo a tu taza.
          </Typography>
          <br/>
          <Button variant="contained" color="primary" size="large" className="py-2 px-8 rounded-full shadow-lg transform transition duration-300 hover:scale-105">
            Explora Nuestro Menú
          </Button>
        </motion.div>
      </section>

      {/* Productos Destacados */}
      <section className="py-16" style={{ backgroundColor: lightPrimary }}>
        <Container>
          <Typography variant="h4" className="text-center text-3xl font-semibold mb-8 text-white">
            Productos Destacados
          </Typography>
          <br/>
          <Grid container spacing={4} justifyContent="center">
            {/* Producto 1 */}
            <Grid item xs={12} sm={6} md={4}>
              <motion.div whileHover={{ scale: 1.05 }} className="transition duration-300 ease-in-out">
                <Card className="shadow-lg rounded-lg overflow-hidden" style={{ backgroundColor: '#8B5E3C' }}>
                  <img src="https://www.lavanguardia.com/files/og_thumbnail/files/fp/uploads/2022/07/08/62c818a1aae37.r_d.627-418-9569.jpeg" alt="Café Espresso" className="h-[250px] w-full object-cover" />
                  <CardContent>
                    <Typography variant="h6" className="font-semibold text-white">Café Espresso</Typography>
                    <Typography variant="body2" className="text-white mt-2">
                      Un café intenso y aromático que te despierta en cada sorbo.
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            {/* Producto 2 */}
            <Grid item xs={12} sm={6} md={4}>
              <motion.div whileHover={{ scale: 1.05 }} className="transition duration-300 ease-in-out">
                <Card className="shadow-lg rounded-lg overflow-hidden" style={{ backgroundColor: '#8B5E3C' }}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Caffe_Latte_at_Pulse_Cafe.jpg/1200px-Caffe_Latte_at_Pulse_Cafe.jpg" alt="Café Latte" className="h-[250px] w-full object-cover" />
                  <CardContent>
                    <Typography variant="h6" className="font-semibold text-white">Café Latte</Typography>
                    <Typography variant="body2" className="text-white mt-2">
                      Cremoso y suave, el favorito para los amantes del café dulce.
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            {/* Producto 3 */}
            <Grid item xs={12} sm={6} md={4}>
              <motion.div whileHover={{ scale: 1.05 }} className="transition duration-300 ease-in-out">
                <Card className="shadow-lg rounded-lg overflow-hidden" style={{ backgroundColor: '#8B5E3C' }}>
                  <img src="https://ineffablecoffee.com/wp-content/uploads/2021/05/blog-ineffablecoffee-roasters-cafe-cold-brew-00.jpg" alt="Cold Brew" className="h-[250px] w-full object-cover" />
                  <CardContent>
                    <Typography variant="h6" className="font-semibold text-white">
                      Cold Brew
                    </Typography>
                    <Typography variant="body2" className="text-white mt-2">
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
      <section className="py-16" style={{ backgroundColor: lightPrimary }}>
        <Container>
          <Typography variant="h4" className="text-center text-3xl font-semibold mb-8 text-white">
            Nuestras Recetas
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Card className="shadow-lg rounded-lg p-6" style={{ backgroundColor: '#8B5E3C' }}>
                <Typography variant="h6" className="text-white text-xl font-semibold mb-4">
                  Café Mocha
                </Typography>
                <Typography variant="body2" className="text-white">
                  Un delicioso mix de café espresso y chocolate, perfecto para los días fríos.
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className="shadow-lg rounded-lg p-6" style={{ backgroundColor: '#8B5E3C' }}>
                <Typography variant="h6" className="text-white text-xl font-semibold mb-4">
                  Affogato
                </Typography>
                <Typography variant="body2" className="text-white">
                  Un espresso caliente servido sobre una bola de helado de vainilla.
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Eventos */}
      <section className="py-16" style={{ backgroundColor: lightPrimary }}>
        <Container>
          <Typography variant="h4" className="text-center text-3xl font-semibold mb-8 text-white">
            Próximos Eventos
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Card className="shadow-lg rounded-lg p-6" style={{ backgroundColor: '#8B5E3C' }}>
                <Typography variant="h6" className="text-white text-xl font-semibold mb-4">
                  Tarde de Café y Música
                </Typography>
                <Typography variant="body2" className="text-white">
                  Ven a disfrutar de una tarde relajada con café y música en vivo. ¡No te lo pierdas!
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className="shadow-lg rounded-lg p-6" style={{ backgroundColor: '#8B5E3C' }}>
                <Typography variant="h6" className="text-white text-xl font-semibold mb-4">
                  Workshop de Latte Art
                </Typography>
                <Typography variant="body2" className="text-white">
                  Aprende el arte de hacer latte art con nuestros baristas expertos. ¡Inscríbete ahora!
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
