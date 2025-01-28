import { useTheme } from '@emotion/react';
import { ShoppingCart } from '@mui/icons-material';
import { Container, Typography, Grid, Button, Card, CardContent, Fab } from '@mui/material';
import { motion } from 'framer-motion';

const ProductsPage = () => {

    const theme = useTheme();
    const fabBackgroundColor = theme.palette.mode === 'dark' ? '#FF5733' : '#3f51b5'; // Rojo para tema oscuro, Azul para tema claro

    return (
        <div>
            {/* Hero Section de Productos */}
            <section className="relative bg-cover bg-center h-[400px] flex flex-col justify-center items-center text-white" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1519125323398-9c6b7bb00e8b")' }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <motion.div className="z-10 text-center px-4">
                    <Typography variant="h3" className="text-5xl font-bold mb-4">
                        Productos Destacados
                    </Typography>
                    <Typography variant="h6" className="mb-8 text-lg">
                        Disfruta de lo mejor que tenemos para ti.
                    </Typography>
                </motion.div>
            </section>

            {/* Sección de Productos */}
            <section className="py-16 bg-coffee-bg dark:bg-coffee-dark text-black dark:text-white">
                <Container>
                    <Typography variant="h4" className="text-center text-3xl font-semibold mb-8">
                        Nuestro Menú
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        {/* Producto 1 */}
                        <Grid item xs={12} sm={6} md={4}>
                            <motion.div whileHover={{ scale: 1.05 }} className="transition duration-300 ease-in-out">
                                <Card className="shadow-lg rounded-lg overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1592335753914-c1e8c2e05d29" alt="Café Espresso" className="h-[250px] w-full object-cover" />
                                    <CardContent>
                                        <Typography variant="h6" className="font-semibold">Café Espresso</Typography>
                                        <Typography variant="body2" className="mt-2 text-gray-700 dark:text-gray-300">
                                            Un café intenso y aromático que te despierta en cada sorbo.
                                        </Typography>
                                        <Button variant="contained" color="primary" size="small" className="mt-4">
                                            Ver Detalles
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                        {/* Producto 2 */}
                        <Grid item xs={12} sm={6} md={4}>
                            <motion.div whileHover={{ scale: 1.05 }} className="transition duration-300 ease-in-out">
                                <Card className="shadow-lg rounded-lg overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1512440601431-340034d7fdf2" alt="Café Latte" className="h-[250px] w-full object-cover" />
                                    <CardContent>
                                        <Typography variant="h6" className="font-semibold">Café Latte</Typography>
                                        <Typography variant="body2" className="mt-2 text-gray-700 dark:text-gray-300">
                                            Cremoso y suave, el favorito para los amantes del café dulce.
                                        </Typography>
                                        <Button variant="contained" color="primary" size="small" className="mt-4">
                                            Ver Detalles
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                        {/* Producto 3 */}
                        <Grid item xs={12} sm={6} md={4}>
                            <motion.div whileHover={{ scale: 1.05 }} className="transition duration-300 ease-in-out">
                                <Card className="shadow-lg rounded-lg overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1603703433114-24fa62799b6e" alt="Cold Brew" className="h-[250px] w-full object-cover" />
                                    <CardContent>
                                        <Typography variant="h6" className="font-semibold">Cold Brew</Typography>
                                        <Typography variant="body2" className="mt-2 text-gray-700 dark:text-gray-300">
                                            Refrescante y perfecto para los días calurosos.
                                        </Typography>
                                        <Button variant="contained" color="primary" size="small" className="mt-4">
                                            Ver Detalles
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Container>
            </section>

            {/* FAB - Botón flotante de "Ordenar" */}
            <Fab
                variant="extended"
                color="primary"
                aria-label="Ordenar"
                sx={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    zIndex: 1000,
                    backgroundColor: fabBackgroundColor,
                    color: 'white', // Asegura que el ícono sea visible
                }}
            >
                <ShoppingCart sx={{ mr: 1 }} />
                Ordenar
            </Fab>
        </div>
    );
};

export default ProductsPage;
