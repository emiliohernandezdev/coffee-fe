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
  InputAdornment
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
  ShoppingBag
} from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";

const steps = [
  { label: "Información de Recogida", icon: <Store /> },
  { label: "Método de Pago", icon: <LocalAtm /> },
  { label: "Revisar Pedido", icon: <Receipt /> },
  { label: "Confirmación", icon: <CheckCircle /> },
];

const CheckoutPage = () => {
  const theme = useTheme();
  const { user } = useContext(AuthContext);
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("efectivo");
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

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
        return <Typography variant="h6">Resumen del Pedido</Typography>;
      case 3:
        return <Typography variant="h6">¡Gracias por tu compra! Tu pedido ha sido confirmado.</Typography>;
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
