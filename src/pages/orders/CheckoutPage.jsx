import React, { useState, useContext } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  useTheme,
  InputAdornment,
  Box,
  IconButton,
  Chip,
} from "@mui/material";
import {
  LocalShipping,
  CreditCard,
  Receipt,
  CheckCircle,
  Store,
  LocalAtm,
  ArrowBack,
  ArrowForward,
  ErrorOutline,
  Person,
  Email,
  Phone,
  Restaurant,
  ShoppingBag,
  Delete,
  Add,
  Remove,
} from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import { v4 as uuidv4 } from "uuid";
import * as Yup from 'yup';

const steps = [
  { label: "Información de Recogida", icon: <Store /> },
  { label: "Método de Pago", icon: <LocalAtm /> },
  { label: "Revisar Pedido", icon: <Receipt /> },
  { label: "Confirmación", icon: <CheckCircle /> },
];

const CheckoutPage = () => {
  const theme = useTheme();
  const { user } = useContext(AuthContext);
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("efectivo");
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [orderId] = useState(uuidv4());

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              {!user && (
                <>
                  <TextField
                    fullWidth
                    label="Nombre Completo"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Correo Electrónico"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                  />
                </>
              )}
              <TextField
                fullWidth
                label="Teléfono"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Card className="shadow-lg">
                <CardContent>
                  <Typography variant="body1" gutterBottom>
                    ¿Cómo prefieres recoger tu pedido?
                  </Typography>
                  <RadioGroup defaultValue="local">
                    <FormControlLabel
                      value="local"
                      control={<Radio />}
                      label={
                        <>
                          <Restaurant style={{ marginRight: 8 }} /> Comer en el local
                        </>
                      }
                    />
                    <FormControlLabel
                      value="recoger"
                      control={<Radio />}
                      label={
                        <>
                          <ShoppingBag style={{ marginRight: 8 }} /> Pasar a recoger
                        </>
                      }
                    />
                  </RadioGroup>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <FormControlLabel
              value="efectivo"
              control={<Radio />}
              label={
                <>
                  <LocalAtm style={{ marginRight: 8 }} /> Efectivo en el local
                </>
              }
            />
            <FormControlLabel
              value="tarjeta"
              control={<Radio />}
              label={
                <>
                  <CreditCard style={{ marginRight: 8 }} /> Tarjeta en el local
                </>
              }
            />
          </RadioGroup>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Resumen del Pedido
            </Typography>
            {cart.map((item) => (
              <Card key={item._id} sx={{ mb: 2, boxShadow: 3 }}>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={8}>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {item.description}
                      </Typography>
                      {item.extras && item.extras.length > 0 && (
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" color="textSecondary">
                            Extras:
                          </Typography>
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                            {item.extras.map((extra) => (
                              <Chip key={extra._id} label={extra.name} size="small" />
                            ))}
                          </Box>
                        </Box>
                      )}
                      {item.options && item.options.length > 0 && (
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" color="textSecondary">
                            Opciones:
                          </Typography>
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                            {item.options.map((option) => (
                              <Chip key={option._id} label={option.name} size="small" />
                            ))}
                          </Box>
                        </Box>
                      )}
                    </Grid>
                    <Grid item xs={4} sx={{ textAlign: "right" }}>
                      <Typography variant="body1" sx={{ fontWeight: 700 }}>
                        Q{(item.price * item.quantity).toFixed(2)}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                        <IconButton
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          size="small"
                          disabled={item.quantity <= 1}
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
                          sx={{ width: "60px", textAlign: "center" }}
                        />
                        <IconButton
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          size="small"
                        >
                          <Add />
                        </IconButton>
                      </Box>
                      <IconButton
                        onClick={() => removeFromCart(item._id)}
                        sx={{ color: theme.palette.error.main }}
                      >
                        <Delete />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
            <Typography variant="h6" sx={{ mt: 4, textAlign: "right" }}>
              Total: Q{total.toFixed(2)}
            </Typography>
          </Box>
        );
      case 3:
        return (
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ mb: 4 }}>
              ¡Gracias por tu compra! Tu pedido ha sido confirmado.
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Escanea el siguiente código QR para verificar tu pedido:
            </Typography>
            
            <Typography variant="body2" sx={{ mt: 2, color: theme.palette.text.secondary }}>
              ID de la orden: {orderId}
            </Typography>
          </Box>
        );
      default:
        return "Paso desconocido";
    }
  };

  const getStepStatus = (index) => {
    if (index < activeStep) {
      return { color: theme.palette.success.main, icon: <CheckCircle /> };
    }
    if (index === activeStep) {
      return { color: theme.palette.primary.main, icon: steps[index].icon };
    }
    return { color: theme.palette.grey[400], icon: steps[index].icon };
  };

  return (
    <div className="p-8">
      <Typography variant="h4" align="center" gutterBottom>
        Finalizar Compra
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          return (
            <Step key={step.label}>
              <StepLabel
                icon={
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-full"
                    style={{ backgroundColor: status.color, color: theme.palette.common.white }}
                  >
                    {status.icon}
                  </div>
                }
              >
                {step.label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <Card className="shadow-lg mt-12">
        <CardContent>{getStepContent(activeStep)}</CardContent>
      </Card>

      <div className="flex justify-between mt-8">
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          Anterior
        </Button>
        <Button variant="contained" endIcon={<ArrowForward />} onClick={handleNext}>
          {activeStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
        </Button>
      </div>
    </div>
  );
};

export default CheckoutPage;