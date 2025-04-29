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
  CardMedia,
  Chip,
} from "@mui/material";
import { Delete, Add, Remove, ShoppingCart, Payment, DeleteForever } from "@mui/icons-material";
import { CartContext } from "../../context/CartContext";
import { motion } from "framer-motion";
import { apiConfig } from "../../services/ApiConfig";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const theme = useTheme();
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Calcular el total del carrito
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Truncar la descripción
  const truncateDescription = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Título */}
      <Typography variant="h4" sx={{ textAlign: "center", mb: 4, fontWeight: 700, color: theme.palette.text.primary }}>
        <ShoppingCart sx={{ mr: 2 }} /> Tu Carrito
      </Typography>

      {/* Contenido Principal */}
      {cart.length === 0 ? (
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h5" sx={{ mb: 4, color: theme.palette.text.secondary }}>
            Tu carrito está vacío.
          </Typography>
          <Button
            variant="contained"
            startIcon={<ShoppingCart />}
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
                key={item._id} // Usar _id como clave única
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card sx={{ mb: 4, borderRadius: "12px", boxShadow: 3, backgroundColor: theme.palette.background.paper }}>
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      {/* Imagen del Producto */}
                      <Grid item xs={4} md={3}>
                        <CardMedia
                          component="img"
                          sx={{ width: "100%", height: 120, objectFit: "cover", borderRadius: "8px" }}
                          image={`${apiConfig.imagesEndpoint.concat('products/')}${item.images[0]}`}
                          alt={item.name}
                        />
                      </Grid>

                      {/* Nombre y Descripción */}
                      <Grid item xs={8} md={5}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                          {truncateDescription(item.description, 50)} {/* Truncar la descripción */}
                        </Typography>
                        {/* Mostrar Extras y Opciones */}
                        {item.extras && item.extras.length > 0 && (
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                              Extras:
                            </Typography>
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                              {item.extras.map((extra, index) => (
                                <Chip key={extra._id} label={extra.name} size="small" />
                              ))}
                            </Box>
                          </Box>
                        )}
                        {item.options && item.options.length > 0 && (
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                              Opciones:
                            </Typography>
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                              {item.options.map((option, index) => (
                                <Chip key={option._id} label={option.name} size="small" />
                              ))}
                            </Box>
                          </Box>
                        )}
                      </Grid>

                      {/* Cantidad */}
                      <Grid item xs={6} md={2}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <IconButton
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            size="small"
                            aria-label="Reducir cantidad"
                            disabled={item.quantity <= 1} // Deshabilitar si la cantidad es 1
                            sx={{ color: theme.palette.primary.main }}
                          >
                            <Remove />
                          </IconButton>
                          <TextField
                            value={item.quantity}
                            onChange={(e) => {
                              const newQuantity = parseInt(e.target.value);
                              if (!isNaN(newQuantity) && newQuantity >= 1) {
                                updateQuantity(item._id, newQuantity);
                              }
                            }}
                            type="number"
                            inputProps={{ min: 1 }}
                            sx={{ width: "80px", textAlign: "center" }}
                            aria-label="Cantidad"
                          />
                          <IconButton
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            size="small"
                            aria-label="Aumentar cantidad"
                            sx={{ color: theme.palette.primary.main }}
                          >
                            <Add />
                          </IconButton>
                        </Box>
                      </Grid>

                      {/* Precio y Eliminar */}
                      <Grid item xs={6} md={2}>
                        <Typography variant="body1" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                          Q{(item.price * item.quantity).toFixed(2)} {/* Precio en quetzales */}
                        </Typography>
                        <IconButton
                          onClick={() => removeFromCart(item._id)}
                          sx={{ color: theme.palette.error.main }}
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
              <Card sx={{ borderRadius: "12px", boxShadow: 3, backgroundColor: theme.palette.background.paper }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 4, color: theme.palette.text.primary }}>
                    Resumen del Carrito
                  </Typography>

                  {/* Subtotal */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                    <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                      Subtotal:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                      Q{total.toFixed(2)} {/* Precio en quetzales */}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* Total */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
                    <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                      Total:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                      Q{total.toFixed(2)} {/* Precio en quetzales */}
                    </Typography>
                  </Box>

                  {/* Botones */}
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<Payment />}
                    sx={{
                      mb: 2,
                      backgroundColor: theme.palette.primary.main,
                      "&:hover": { backgroundColor: theme.palette.primary.dark },
                    }}
                    aria-label="Proceder al pago"
                    onClick={handleProceedToCheckout}
                  >
                    Proceder al Pago
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
    </Box>
  );
};

export default CartPage;