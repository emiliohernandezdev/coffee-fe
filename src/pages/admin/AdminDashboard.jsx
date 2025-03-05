import React, { useState } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  useTheme,
  Box,
  Divider,
  Chip,
  IconButton,
  Menu,
  MenuItem,
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
  MoreVert,
  Edit,
  Delete,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { motion } from "framer-motion";
import SpotifyPlayerSDK from "../../components/Player";

const AdminDashboard = () => {
  const theme = useTheme();

  // Datos de ejemplo para las tablas
  const [users, setUsers] = useState([
    { id: 1, name: "Juan Pérez", role: "Admin", email: "juan@example.com", active: true },
    { id: 2, name: "María Gómez", role: "Mesero", email: "maria@example.com", active: true },
    { id: 3, name: "Carlos López", role: "Cocinero", email: "carlos@example.com", active: false },
  ]);

  const [orders, setOrders] = useState([
    { id: 1, table: 5, total: 25.99, status: "Completada", date: "2023-10-01" },
    { id: 2, table: 3, total: 15.50, status: "En Proceso", date: "2023-10-01" },
    { id: 3, table: 7, total: 30.00, status: "Pendiente", date: "2023-10-01" },
  ]);

  const [products, setProducts] = useState([
    { id: 1, name: "Café Latte", price: 4.99, stock: 50 },
    { id: 2, name: "Espresso", price: 3.50, stock: 30 },
    { id: 3, name: "Té Verde", price: 2.99, stock: 20 },
  ]);

  // Columnas para las tablas
  const userColumns = [
    { field: "name", headerName: "Nombre", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "role",
      headerName: "Rol",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          style={{
            backgroundColor:
              params.value === "Admin" ? theme.palette.primary.main :
              params.value === "Mesero" ? theme.palette.secondary.main :
              theme.palette.success.main,
            color: "white",
          }}
        />
      ),
    },
    {
      field: "active",
      headerName: "Estado",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value ? "Activo" : "Inactivo"}
          style={{
            backgroundColor: params.value ? theme.palette.success.main : theme.palette.error.main,
            color: "white",
          }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => (
        <IconButton onClick={(e) => handleUserActions(e, params.row)}>
          <MoreVert />
        </IconButton>
      ),
    },
  ];

  const orderColumns = [
    { field: "table", headerName: "Mesa", width: 100 },
    { field: "total", headerName: "Total", width: 120 },
    {
      field: "status",
      headerName: "Estado",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          style={{
            backgroundColor:
              params.value === "Completada" ? theme.palette.success.main :
              params.value === "En Proceso" ? theme.palette.warning.main :
              theme.palette.error.main,
            color: "white",
          }}
        />
      ),
    },
    { field: "date", headerName: "Fecha", width: 150 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => (
        <IconButton onClick={(e) => handleOrderActions(e, params.row)}>
          <MoreVert />
        </IconButton>
      ),
    },
  ];

  const productColumns = [
    { field: "name", headerName: "Nombre", width: 200 },
    { field: "price", headerName: "Precio", width: 120 },
    { field: "stock", headerName: "Stock", width: 120 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => (
        <IconButton onClick={(e) => handleProductActions(e, params.row)}>
          <MoreVert />
        </IconButton>
      ),
    },
  ];

  // Menú de acciones para usuarios
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserActions = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const toggleUserStatus = () => {
    setUsers(users.map((u) =>
      u.id === selectedUser.id ? { ...u, active: !u.active } : u
    ));
    handleCloseUserMenu();
  };

  const changeUserRole = (role) => {
    setUsers(users.map((u) =>
      u.id === selectedUser.id ? { ...u, role } : u
    ));
    handleCloseUserMenu();
  };

  // Menú de acciones para órdenes
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOrderActions = (event, order) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(order);
  };

  const handleCloseOrderMenu = () => {
    setAnchorEl(null);
    setSelectedOrder(null);
  };

  const changeOrderStatus = (status) => {
    setOrders(orders.map((o) =>
      o.id === selectedOrder.id ? { ...o, status } : o
    ));
    handleCloseOrderMenu();
  };

  // Menú de acciones para productos
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductActions = (event, product) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product);
  };

  const handleCloseProductMenu = () => {
    setAnchorEl(null);
    setSelectedProduct(null);
  };

  const editProduct = () => {
    // Lógica para editar producto
    handleCloseProductMenu();
  };

  const deleteProduct = () => {
    setProducts(products.filter((p) => p.id !== selectedProduct.id));
    handleCloseProductMenu();
  };

  return (
    <div className="p-8">
      {/* Título */}
      <Typography variant="h4" className="font-bold mb-8" style={{ color: theme.palette.text.primary }}>
        <People className="mr-2" /> Panel de Administración
      </Typography>

      <Box mb={8}>
        <Typography variant="h6" className="font-bold mb-4" style={{ color: theme.palette.text.primary }}>
          Reproducción Actual
        </Typography>
        <SpotifyPlayerSDK />
      </Box>


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
                {/* Gráfico de Barras Simulado */}
                <img
                  src="https://via.placeholder.com/600x300"
                  alt="Gráfico de Ventas"
                  className="w-full h-full object-cover"
                />
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
                {/* Gráfico de Torta Simulado */}
                <img
                  src="https://via.placeholder.com/600x300"
                  alt="Gráfico de Órdenes"
                  className="w-full h-full object-cover"
                />
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

      {/* Menús de Acciones */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={toggleUserStatus}>
          {selectedUser?.active ? <Cancel /> : <CheckCircle />}
          {selectedUser?.active ? "Desactivar" : "Activar"}
        </MenuItem>
        <MenuItem onClick={() => changeUserRole("Admin")}>
          <People /> Cambiar a Admin
        </MenuItem>
        <MenuItem onClick={() => changeUserRole("Mesero")}>
          <People /> Cambiar a Mesero
        </MenuItem>
        <MenuItem onClick={() => changeUserRole("Cocinero")}>
          <People /> Cambiar a Cocinero
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseOrderMenu}
      >
        <MenuItem onClick={() => changeOrderStatus("Pendiente")}>
          <Cancel /> Marcar como Pendiente
        </MenuItem>
        <MenuItem onClick={() => changeOrderStatus("En Proceso")}>
          <Timeline /> Marcar como En Proceso
        </MenuItem>
        <MenuItem onClick={() => changeOrderStatus("Completada")}>
          <CheckCircle /> Marcar como Completada
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseProductMenu}
      >
        <MenuItem onClick={editProduct}>
          <Edit /> Editar Producto
        </MenuItem>
        <MenuItem onClick={deleteProduct}>
          <Delete /> Eliminar Producto
        </MenuItem>
      </Menu>
    </div>
  );
};

export default AdminDashboard;