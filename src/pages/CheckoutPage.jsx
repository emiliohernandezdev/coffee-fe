import { useState } from 'react';
import { Container, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, Divider, Fab, Card, CardContent } from '@mui/material';
import { ShoppingCart, AttachMoney, CreditCard, CheckCircle } from '@mui/icons-material';
import { Stepper, Step, StepLabel } from '@mui/material';

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [orderType, setOrderType] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleOrderTypeChange = (e) => {
    setOrderType(e.target.value);
  };

  const handleAgreementChange = (e) => {
    setIsAgreed(e.target.checked);
  };

  const handleCheckout = () => {
    console.log('Compra procesada');
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const orderSummary = [
    { name: 'Café Espresso', quantity: 2, price: 4.5, img: 'https://images.unsplash.com/photo-1592335753914-c1e8c2e05d29' },
    { name: 'Pizza Margherita', quantity: 1, price: 9.99, img: 'https://images.unsplash.com/photo-1603703433114-24fa62799b6e' },
    { name: 'Hamburguesa Clásica', quantity: 1, price: 6.5, img: 'https://images.unsplash.com/photo-1512440601431-340034d7fdf2' },
  ];

  const calculateTotal = () => {
    const subtotal = orderSummary.reduce((total, item) => total + item.price * item.quantity, 0);
    const tax = subtotal * 0.1;
    return { subtotal, tax, total: subtotal + tax };
  };

  const { subtotal, tax, total } = calculateTotal();

  const steps = ['Carrito', 'Método de Pago', 'Confirmación'];

  return (
    <div className="bg-background-dark dark:bg-background-light text-text-dark dark:text-text-light">
      <section className="py-16 flex justify-center items-center min-h-screen">
        <Container maxWidth="sm">
          <Card className="p-6 shadow-xl rounded-xl bg-card-light dark:bg-card-dark">
            <Typography variant="h4" className="text-center text-3xl font-semibold mb-8">
              Checkout - Finaliza tu Pedido
            </Typography>

            <Stepper activeStep={activeStep} alternativeLabel className="mb-8">
              {steps.map((label, index) => (
                <Step key={index}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {activeStep === 0 && (
              <Grid container spacing={4}>
                <Grid item xs={12} md={7}>
                  <Typography variant="h6" className="font-semibold mb-4">Resumen del Carrito</Typography>
                  {orderSummary.map((item, index) => (
                    <Grid container key={index} justifyContent="space-between" alignItems="center" className="mb-3">
                      <Grid item xs={3}>
                        <img src={item.img} alt={item.name} className="w-full h-[80px] object-cover rounded-md" />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1">{item.name} x {item.quantity}</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="body2">${(item.price * item.quantity).toFixed(2)}</Typography>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>

                <Grid item xs={12} md={5}>
                  <Typography variant="h6" className="font-semibold mb-4">Desglose de Precios</Typography>
                  <Grid container justifyContent="space-between" className="mb-3">
                    <Grid item>
                      <Typography variant="body1">Subtotal</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="space-between" className="mb-3">
                    <Grid item>
                      <Typography variant="body1">Impuestos (10%)</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">${tax.toFixed(2)}</Typography>
                    </Grid>
                  </Grid>
                  <Divider className="my-4" />
                  <Grid container justifyContent="space-between" className="mb-4">
                    <Grid item>
                      <Typography variant="h6">Total</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">${total.toFixed(2)}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}

            {activeStep === 1 && (
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Typography variant="h6" className="font-semibold mb-4">Selecciona el Método de Pago</Typography>
                  <FormControl fullWidth className="mb-6">
                    <InputLabel>Método de Pago</InputLabel>
                    <Select
                      value={paymentMethod}
                      onChange={handlePaymentChange}
                      label="Método de Pago"
                    >
                      <MenuItem value="cash">
                        <AttachMoney sx={{ mr: 1 }} />
                        Efectivo (en el lugar)
                      </MenuItem>
                      <MenuItem value="card">
                        <CreditCard sx={{ mr: 1 }} />
                        Tarjeta (en el lugar)
                      </MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth className="mb-6">
                    <InputLabel>¿Cómo deseas recibir tu pedido?</InputLabel>
                    <Select
                      value={orderType}
                      onChange={handleOrderTypeChange}
                      label="¿Cómo deseas recibir tu pedido?"
                    >
                      <MenuItem value="eat-in">Comer en el lugar</MenuItem>
                      <MenuItem value="take-away">Para llevar</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControlLabel
                    control={<Checkbox checked={isAgreed} onChange={handleAgreementChange} />}
                    label={<span className="text-sm">Acepto los <a href="/terms" className="text-indigo-500">términos y condiciones</a></span>}
                    className="mb-6"
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={!isAgreed}
                    onClick={handleNext}
                  >
                    Confirmar y Continuar
                  </Button>
                </Grid>
              </Grid>
            )}

            {activeStep === 2 && (
              <Grid container justifyContent="center" className="mt-8">
                <CheckCircle sx={{ fontSize: 80, color: 'green', marginBottom: 2 }} />
                <Typography variant="h5" className="font-semibold">¡Compra Realizada con Éxito!</Typography>
                <Typography variant="body1" className="mt-4">Tu pedido ha sido procesado y estará listo pronto. ¡Gracias por comprar con nosotros!</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => console.log('Redirigiendo a inicio')}
                >
                  Volver al Inicio
                </Button>
              </Grid>
            )}
          </Card>
        </Container>
      </section>

      <Fab
        variant="extended"
        color="primary"
        aria-label="Ver Carrito"
        sx={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 1000,
          backgroundColor: '#FF5733',
          color: 'white',
        }}
      >
        <ShoppingCart sx={{ mr: 1 }} />
        Ver Carrito
      </Fab>
    </div>
  );
};

export default CheckoutPage;
