import React from "react";
import {
  Typography,
  Card,
  CardContent,
  Button,
  useTheme,
  Grid,
  Box,
} from "@mui/material";
import { LocalCafe } from "@mui/icons-material";

const OrderHistoryPage = () => {
  const theme = useTheme();

  return (
    <div className="p-8">
      {/* Título */}
      <Typography variant="h4" className="font-bold mb-8" style={{ color: theme.palette.text.primary }}>
        Historial de Pedidos
      </Typography>

      {/* Lista de Pedidos */}
      <Grid container spacing={4}>
        {[1, 2, 3].map((order) => (
          <Grid item xs={12} key={order}>
            <Card className="shadow-lg" style={{ backgroundColor: theme.palette.background.paper }}>
              <CardContent>
                <Typography variant="h6" className="font-bold" style={{ color: theme.palette.text.primary }}>
                  Pedido #{order}
                </Typography>
                <Typography variant="body2" className="mt-2" style={{ color: theme.palette.text.secondary }}>
                  Fecha: 01/01/2023
                </Typography>
                <Typography variant="body2" style={{ color: theme.palette.text.secondary }}>
                  Total: $50.00
                </Typography>
                <Button
                  variant="text"
                  className="mt-2"
                  startIcon={<LocalCafe />}
                  sx={{ color: theme.palette.primary.main }}
                >
                  Ver Detalles
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default OrderHistoryPage;