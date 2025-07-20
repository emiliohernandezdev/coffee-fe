import React from "react";
import {
  Grid,
  Typography,
  IconButton,
  TextField,
  Button,
  useTheme,
  Divider,
  Box,
  CardMedia,
  Paper,
  Container,
  Stack,
  Badge,
  Chip
} from "@mui/material";
import { 
  DeleteForever, 
  Add, 
  Remove, 
  ShoppingCart, 
  Payment, 
  ArrowBack,
  Close,
  EmojiFoodBeverage
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { apiConfig } from "../../services/ApiConfig";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../stores/CartStore";

const CartPage = () => {
  const theme = useTheme();
  const cart = useCartStore(state => state.cart);
  const clearCart = useCartStore(state => state.clearCart);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const updateQuantity = useCartStore(state => state.updateQuantity);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  const handleQuantityChange = (cartItemId, newQuantity) => {
    const qty = Math.max(1, newQuantity);
    updateQuantity(cartItemId, qty);
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        minHeight: '100vh',
        py: { xs: 3, md: 6 },
        px: { xs: 2, md: 0 }
      }}
    >
      <Container maxWidth="lg">
        {/* Encabezado */}
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              color: 'primary.main',
              bgcolor: 'action.hover',
              '&:hover': { bgcolor: 'action.selected' }
            }}
          >
            <ArrowBack />
          </IconButton>
          
          <Badge badgeContent={cart.length} color="primary" showZero>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <ShoppingCart fontSize="large" />
              Mi Carrito
            </Typography>
          </Badge>
        </Stack>

        {cart.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: 'center',
              borderRadius: 4,
              bgcolor: 'background.paper',
              border: `1px dashed ${theme.palette.divider}`,
              mt: 4
            }}
          >
            <EmojiFoodBeverage 
              sx={{ 
                fontSize: 80, 
                color: 'text.disabled',
                mb: 3 
              }} 
            />
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 600,
                mb: 2,
                color: 'text.primary'
              }}
            >
              Tu carrito está vacío
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 4,
                color: 'text.secondary',
                maxWidth: 400,
                mx: 'auto'
              }}
            >
              Explora nuestro menú y descubre deliciosas opciones para agregar a tu pedido
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/menu')}
              startIcon={<Add />}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600
              }}
            >
              Ver Menú
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {/* Lista de Productos */}
            <Grid item xs={12} md={8}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: 'background.paper'
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                  <Typography variant="h6" fontWeight={600}>
                    Productos ({cart.length})
                  </Typography>
                  <Button
                    onClick={clearCart}
                    startIcon={<DeleteForever />}
                    sx={{ color: 'error.main' }}
                  >
                    Vaciar todo
                  </Button>
                </Stack>
                
                <Divider sx={{ mb: 3 }} />

                <Stack spacing={3}>
                  {cart.map((item) => (
                    <motion.div
                      key={item.cartItemId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          border: '1px solid',
                          borderColor: 'divider',
                          display: 'flex',
                          gap: 2,
                          position: 'relative'
                        }}
                      >
                        {/* Imagen del producto */}
                        <Box
                          sx={{
                            width: 100,
                            height: 100,
                            borderRadius: 2,
                            overflow: 'hidden',
                            flexShrink: 0,
                            bgcolor: 'background.default'
                          }}
                        >
                          {item.images?.[0] && (
                            <CardMedia
                              component="img"
                              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              image={`${apiConfig.imagesEndpoint}products/${item.images[0]}`}
                              alt={item.name}
                            />
                          )}
                        </Box>

                        {/* Detalles del producto */}
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography variant="subtitle1" fontWeight={600} noWrap>
                            {item.name}
                          </Typography>
                          
                          {/* Opciones seleccionadas */}
                          {item.selectedOptions?.length > 0 && (
                            <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {item.selectedOptions.map((option, idx) => (
                                <Chip
                                  key={idx}
                                  label={`${option.name}: ${option.values}`}
                                  size="small"
                                  sx={{ 
                                    bgcolor: 'primary.light', 
                                    color: 'primary.contrastText',
                                    fontSize: '0.75rem'
                                  }}
                                />
                              ))}
                            </Box>
                          )}
                          
                          {/* Descripción (opcional) */}
                          <Typography variant="body2" color="text.secondary" mt={1}>
                            {item.description.substring(0, 60)}...
                          </Typography>
                          
                          {/* Precio unitario */}
                          <Typography variant="body2" color="text.secondary" mt={1}>
                            Q{item.price.toFixed(2)} c/u
                          </Typography>
                        </Box>

                        {/* Controles de cantidad y precio */}
                        <Stack 
                          spacing={1} 
                          alignItems="flex-end" 
                          justifyContent="space-between"
                        >
                          <IconButton
                            onClick={() => removeFromCart(item.cartItemId)}
                            size="small"
                            sx={{ color: 'error.main' }}
                          >
                            <Close fontSize="small" />
                          </IconButton>
                          
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <IconButton
                              onClick={() => handleQuantityChange(item.cartItemId, item.quantity - 1)}
                              size="small"
                              disabled={item.quantity <= 1}
                            >
                              <Remove fontSize="small" />
                            </IconButton>
                            
                            <TextField
                              value={item.quantity}
                              onChange={(e) => {
                                const newQty = parseInt(e.target.value);
                                if (!isNaN(newQty)) {
                                  handleQuantityChange(item.cartItemId, newQty);
                                }
                              }}
                              type="number"
                              inputProps={{ min: 1 }}
                              sx={{
                                width: 60,
                                '& .MuiInputBase-input': {
                                  textAlign: 'center',
                                  py: 0.5
                                }
                              }}
                            />
                            
                            <IconButton
                              onClick={() => handleQuantityChange(item.cartItemId, item.quantity + 1)}
                              size="small"
                            >
                              <Add fontSize="small" />
                            </IconButton>
                          </Stack>
                          
                          <Typography fontWeight={700}>
                            Q{(item.price * item.quantity).toFixed(2)}
                          </Typography>
                        </Stack>
                      </Paper>
                    </motion.div>
                  ))}
                </Stack>
              </Paper>
            </Grid>

            {/* Resumen del Pedido */}
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    bgcolor: 'background.paper',
                    position: 'sticky',
                    top: 20
                  }}
                >
                  <Typography variant="h6" fontWeight={600} mb={2}>
                    Resumen del Pedido
                  </Typography>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Stack spacing={1.5} mb={3}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography color="text.secondary">Subtotal:</Typography>
                      <Typography>Q{total.toFixed(2)}</Typography>
                    </Stack>
                    
                    <Stack direction="row" justifyContent="space-between">
                      <Typography color="text.secondary">Envío:</Typography>
                      <Typography>Gratis</Typography>
                    </Stack>
                    
                    <Stack direction="row" justifyContent="space-between">
                      <Typography color="text.secondary">Descuentos:</Typography>
                      <Typography>Q0.00</Typography>
                    </Stack>
                  </Stack>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Stack direction="row" justifyContent="space-between" mb={3}>
                    <Typography fontWeight={600}>Total:</Typography>
                    <Typography variant="h6" fontWeight={700}>
                      Q{total.toFixed(2)}
                    </Typography>
                  </Stack>
                  
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={() => navigate('/checkout')}
                    startIcon={<Payment />}
                    sx={{ mb: 2 }}
                  >
                    Proceder al Pago
                  </Button>
                  
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => navigate('/menu')}
                    startIcon={<Add />}
                  >
                    Seguir Comprando
                  </Button>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default CartPage;