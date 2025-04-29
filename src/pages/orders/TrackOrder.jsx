import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  useTheme,
} from "@mui/material";
import {
  Assignment,
  HourglassEmpty,
  DirectionsCar,
  CheckCircle,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Lottie from "lottie-react";

// Importa tus animaciones Lottie
import cookingAnimation from "../../animations/lottie/cooking.json";
import receivedAnimation from "../../animations/lottie/received.json";
import onTheWayAnimation from "../../animations/lottie/delivery.json";
import deliveredAnimation from "../../animations/lottie/ready.json";

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundColor: theme.palette.primary.main,
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundColor: theme.palette.success.main,
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <Assignment />,
    2: <HourglassEmpty />,
    3: <DirectionsCar />,
    4: <CheckCircle />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = [
  { label: "Pedido Recibido", icon: 1 },
  { label: "En Preparación", icon: 2 },
  { label: "En Camino", icon: 3 },
  { label: "Entregado", icon: 4 },
];

// Mapea cada paso a su respectiva animación Lottie
const stepAnimations = {
  0: receivedAnimation,
  1: cookingAnimation,
  2: onTheWayAnimation,
  3: deliveredAnimation,
};

const TrackOrderPage = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prevStep) => (prevStep < steps.length - 1 ? prevStep + 1 : prevStep));
    }, 3000); // Cambia de paso cada 3 segundos (solo para demostración)
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-8">
      <Typography variant="h4" className="text-center mb-8 font-bold">
        Rastrear Pedido
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel className="mb-8">
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Card className="shadow-lg mb-8">
        <CardContent>
          <Typography variant="h6" className="font-bold mb-4">
            Detalles del Pedido
          </Typography>
          <div className="flex justify-between mb-2">
            <Typography variant="body1">Número de Pedido:</Typography>
            <Typography variant="body1" className="font-bold">
              #123456
            </Typography>
          </div>
          <div className="flex justify-between mb-2">
            <Typography variant="body1">Fecha del Pedido:</Typography>
            <Typography variant="body1" className="font-bold">
              10/10/2023
            </Typography>
          </div>
          <div className="flex justify-between mb-2">
            <Typography variant="body1">Estado Actual:</Typography>
            <Typography variant="body1" className="font-bold">
              {steps[activeStep].label}
            </Typography>
          </div>
        </CardContent>
      </Card>

      {/* Card para mostrar la animación Lottie */}
      <Card className="shadow-lg">
        <CardContent>
          <Typography variant="h6" className="font-bold mb-4">
            Estado del Pedido
          </Typography>
          <Lottie
            animationData={stepAnimations[activeStep]}
            loop={true}
            autoplay={true}
            style={{ height: 200 }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TrackOrderPage;