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
} from "@mui/material";
import { Delete, Add, Remove, ShoppingCart, Payment, DeleteForever } from "@mui/icons-material";
import { CartContext } from "../../context/CartContext";

const CartPage = () => {
  const theme = useTheme(); 
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-8">
      {/* Título */}
      <Typography variant="h4" className="text-center mb-8 font-bold">
        <ShoppingCart className="mr-2" /> Tu Carrito
      </Typography>

      {/* Lista de Productos en el Carrito */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {cart.length === 0 ? (
            <Typography variant="body1" className="text-center">
              Tu carrito está vacío.
            </Typography>
          ) : (
            cart.map((item) => (
              <Card key={item.id} className="mb-4 shadow-lg">
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    {/* Imagen del Producto */}
                    <Grid item xs={4} md={3}>
                      <img
                        src={item.images[0]} // Mostrar la primera imagen del producto
                        alt={item.name}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    </Grid>

                    {/* Nombre y Descripción */}
                    <Grid item xs={8} md={5}>
                      <Typography variant="h6" className="font-bold">
                        {item.name}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        {item.description}
                      </Typography>
                    </Grid>

                    {/* Cantidad */}
                    <Grid item xs={6} md={2}>
                      <div className="flex items-center">
                        <IconButton
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          size="small"
                          aria-label="Reducir cantidad"
                        >
                          <Remove />
                        </IconButton>
                        <TextField
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.id, parseInt(e.target.value))
                          }
                          type="number"
                          inputProps={{ min: 1 }}
                          className="w-16 text-center"
                          aria-label="Cantidad"
                        />
                        <IconButton
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          size="small"
                          aria-label="Aumentar cantidad"
                        >
                          <Add />
                        </IconButton>
                      </div>
                    </Grid>

                    {/* Precio y Eliminar */}
                    <Grid item xs={6} md={2}>
                      <Typography variant="body1" className="font-bold">
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
            ))
          )}
        </Grid>

        {/* Resumen del Carrito */}
        <Grid item xs={12} md={4}>
          <Card className="shadow-lg">
            <CardContent>
              <Typography variant="h6" className="font-bold mb-4">
                Resumen del Carrito
              </Typography>

              {/* Subtotal */}
              <div className="flex justify-between mb-2">
                <Typography variant="body1">Subtotal:</Typography>
                <Typography variant="body1" className="font-bold">
                  ${total.toFixed(2)}
                </Typography>
              </div>

              {/* Impuestos (ejemplo) */}
              <div className="flex justify-between mb-2">
                <Typography variant="body1">Impuestos:</Typography>
                <Typography variant="body1" className="font-bold">
                  ${(total * 0.15).toFixed(2)} {/* 15% de impuestos */}
                </Typography>
              </div>

              {/* Total */}
              <div className="flex justify-between mb-4">
                <Typography variant="body1">Total:</Typography>
                <Typography variant="body1" className="font-bold">
                  ${(total * 1.15).toFixed(2)} {/* Subtotal + impuestos */}
                </Typography>
              </div>

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
        </Grid>
      </Grid>
    </div>
  );
};

export default CartPage;