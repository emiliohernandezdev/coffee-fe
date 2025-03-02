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
import {
  BarChart,
  PieChart,
  Timeline,
  People,
  LocalCafe,
  AttachMoney,
  Inventory,
  Receipt,
  Group,
  Settings,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const theme = useTheme();

  // Datos de ejemplo para las tablas
  const users = [
    { id: 1, name: "Juan Pérez", role: "Admin", email: "juan@example.com" },
    { id: 2, name: "María Gómez", role: "Mesero", email: "maria@example.com" },
    { id: 3, name: "Carlos López", role: "Cocinero", email: "carlos@example.com" },
  ];

  const orders = [
    { id: 1, table: 5, total: 25.99, status: "Completada", date: "2023-10-01" },
    { id: 2, table: 3, total: 15.50, status: "En Proceso", date: "2023-10-01" },
    { id: 3, table: 7, total: 30.00, status: "Pendiente", date: "2023-10-01" },
  ];

  const products = [
    { id: 1, name: "Café Latte", price: 4.99, stock: 50 },
    { id: 2, name: "Espresso", price: 3.50, stock: 30 },
    { id: 3, name: "Té Verde", price: 2.99, stock: 20 },
  ];

  // Columnas para las tablas
  const userColumns = [
    { field: "name", headerName: "Nombre", width: 200 },
    { field: "role", headerName: "Rol", width: 150 },
    { field: "email", headerName: "Email", width: 250 },
  ];

  const orderColumns = [
    { field: "table", headerName: "Mesa", width: 100 },
    { field: "total", headerName: "Total", width: 120 },
    { field: "status", headerName: "Estado", width: 150 },
    { field: "date", headerName: "Fecha", width: 150 },
  ];

  const productColumns = [
    { field: "name", headerName: "Nombre", width: 200 },
    { field: "price", headerName: "Precio", width: 120 },
    { field: "stock", headerName: "Stock", width: 120 },
  ];

  return (
    <div className="p-8">
      {/* Título */}
      <Typography variant="h4" className="font-bold mb-8" style={{ color: theme.palette.text.primary }}>
        <People className="mr-2" /> Panel de Administración
      </Typography>

      {/* Métricas Rápidas */}
      <Grid container spacing={4} className="mb-8">
        <Grid item xs={12} sm={6} md={3}>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <Card className="shadow-lg rounded-lg">
              <CardContent className="text-center">
                <AttachMoney fontSize="large" style={{ color: theme.palette.primary.main }} />
                <Typography variant="h6" className="mt-2" style={{ color: theme.palette.text.primary }}>
                  $12,345
                </Typography>
                <Typography variant="body2" style={{ color: theme.palette.text.secondary }}>
                  Ventas Totales
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <Card className="shadow-lg rounded-lg">
              <CardContent className="text-center">
                <LocalCafe fontSize="large" style={{ color: theme.palette.primary.main }} />
                <Typography variant="h6" className="mt-2" style={{ color: theme.palette.text.primary }}>
                  345
                </Typography>
                <Typography variant="body2" style={{ color: theme.palette.text.secondary }}>
                  Órdenes Hoy
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <Card className="shadow-lg rounded-lg">
              <CardContent className="text-center">
                <People fontSize="large" style={{ color: theme.palette.primary.main }} />
                <Typography variant="h6" className="mt-2" style={{ color: theme.palette.text.primary }}>
                  45
                </Typography>
                <Typography variant="body2" style={{ color: theme.palette.text.secondary }}>
                  Usuarios Activos
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <Card className="shadow-lg rounded-lg">
              <CardContent className="text-center">
                <Inventory fontSize="large" style={{ color: theme.palette.primary.main }} />
                <Typography variant="h6" className="mt-2" style={{ color: theme.palette.text.primary }}>
                  78
                </Typography>
                <Typography variant="body2" style={{ color: theme.palette.text.secondary }}>
                  Productos
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Gráficos y Estadísticas */}
      <Grid container spacing={4} className="mb-8">
        <Grid item xs={12} md={6}>
          <Card className="shadow-lg rounded-lg">
            <CardContent>
              <Typography variant="h6" className="font-bold mb-4" style={{ color: theme.palette.text.primary }}>
                Ventas Mensuales
              </Typography>
              <Box className="h-64">
                {/* Gráfico de Barras */}
                <BarChart style={{ color: theme.palette.primary.main }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className="shadow-lg rounded-lg">
            <CardContent>
              <Typography variant="h6" className="font-bold mb-4" style={{ color: theme.palette.text.primary }}>
                Distribución de Órdenes
              </Typography>
              <Box className="h-64">
                {/* Gráfico de Torta */}
                <PieChart style={{ color: theme.palette.primary.main }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tablas de Datos */}
      <Grid container spacing={4} className="mb-8">
        <Grid item xs={12} md={6}>
          <Card className="shadow-lg rounded-lg">
            <CardContent>
              <Typography variant="h6" className="font-bold mb-4" style={{ color: theme.palette.text.primary }}>
                Usuarios
              </Typography>
              <Box className="h-64">
                <DataGrid
                  rows={users}
                  columns={userColumns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className="shadow-lg rounded-lg">
            <CardContent>
              <Typography variant="h6" className="font-bold mb-4" style={{ color: theme.palette.text.primary }}>
                Órdenes Recientes
              </Typography>
              <Box className="h-64">
                <DataGrid
                  rows={orders}
                  columns={orderColumns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Productos y Configuración */}
      <Grid container spacing={4} className="mb-8">
        <Grid item xs={12} md={6}>
          <Card className="shadow-lg rounded-lg">
            <CardContent>
              <Typography variant="h6" className="font-bold mb-4" style={{ color: theme.palette.text.primary }}>
                Productos
              </Typography>
              <Box className="h-64">
                <DataGrid
                  rows={products}
                  columns={productColumns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className="shadow-lg rounded-lg">
            <CardContent>
              <Typography variant="h6" className="font-bold mb-4" style={{ color: theme.palette.text.primary }}>
                Configuración
              </Typography>
              <Button
                variant="contained"
                fullWidth
                startIcon={<Settings />}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  "&:hover": { backgroundColor: theme.palette.primary.dark },
                }}
              >
                Gestionar Configuración
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashboard;