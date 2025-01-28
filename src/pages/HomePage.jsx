import { Container, Typography, Grid, Button, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion'; // Animaciones

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[500px] flex flex-col justify-center items-center text-white"
        style={{ backgroundImage: 'url("https://images3.alphacoders.com/870/870597.jpg")' }}>
        {/* Fondo con blur */}
        <div className="absolute inset-0 bg-black opacity-40 backdrop-blur-lg"></div>

        {/* Contenido animado */}
        <motion.div
          className="z-10 text-center px-4 transition-all duration-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <Typography variant="h3" className="text-5xl font-bold mb-4">
            Bienvenido a Mia Cafe
          </Typography>
          <Typography variant="h6" className="mb-8 text-lg max-w-3xl mx-auto">
            El mejor café para tu día, directo a tu taza.
          </Typography>
          <Button variant="contained" color="primary" size="large" className="py-2 px-8 rounded-full shadow-lg transform transition duration-300 hover:scale-105">
            Explora Nuestro Menú
          </Button>
        </motion.div>
      </section>

      {/* Productos Destacados */}
      <section className="py-16 bg-primary-500 dark:bg-primary-600 dark:text-white">
        <Container>
          <Typography variant="h4" className="text-center text-3xl font-semibold mb-8">
            Productos Destacados
          </Typography>
          <br />
          <Grid container spacing={4} justifyContent="center">
            {/* Producto 1 */}
            <Grid item xs={12} sm={6} md={4}>
              <motion.div whileHover={{ scale: 1.05 }} className="transition duration-300 ease-in-out">
                <Card className="shadow-lg rounded-lg overflow-hidden dark:bg-neutral-700">
                  <img src="https://www.lavanguardia.com/files/og_thumbnail/files/fp/uploads/2022/07/08/62c818a1aae37.r_d.627-418-9569.jpeg" alt="Café Espresso" className="h-[250px] w-full object-cover" />
                  <CardContent>
                    <Typography variant="h6" className="font-semibold text-gray-800 dark:text-white">Café Espresso</Typography>
                    <Typography variant="body2" className="text-gray-700 dark:text-gray-300 mt-2">
                      Un café intenso y aromático que te despierta en cada sorbo.
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            {/* Producto 2 */}
            <Grid item xs={12} sm={6} md={4}>
              <motion.div whileHover={{ scale: 1.05 }} className="transition duration-300 ease-in-out">
                <Card className="shadow-lg rounded-lg overflow-hidden dark:bg-neutral-700">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Caffe_Latte_at_Pulse_Cafe.jpg/1200px-Caffe_Latte_at_Pulse_Cafe.jpg" alt="Café Latte" className="h-[250px] w-full object-cover" />
                  <CardContent>
                    <Typography variant="h6" className="font-semibold text-gray-800 dark:text-white">Café Latte</Typography>
                    <Typography variant="body2" className="text-gray-700 dark:text-gray-300 mt-2">
                      Cremoso y suave, el favorito para los amantes del café dulce.
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            {/* Producto 3 */}
            <Grid item xs={12} sm={6} md={4}>
              <motion.div whileHover={{ scale: 1.05 }} className="transition duration-300 ease-in-out">
                <Card className="shadow-lg rounded-lg overflow-hidden dark:bg-neutral-700">
                  <img src="https://ineffablecoffee.com/wp-content/uploads/2021/05/blog-ineffablecoffee-roasters-cafe-cold-brew-00.jpg" alt="Cold Brew" className="h-[250px] w-full object-cover" />
                  <CardContent>
                    <Typography variant="h6" className="font-semibold text-gray-800 dark:text-white">Cold Brew</Typography>
                    <Typography variant="body2" className="text-gray-700 dark:text-gray-300 mt-2">
                      Refrescante y perfecto para los días calurosos.
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Testimonios de Clientes */}
      <section className="py-16 bg-primary-500 dark:bg-primary-600 dark:text-white">
        <Container>
          <Typography variant="h4" className="text-center text-3xl font-semibold mb-8">
            Lo que nuestros clientes dicen
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {/* Testimonio 1 */}
            <Grid item xs={12} sm={6} md={4}>
              <Card className="shadow-lg rounded-lg p-6 dark:bg-neutral-700">
                <Typography variant="body1" className="italic text-gray-700 dark:text-gray-300 mb-4">
                  "El mejor café que he probado, siempre un lugar perfecto para trabajar o relajarme."
                </Typography>
                <Typography variant="body2" className="text-gray-600 dark:text-gray-400 text-right">– Ana M.</Typography>
              </Card>
            </Grid>
            {/* Testimonio 2 */}
            <Grid item xs={12} sm={6} md={4}>
              <Card className="shadow-lg rounded-lg p-6 dark:bg-neutral-700">
                <Typography variant="body1" className="italic text-gray-700 dark:text-gray-300 mb-4">
                  "Un ambiente increíble, siempre me siento como en casa. ¡Y el café es delicioso!"
                </Typography>
                <Typography variant="body2" className="text-gray-600 dark:text-gray-400 text-right">– Carlos T.</Typography>
              </Card>
            </Grid>
            {/* Testimonio 3 */}
            <Grid item xs={12} sm={6} md={4}>
              <Card className="shadow-lg rounded-lg p-6 dark:bg-neutral-700">
                <Typography variant="body1" className="italic text-gray-700 dark:text-gray-300 mb-4">
                  "Me encanta el Cold Brew, perfecto para cualquier momento del día."
                </Typography>
                <Typography variant="body2" className="text-gray-600 dark:text-gray-400 text-right">– Laura G.</Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Sección de Promociones */}
      <section className="py-16 bg-primary-500 dark:bg-primary-600">
        <Container>
          <Typography variant="h4" className="text-center text-3xl font-semibold mb-8">
            Promociones Especiales
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Card className="bg-secondary-500 p-6 rounded-lg shadow-lg text-center dark:bg-secondary-600">
                <Typography variant="h6" className="text-2xl font-semibold mb-4">
                  2x1 en Café Espresso
                </Typography>
                <Typography variant="body2">
                  ¡Disfruta de nuestro delicioso Espresso con una oferta especial!
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className="bg-secondary-500 p-6 rounded-lg shadow-lg text-center dark:bg-secondary-600">
                <Typography variant="h6" className="text-2xl font-semibold mb-4">
                  20% de Descuento en tu primera compra
                </Typography>
                <Typography variant="body2">
                  Regístrate en nuestra app y recibe un descuento exclusivo.
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
