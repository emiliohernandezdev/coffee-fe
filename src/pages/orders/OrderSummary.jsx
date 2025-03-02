import React, { useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

const OrderSummary = () => {
  const total = 500;
  const [cart, setCart] = useState([]);

  const clearCart = () =>{

  };

  return (
    <Container>
      <Typography variant="h4" className="text-center text-3xl font-semibold mb-8">
        Resumen de la Orden
      </Typography>
      <List>
        {cart.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={`${item.name} - ${item.quantity} x $${item.price}`}
              secondary={`Total: $${item.price * item.quantity}`}
            />
            <Button
              variant="outlined"
              color="error"
              onClick={() => removeFromCart(item.id)}
            >
              Eliminar
            </Button>
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" className="text-right mt-4">
        Total: ${total}
      </Typography>
      <Button
        variant="contained"
        color="error"
        sx={{ mt: 2 }}
        onClick={clearCart}
      >
        Vaciar Carrito
      </Button>
    </Container>
  );
};

export default OrderSummary;