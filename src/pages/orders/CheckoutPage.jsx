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
  Paper,
  Divider,
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
  Person,
  Email,
  Phone,
  Restaurant,
  ShoppingBag,
  Delete,
  Add,
  Remove,
} from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import { apiConfig } from "../../services/ApiConfig";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { OrderService } from "../../services/OrderService";
import { useCartStore } from "../../stores/CartStore";
import { useAuthStore } from "../../stores/AuthStore";

const steps = [
  { label: "Recogida", icon: <Store /> },
  { label: "Pago", icon: <LocalAtm /> },
  { label: "Revisar", icon: <Receipt /> },
  { label: "Confirmación", icon: <CheckCircle /> },
];

const datosSchema = Yup.object().shape({
  name: Yup.string().required("Nombre requerido"),
  email: Yup.string().email("Correo inválido").required("Correo requerido"),
  phone: Yup.string().required("Teléfono requerido"),
});

const CheckoutPage = () => {
  const theme = useTheme();
  const user = useAuthStore();
  const cart = useCartStore(state => state.cart);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const updateQuantity = useCartStore(state => state.updateQuantity);
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("efectivo");
  const [pickupMethod, setPickupMethod] = useState("local");
  const [orderId] = useState(uuidv4());

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // React Hook Form setup for step 0
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
    getValues,
  } = useForm({
    resolver: yupResolver(datosSchema),
    mode: "onBlur",
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
  });

  const handlePlaceOrder = async () => {
    const orderData = {
      items: cart.map(item => ({
        product: item._id,
        options: item.options?.map(opt => ({
          _id: opt._id,
          value: opt.value
        })),
        extras: item.extras?.map(ext => ({
          _id: ext._id,
          name: ext.name,
          price: ext.price
        })),
        quantity: item.quantity,
        price: item.price,
      })),
      total,
      state: "pending",
      type: pickupMethod === "local" ? "place" : "pickup",
      table: null,
      date: new Date(),
    };

    try {
      await OrderService.createOrder(orderData);
      console.log("Orden creada exitosamente:", orderData);
    } catch (err) {
      console.error("Error al crear la orden:", err);
    }
  };

  // --- Step Content ---
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <form
            className="w-full flex flex-col md:flex-row gap-8"
            autoComplete="on"
            onSubmit={handleSubmit(() => {
              setActiveStep((prev) => prev + 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            })}
          >
            <Paper elevation={4} className="flex-1 p-6 rounded-2xl bg-white dark:bg-zinc-900">
              <Typography variant="h6" className="mb-4 font-bold text-primary">
                Tus datos
              </Typography>
              <Box className="flex flex-col gap-4">
                {!user && (
                  <>
                    <TextField
                      fullWidth
                      label="Nombre Completo"
                      {...register("name")}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person />
                          </InputAdornment>
                        ),
                      }}
                      autoComplete="name"
                    />
                    <TextField
                      fullWidth
                      label="Correo Electrónico"
                      {...register("email")}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email />
                          </InputAdornment>
                        ),
                      }}
                      autoComplete="email"
                    />
                  </>
                )}
                <TextField
                  fullWidth
                  label="Teléfono"
                  {...register("phone")}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone />
                      </InputAdornment>
                    ),
                  }}
                  autoComplete="tel"
                />
              </Box>
            </Paper>
            <Paper elevation={4} className="flex-1 p-6 rounded-2xl bg-white dark:bg-zinc-900 flex flex-col justify-center">
              <Typography variant="h6" className="mb-4 font-bold text-primary">
                ¿Cómo prefieres recoger tu pedido?
              </Typography>
              <RadioGroup value={pickupMethod} onChange={e => setPickupMethod(e.target.value)}>
                <FormControlLabel
                  value="local"
                  control={<Radio />}
                  label={<span className="flex items-center gap-2"><Restaurant /> Comer en el local</span>}
                />
                <FormControlLabel
                  value="recoger"
                  control={<Radio />}
                  label={<span className="flex items-center gap-2"><ShoppingBag /> Pasar a recoger</span>}
                />
              </RadioGroup>
            </Paper>
          </form>
        );
      case 1:
        return (
          <Paper elevation={4} className="p-6 rounded-2xl bg-white dark:bg-zinc-900 max-w-lg mx-auto">
            <Typography variant="h6" className="mb-4 font-bold text-primary">
              Selecciona tu método de pago
            </Typography>
            <RadioGroup value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
              <FormControlLabel
                value="efectivo"
                control={<Radio />}
                label={<span className="flex items-center gap-2"><LocalAtm /> Efectivo en el local</span>}
              />
              <FormControlLabel
                value="tarjeta"
                control={<Radio />}
                label={<span className="flex items-center gap-2"><CreditCard /> Tarjeta en el local</span>}
              />
            </RadioGroup>
          </Paper>
        );
      case 2:
        return (
          <Paper elevation={4} className="p-6 rounded-2xl bg-white dark:bg-zinc-900">
            <Typography variant="h6" className="mb-4 font-bold text-primary">
              Resumen del Pedido
            </Typography>
            <Divider className="mb-4" />
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <Box key={item._id} className="flex flex-col sm:flex-row items-center gap-4 border-b pb-4 last:border-b-0">
                  <Box className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-primary/30">
                    <img
                      src={item.images?.[0] ? `${item.images[0].startsWith("http") ? item.images[0] : apiConfig.imagesEndpoint.concat("products/") + item.images[0]}` : ""}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </Box>
                  <Box className="flex-1 min-w-0">
                    <Typography variant="subtitle1" className="font-bold text-lg truncate">{item.name}</Typography>
                    {item.extras && item.extras.length > 0 && (
                      <Box className="mt-1">
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
                      <Box className="mt-1">
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
                  <Box className="flex flex-col items-center gap-2 min-w-[90px]">
                    <Box className="flex items-center gap-1">
                      <IconButton
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        size="small"
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
                        sx={{
                          color: theme.palette.primary.main,
                          bgcolor: "transparent",
                          "&:hover": { bgcolor: theme.palette.action.hover },
                        }}
                      >
                        <Add />
                      </IconButton>
                    </Box>
                    <Typography variant="body1" sx={{ fontWeight: 800, color: theme.palette.text.primary, fontSize: "1.1rem" }}>
                      Q{(item.price * item.quantity).toFixed(2)}
                    </Typography>
                    <IconButton
                      onClick={() => removeFromCart(item._id)}
                      sx={{
                        color: theme.palette.error.main,
                        bgcolor: theme.palette.error.main + "10",
                        "&:hover": { bgcolor: theme.palette.error.main + "22", color: "#fff" },
                        transition: "background 0.2s",
                      }}
                      aria-label="Eliminar producto"
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </div>
            <Divider className="my-4" />
            <Box className="flex justify-end">
              <Typography variant="h6" className="font-bold">
                Total: Q{total.toFixed(2)}
              </Typography>
            </Box>
          </Paper>
        );
      case 3:
        return (
          <Paper elevation={4} className="p-8 rounded-2xl bg-white dark:bg-zinc-900 flex flex-col items-center">
            <CheckCircle sx={{ fontSize: 60, color: theme.palette.success.main, mb: 2 }} />
            <Typography variant="h5" className="mb-2 font-bold text-primary">
              ¡Gracias por tu compra!
            </Typography>
            <Typography variant="body1" className="mb-4 text-center">
              Tu pedido ha sido confirmado.<br />
              Escanea el siguiente código QR para verificar tu pedido:
            </Typography>
            {/* Aquí podrías poner un componente de QR */}
            <Typography variant="body2" sx={{ mt: 2, color: theme.palette.text.secondary }}>
              ID de la orden: {orderId}
            </Typography>
          </Paper>
        );
      default:
        return "Paso desconocido";
    }
  };

  // --- Stepper Icon Custom ---
  const getStepStatus = (index) => {
    if (index < activeStep) {
      return { color: theme.palette.success.main, icon: <CheckCircle /> };
    }
    if (index === activeStep) {
      return { color: theme.palette.primary.main, icon: steps[index].icon };
    }
    return { color: theme.palette.grey[400], icon: steps[index].icon };
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      const valid = await trigger();
      if (!valid) return;
      setActiveStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (activeStep === 2) {
      setActiveStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      await handlePlaceOrder();
    }
    else {
      setActiveStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-2 md:px-0 py-8">
      <Typography variant="h4" align="center" gutterBottom className="font-extrabold text-primary mb-8">
        Finalizar Compra
      </Typography>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 6 }}>
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
                <span className="font-semibold">{step.label}</span>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div className="w-full flex flex-col gap-8">
        <Card className="shadow-lg rounded-2xl">
          <CardContent>
            {getStepContent(activeStep)}
          </CardContent>
        </Card>
        <div className="flex flex-col md:flex-row justify-between gap-4 mt-4">
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={handleBack}
            disabled={activeStep === 0}
            sx={{ minWidth: 140, fontWeight: 700, borderRadius: 99 }}
          >
            Anterior
          </Button>
          <Button
            variant="contained"
            endIcon={<ArrowForward />}
            onClick={handleNext}
            sx={{
              minWidth: 140,
              fontWeight: 700,
              borderRadius: 99,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              color: theme.palette.getContrastText(theme.palette.primary.main),
              boxShadow: 4,
              "&:hover": {
                background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                boxShadow: 8,
              },
            }}
            disabled={activeStep === 0 && isSubmitting}
          >
            {activeStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;