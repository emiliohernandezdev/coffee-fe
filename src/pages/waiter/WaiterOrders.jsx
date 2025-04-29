import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  useTheme,
  Box,
  Divider,
} from "@mui/material";
import { LocalCafe, CheckCircle, AccessTime } from "@mui/icons-material";
import { motion } from "framer-motion";

const WaiterView = () => {
  const theme = useTheme();

  const orders = [
    { id: 1, table: 5, status: "En Proceso", items: ["Café Latte", "Croissant"] },
    { id: 2, table: 3, status: "Pendiente", items: ["Espresso", "Tarta de Manzana"] },
    { id: 3, table: 7, status: "Completada", items: ["Té Verde", "Sándwich"] },
  ];

  return (
    <div className="p-8">
      {/* Título */}
      <Typography variant="h4" className="font-bold mb-8" style={{ color: theme.palette.text.primary }}>
        <LocalCafe className="mr-2" /> Órdenes Activas
      </Typography>

      {/* Lista de Órdenes */}
      <Grid container spacing={4}>
        {orders.map((order) => (
          <Grid item key={order.id} xs={12} sm={6} md={4}>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Card className="shadow-lg rounded-lg">
                <CardContent>
                  <Typography variant="h6" className="font-bold" style={{ color: theme.palette.text.primary }}>
                    Mesa {order.table}
                  </Typography>
                  <Typography variant="body2" className="mt-2" style={{ color: theme.palette.text.secondary }}>
                    {order.items.join(", ")}
                  </Typography>
                  <Divider className="my-4" />
                  <Box className="flex items-center">
                    {order.status === "En Proceso" && <AccessTime style={{ color: theme.palette.warning.main }} />}
                    {order.status === "Completada" && <CheckCircle style={{ color: theme.palette.success.main }} />}
                    <Typography variant="body2" className="ml-2" style={{ color: theme.palette.text.secondary }}>
                      {order.status}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    className="mt-4"
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      "&:hover": { backgroundColor: theme.palette.primary.dark },
                    }}
                  >
                    Ver Detalles
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default WaiterView;