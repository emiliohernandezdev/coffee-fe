import React, { useContext } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
  TextField,
  Button,
  useTheme,
  Divider,
  Box,
} from "@mui/material";
import { Delete, Add, Remove, ShoppingCart, Payment, DeleteForever, LocalShipping, LocalOffer } from "@mui/icons-material";
import { CartContext } from "../../context/CartContext";
import { motion } from "framer-motion";

const CartPage = () => {
  const theme = useTheme();
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = total * 0.15; // 15% de impuestos
  const shipping = 5.99; // Costo de envío fijo
  const grandTotal = total + tax + shipping;

  return (
    <div className="p-8">
      {/* Título */}
      <Typography variant="h4" className="text-center mb-8 font-bold" style={{ color: theme.palette.text.primary }}>
        <ShoppingCart className="mr-2" /> Tu Carrito
      </Typography>

      {/* Contenido Principal */}
      {cart.length === 0 ? (
        <Box className="text-center">
          <Typography variant="h5" className="mb-4" style={{ color: theme.palette.text.secondary }}>
            Tu carrito está vacío.
          </Typography>
          <Button
            variant="contained"
            className="mt-4"
            startIcon={<LocalOffer />}
            sx={{
              backgroundColor: theme.palette.primary.main,
              "&:hover": { backgroundColor: theme.palette.primary.dark },
            }}
          >
            Explorar Productos
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {/* Lista de Productos en el Carrito */}
          <Grid item xs={12} md={8}>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="mb-4 shadow-lg" style={{ backgroundColor: theme.palette.background.paper }}>
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      {/* Imagen del Producto */}
                      <Grid item xs={4} md={3}>
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                      </Grid>

                      {/* Nombre y Descripción */}
                      <Grid item xs={8} md={5}>
                        <Typography variant="h6" className="font-bold" style={{ color: theme.palette.text.primary }}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" style={{ color: theme.palette.text.secondary }}>
                          {item.description}
                        </Typography>
                      </Grid>

                      {/* Cantidad */}
                      <Grid item xs={6} md={2}>
                        <div className="flex items-center">
                          <IconButton
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            size="small"
                            aria-label="Reducir cantidad"
                          >
                            <Remove />
                          </IconButton>
                          <TextField
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                            type="number"
                            inputProps={{ min: 1 }}
                            className="w-16 text-center"
                            aria-label="Cantidad"
                          />
                          <IconButton
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            size="small"
                            aria-label="Aumentar cantidad"
                          >
                            <Add />
                          </IconButton>
                        </div>
                      </Grid>

                      {/* Precio y Eliminar */}
                      <Grid item xs={6} md={2}>
                        <Typography variant="body1" className="font-bold" style={{ color: theme.palette.text.primary }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                        <IconButton
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500"
                          aria-label="Eliminar producto"
                        >
                          <Delete />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Grid>

          {/* Resumen del Carrito */}
          <Grid item xs={12} md={4}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Card className="shadow-lg" style={{ backgroundColor: theme.palette.background.paper }}>
                <CardContent>
                  <Typography variant="h6" className="font-bold mb-4" style={{ color: theme.palette.text.primary }}>
                    Resumen del Carrito
                  </Typography>

                  {/* Subtotal */}
                  <Box className="flex justify-between mb-2">
                    <Typography variant="body1" style={{ color: theme.palette.text.secondary }}>
                      Subtotal:
                    </Typography>
                    <Typography variant="body1" className="font-bold" style={{ color: theme.palette.text.primary }}>
                      ${total.toFixed(2)}
                    </Typography>
                  </Box>

                  {/* Impuestos */}
                  <Box className="flex justify-between mb-2">
                    <Typography variant="body1" style={{ color: theme.palette.text.secondary }}>
                      Impuestos:
                    </Typography>
                    <Typography variant="body1" className="font-bold" style={{ color: theme.palette.text.primary }}>
                      ${tax.toFixed(2)}
                    </Typography>
                  </Box>

                  {/* Envío */}
                  <Box className="flex justify-between mb-2">
                    <Typography variant="body1" style={{ color: theme.palette.text.secondary }}>
                      Envío:
                    </Typography>
                    <Typography variant="body1" className="font-bold" style={{ color: theme.palette.text.primary }}>
                      ${shipping.toFixed(2)}
                    </Typography>
                  </Box>

                  <Divider className="my-4" />

                  {/* Total */}
                  <Box className="flex justify-between mb-4">
                    <Typography variant="body1" style={{ color: theme.palette.text.secondary }}>
                      Total:
                    </Typography>
                    <Typography variant="body1" className="font-bold" style={{ color: theme.palette.text.primary }}>
                      ${grandTotal.toFixed(2)}
                    </Typography>
                  </Box>

                  {/* Botones */}
                  <Button
                    variant="contained"
                    fullWidth
                    className="mb-2"
                    startIcon={<Payment />}
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      "&:hover": { backgroundColor: theme.palette.primary.dark },
                    }}
                    aria-label="Proceder al pago"
                  >
                    Checkout
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={clearCart}
                    startIcon={<DeleteForever />}
                    sx={{
                      color: theme.palette.error.main,
                      borderColor: theme.palette.error.main,
                      "&:hover": { borderColor: theme.palette.error.dark },
                    }}
                    aria-label="Vaciar carrito"
                  >
                    Vaciar Carrito
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      )}

      {/* Productos Destacados */}
      <Typography variant="h5" className="font-bold mt-8 mb-4" style={{ color: theme.palette.text.primary }}>
        Productos Destacados
      </Typography>
      <Grid container spacing={4}>
        {[1, 2, 3, 4].map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item}>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Card className="shadow-lg" style={{ backgroundColor: theme.palette.background.paper }}>
                <CardContent className="text-center">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Producto Recomendado"
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <Typography variant="body1" className="font-bold" style={{ color: theme.palette.text.primary }}>
                    Café Recomendado {item}
                  </Typography>
                  <Typography variant="body2" style={{ color: theme.palette.text.secondary }}>
                    $10.00
                  </Typography>
                  <Button
                    variant="outlined"
                    className="mt-2"
                    startIcon={<LocalOffer />}
                    sx={{
                      color: theme.palette.primary.main,
                      borderColor: theme.palette.primary.main,
                      "&:hover": { borderColor: theme.palette.primary.dark },
                    }}
                  >
                    Añadir al Carrito
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CartPage;