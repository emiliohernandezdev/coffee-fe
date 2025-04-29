import React, { useState } from 'react';
import { Container, Typography, Grid, Button, Card, CardContent, Box, TextField } from '@mui/material';
import { motion } from 'framer-motion';

const products = [
  { id: 1, name: 'Café Espresso', price: 5, image: 'https://www.lavanguardia.com/files/og_thumbnail/files/fp/uploads/2022/07/08/62c818a1aae37.r_d.627-418-9569.jpeg' },
  { id: 2, name: 'Café Latte', price: 6, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Caffe_Latte_at_Pulse_Cafe.jpg/1200px-Caffe_Latte_at_Pulse_Cafe.jpg' },
  { id: 3, name: 'Cold Brew', price: 7, image: 'https://ineffablecoffee.com/wp-content/uploads/2021/05/blog-ineffablecoffee-roasters-cafe-cold-brew-00.jpg' },
];

const OrderProducts = ({ addToCart }) => {
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (productId, quantity) => {
    setQuantities((prev) => ({ ...prev, [productId]: quantity }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    addToCart({ ...product, quantity });
    setQuantities((prev) => ({ ...prev, [product.id]: 1 })); // Resetear la cantidad
  };

  return (
    <Container>
      <Typography variant="h4" className="text-center text-3xl font-semibold mb-8">
        Ordenar Productos
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <motion.div whileHover={{ scale: 1.05 }} className="transition duration-300 ease-in-out">
              <Card className="shadow-lg rounded-lg overflow-hidden">
                <Box
                  sx={{
                    width: "100%",
                    height: 200,
                    backgroundImage: `url(${product.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                  }}
                />
                <CardContent sx={{ paddingTop: "16px", textAlign: "center" }}>
                  <Typography variant="h6" fontWeight="bold">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" className="mt-2">
                    ${product.price}
                  </Typography>
                  <TextField
                    type="number"
                    label="Cantidad"
                    value={quantities[product.id] || 1}
                    onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                    sx={{ mt: 2, width: '100%' }}
                    inputProps={{ min: 1 }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => handleAddToCart(product)}
                  >
                    Agregar al Carrito
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default OrderProducts;