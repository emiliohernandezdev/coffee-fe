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
  Paper,
  Container,
} from "@mui/material";
import { Delete, Add, Remove, ShoppingCart, Payment, DeleteForever, ArrowBack } from "@mui/icons-material";
import { CartContext } from "../../context/CartContext";
import { motion } from "framer-motion";
import { apiConfig } from "../../services/ApiConfig";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const theme = useTheme();
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const truncateDescription = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        minHeight: "100vh",
        py: { xs: 4, md: 8 },
        px: { xs: 1, md: 0 },
        width: "100%",
      }}
      className="cart-bg"
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            onClick={() => navigate("/products")}
            sx={{
              color: theme.palette.primary.main,
              background: theme.palette.action.hover,
              "&:hover": { background: theme.palette.action.selected },
            }}
            aria-label="Volver a productos"
          >
            <ArrowBack />
          </IconButton>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              color: theme.palette.primary.main,
              letterSpacing: 1,
              fontSize: { xs: "1.5rem", md: "2.2rem" },
            }}
          >
            <ShoppingCart sx={{ mr: 1, fontSize: "2rem" }} />
            Tu Carrito
          </Typography>
        </Box>

        {cart.length === 0 ? (
          <Paper
            elevation={6}
            sx={{
              p: { xs: 4, md: 8 },
              textAlign: "center",
              borderRadius: 4,
              bgcolor: theme.palette.background.paper,
              mt: 8,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                mb: 2,
                color: theme.palette.text.secondary,
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              🛒 ¡Tu carrito está vacío!
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: theme.palette.text.secondary }}>
              Descubre nuestros productos y agrega tus favoritos.
            </Typography>
            <Button
              variant="contained"
              startIcon={<ShoppingCart />}
              onClick={() => navigate("/products")}
              sx={{
                px: 4,
                py: 1.2,
                borderRadius: 99,
                fontWeight: 700,
                fontSize: "1.1rem",
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: theme.palette.getContrastText(theme.palette.primary.main),
                boxShadow: 4,
                "&:hover": {
                  background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                  boxShadow: 8,
                },
              }}
            >
              Explorar Productos
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={4}>
            {/* Lista de Productos */}
            <Grid item xs={12} md={8}>
              <Paper
                elevation={6}
                sx={{
                  p: { xs: 2, md: 4 },
                  borderRadius: 4,
                  bgcolor: theme.palette.background.paper,
                  mb: 4,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    color: theme.palette.mode === "dark"
                      ? theme.palette.primary.light
                      : theme.palette.secondary.main,
                    letterSpacing: 1,
                  }}
                >
                  Productos en tu carrito
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {cart.map((item) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Paper
                        elevation={4}
                        sx={{
                          borderRadius: 3,
                          boxShadow: 3,
                          background: theme.palette.background.paper,
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          alignItems: "center",
                          p: { xs: 2, sm: 3 },
                          gap: 2,
                          border: `1.5px solid ${theme.palette.divider}`,
                          transition: "box-shadow 0.3s",
                        }}
                      >
                        {/* Imagen */}
                        <Box
                          sx={{
                            flex: "0 0 110px",
                            width: 110,
                            height: 110,
                            borderRadius: 2,
                            overflow: "hidden",
                            mr: { sm: 2, xs: 0 },
                            boxShadow: 2,
                            bgcolor: theme.palette.background.default,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <CardMedia
                            component="img"
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              borderRadius: 2,
                              border: `2px solid ${theme.palette.primary.main}`,
                            }}
                            image={`${apiConfig.imagesEndpoint.concat("products/")}${item.images[0]}`}
                            alt={item.name}
                          />
                        </Box>
                        {/* Info */}
                        <Box sx={{ flex: 1, minWidth: 0, px: { xs: 0, sm: 1 } }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 800,
                              color: theme.palette.text.primary,
                              mb: 0.5,
                              fontSize: { xs: "1.1rem", sm: "1.15rem" },
                            }}
                          >
                            {item.name}
                          </Typography>
                          {/* Extras y Opciones */}
                          {item.extras && item.extras.length > 0 && (
                            <Box sx={{ mt: 0.5 }}>
                              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                Extras:
                              </Typography>
                              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                {item.extras.map((extra) => (
                                  <Chip
                                    key={extra._id}
                                    label={extra.name}
                                    size="small"
                                    sx={{
                                      bgcolor: "transparent",
                                      color: theme.palette.text.primary,
                                      fontWeight: 600,
                                      border: `1px solid ${theme.palette.divider}`,
                                    }}
                                  />
                                ))}
                              </Box>
                            </Box>
                          )}
                          {item.options && item.options.length > 0 && (
                            <Box sx={{ mt: 0.5 }}>
                              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                Opciones:
                              </Typography>
                              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                {item.options.map((option) => (
                                  <Chip
                                    key={option._id}
                                    label={option.name}
                                    size="small"
                                    sx={{
                                      bgcolor: "transparent",
                                      color: theme.palette.text.primary,
                                      fontWeight: 600,
                                      border: `1px solid ${theme.palette.divider}`,
                                    }}
                                  />
                                ))}
                              </Box>
                            </Box>
                          )}
                        </Box>
                        {/* Cantidad y Precio */}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 1,
                            minWidth: 90,
                            mt: { xs: 2, sm: 0 },
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              borderRadius: 2,
                              px: 0,
                              py: 0,
                              bgcolor: "transparent", // Sin fondo
                            }}
                          >
                            <IconButton
                              onClick={() => updateQuantity(item._id, item.quantity - 1)}
                              size="small"
                              aria-label="Reducir cantidad"
                              disabled={item.quantity <= 1}
                              sx={{
                                color: theme.palette.primary.main,
                                bgcolor: "transparent",
                                "&:hover": { bgcolor: theme.palette.action.hover },
                              }}
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
                              inputProps={{
                                min: 1,
                                style: {
                                  textAlign: "center",
                                  fontWeight: 700,
                                  fontSize: "1.1rem",
                                  color: theme.palette.text.primary,
                                  background: "transparent",
                                },
                              }}
                              sx={{
                                width: 48,
                                mx: 0.5,
                                "& fieldset": { border: "none" },
                                "& input": {
                                  textAlign: "center",
                                  fontWeight: 700,
                                  fontSize: "1.1rem",
                                  color: theme.palette.text.primary,
                                  bgcolor: "transparent",
                                  p: 0,
                                },
                                background: "transparent",
                              }}
                              aria-label="Cantidad"
                              size="small"
                            />
                            <IconButton
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              size="small"
                              aria-label="Aumentar cantidad"
                              sx={{
                                color: theme.palette.primary.main,
                                bgcolor: "transparent",
                                "&:hover": { bgcolor: theme.palette.action.hover },
                              }}
                            >
                              <Add />
                            </IconButton>
                          </Box>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 800,
                              color: theme.palette.text.primary,
                              fontSize: "1.1rem",
                              mt: 1,
                            }}
                          >
                            Q{(item.price * item.quantity).toFixed(2)}
                          </Typography>
                          <IconButton
                            onClick={() => removeFromCart(item._id)}
                            sx={{
                              color: theme.palette.error.main,
                              mt: 1,
                              bgcolor: theme.palette.error.main + "10", // muy ligero
                              "&:hover": {
                                bgcolor: theme.palette.error.main + "22",
                                color: "#fff",
                              },
                              transition: "background 0.2s",
                            }}
                            aria-label="Eliminar producto"
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </Paper>
                    </motion.div>
                  ))}
                </Box>
              </Paper>
            </Grid>
            {/* Resumen del Carrito */}
            <Grid item xs={12} md={4}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <Paper
                  elevation={8}
                  sx={{
                    borderRadius: 4,
                    p: { xs: 3, md: 4 },
                    bgcolor: theme.palette.background.paper,
                    position: "sticky",
                    top: { md: 32, xs: 0 },
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, color: theme.palette.primary.main }}>
                    Resumen del Carrito
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                    <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                      Subtotal:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                      Q{total.toFixed(2)}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                    <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                      Total:
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
                      Q{total.toFixed(2)}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<Payment />}
                    sx={{
                      mb: 2,
                      px: 3,
                      py: 1.2,
                      borderRadius: 99,
                      fontWeight: 700,
                      fontSize: "1.08rem",
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      color: theme.palette.getContrastText(theme.palette.primary.main),
                      boxShadow: 4,
                      "&:hover": {
                        background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                        boxShadow: 8,
                      },
                    }}
                    aria-label="Proceder al pago"
                    onClick={() => navigate("/checkout")}
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
                      borderRadius: 99,
                      fontWeight: 700,
                      "&:hover": { borderColor: theme.palette.error.dark, background: theme.palette.action.hover },
                    }}
                    aria-label="Vaciar carrito"
                  >
                    Vaciar Carrito
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