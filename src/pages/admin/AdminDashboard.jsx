import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Button,
  Tabs,
  Tab,
  Paper,
  Divider,
  useTheme,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  People,
  Fastfood,
  Category,
  ShoppingCart,
  AttachMoney,
  Add,
  Star,
  Warning,
  Notifications,
  Edit,
  Delete,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  ShowChart,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { BarChart, PieChart, LineChart } from "@mui/x-charts";

// Datos simulados
const salesData = [
  { month: "Ene", ventas: 12000 },
  { month: "Feb", ventas: 15000 },
  { month: "Mar", ventas: 18000 },
  { month: "Abr", ventas: 14000 },
  { month: "May", ventas: 20000 },
  { month: "Jun", ventas: 22000 },
];

const ordersByCategory = [
  { category: "Café", value: 120 },
  { category: "Crepas", value: 80 },
  { category: "Hamburguesas", value: 60 },
  { category: "Pizzas", value: 40 },
  { category: "Frappés", value: 30 },
  { category: "Bebidas", value: 50 },
];

const salesByProduct = [
  { product: "Café Latte", ventas: 320 },
  { product: "Crepa de Nutella", ventas: 210 },
  { product: "Hamburguesa Clásica", ventas: 180 },
  { product: "Pizza Margarita", ventas: 150 },
  { product: "Frappé Oreo", ventas: 120 },
  { product: "Limonada", ventas: 100 },
];

const users = [
  { id: 1, name: "Juan Pérez", role: "Admin", email: "juan@example.com", active: true },
  { id: 2, name: "María Gómez", role: "Mesero", email: "maria@example.com", active: true },
  { id: 3, name: "Carlos López", role: "Cocinero", email: "carlos@example.com", active: false },
];

const products = [
  { id: 1, name: "Café Latte", price: 4.99, stock: 3, category: "Café" },
  { id: 2, name: "Crepa de Nutella", price: 6.50, stock: 20, category: "Crepas" },
  { id: 3, name: "Hamburguesa Clásica", price: 8.99, stock: 15, category: "Hamburguesas" },
  { id: 4, name: "Pizza Margarita", price: 10.99, stock: 2, category: "Pizzas" },
];

const categories = [
  { id: 1, name: "Café", products: 10 },
  { id: 2, name: "Crepas", products: 8 },
  { id: 3, name: "Hamburguesas", products: 5 },
  { id: 4, name: "Pizzas", products: 4 },
  { id: 5, name: "Frappés", products: 6 },
  { id: 6, name: "Bebidas", products: 7 },
];

const recentReviews = [
  {
    id: 1,
    user: "Ana Ruiz",
    comment: "¡El café está delicioso y la atención excelente!",
    rating: 5,
    product: "Café Latte",
  },
  {
    id: 2,
    user: "Luis Torres",
    comment: "La crepa de Nutella es mi favorita.",
    rating: 4,
    product: "Crepa de Nutella",
  },
  {
    id: 3,
    user: "Sofía Méndez",
    comment: "La pizza llegó rápido y caliente.",
    rating: 5,
    product: "Pizza Margarita",
  },
];

const lowStockProducts = products.filter((p) => p.stock <= 5);

const notifications = [
  { id: 1, message: "Nuevo usuario registrado: Pedro Salinas", type: "info" },
  { id: 2, message: "Stock bajo: Café Latte", type: "warning" },
  { id: 3, message: "Nueva reseña de 5 estrellas", type: "success" },
];

const userColumns = [
  { field: "name", headerName: "Nombre", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "role", headerName: "Rol", flex: 1 },
  { field: "active", headerName: "Activo", flex: 1, type: "boolean" },
];

const productColumns = [
  { field: "name", headerName: "Producto", flex: 1 },
  { field: "category", headerName: "Categoría", flex: 1 },
  { field: "price", headerName: "Precio", flex: 1, type: "number" },
  { field: "stock", headerName: "Stock", flex: 1, type: "number" },
  {
    field: "actions",
    headerName: "Acciones",
    flex: 1,
    renderCell: () => (
      <Box>
        <Tooltip title="Editar">
          <IconButton size="small" color="primary">
            <Edit fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar">
          <IconButton size="small" color="error">
            <Delete fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  },
];

const categoryColumns = [
  { field: "name", headerName: "Categoría", flex: 1 },
  { field: "products", headerName: "Productos", flex: 1, type: "number" },
];

const quickStats = [
  {
    icon: <AttachMoney fontSize="large" />,
    label: "Ventas del Mes",
    value: "$22,000",
    color: "primary",
  },
  {
    icon: <ShoppingCart fontSize="large" />,
    label: "Órdenes Hoy",
    value: "345",
    color: "secondary",
  },
  {
    icon: <People fontSize="large" />,
    label: "Usuarios Activos",
    value: "45",
    color: "primary",
  },
  {
    icon: <Fastfood fontSize="large" />,
    label: "Productos",
    value: "78",
    color: "secondary",
  },
];

// Opciones para gráficas dinámicas
const chartTypes = [
  { value: "bar", label: "Barras", icon: <BarChartIcon /> },
  { value: "pie", label: "Pastel", icon: <PieChartIcon /> },
  { value: "line", label: "Líneas", icon: <ShowChart /> },
];
const chartDatasets = [
  { value: "sales", label: "Ventas Mensuales" },
  { value: "products", label: "Ventas por Producto" },
  { value: "categories", label: "Órdenes por Categoría" },
];

const AdminDashboard = () => {
  const theme = useTheme();
  const [tab, setTab] = useState(0);

  // Estado para gráfica dinámica
  const [chartType, setChartType] = useState("bar");
  const [chartDataset, setChartDataset] = useState("sales");

  // Obtiene datos y labels según dataset seleccionado
  let chartData = [];
  let chartLabels = [];
  if (chartDataset === "sales") {
    chartData = salesData.map((d) => d.ventas);
    chartLabels = salesData.map((d) => d.month);
  } else if (chartDataset === "products") {
    chartData = salesByProduct.map((d) => d.ventas);
    chartLabels = salesByProduct.map((d) => d.product);
  } else if (chartDataset === "categories") {
    chartData = ordersByCategory.map((d) => d.value);
    chartLabels = ordersByCategory.map((d) => d.category);
  }

  return (
    <Box className="p-4 md:p-8 bg-[color:var(--mui-palette-background-default)] min-h-screen">
      {/* Título y bienvenida */}
      <Box className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <Box>
          <Typography variant="h4" fontWeight={700} color={theme.palette.primary.main}>
            Panel de Administración
          </Typography>
          <Typography variant="subtitle1" color={theme.palette.text.secondary}>
            Gestiona tu cafetería, productos y personal desde aquí.
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          className="w-full md:w-auto"
        >
          Nuevo Producto
        </Button>
      </Box>

      {/* Notificaciones y métricas rápidas en grid */}
      <Grid container spacing={3} className="mb-8">
        <Grid item xs={12} md={4} lg={3}>
          <Paper className="rounded-xl shadow-md p-4 h-full flex flex-col">
            <Box className="flex items-center mb-2 gap-2">
              <Notifications color="primary" />
              <Typography variant="h6" fontWeight={600}>
                Notificaciones
              </Typography>
            </Box>
            <Box className="flex flex-wrap gap-2">
              {notifications.map((n) => (
                <Chip
                  key={n.id}
                  label={n.message}
                  color={
                    n.type === "success"
                      ? "success"
                      : n.type === "warning"
                      ? "warning"
                      : "primary"
                  }
                  icon={
                    n.type === "success" ? <Star /> : n.type === "warning" ? <Warning /> : <People />
                  }
                  variant="outlined"
                  className="text-sm"
                />
              ))}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <Grid container spacing={3}>
            {quickStats.map((stat) => (
              <Grid item xs={12} sm={6} md={3} key={stat.label}>
                <Card
                  className="rounded-xl shadow-md flex flex-col items-center justify-center py-6 h-full"
                  sx={{
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: theme.palette[stat.color].main,
                      color: theme.palette[stat.color].contrastText,
                      width: 56,
                      height: 56,
                      mb: 2,
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Typography variant="h6" fontWeight={600}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color={theme.palette.text.secondary}>
                    {stat.label}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Gráficas y reseñas recientes en grid */}
      <Grid container spacing={3} className="mb-8">
        <Grid item xs={12} md={6} lg={4}>
          <Card className="rounded-xl shadow-md h-full flex flex-col">
            <CardHeader
              title={
                <Box className="flex items-center gap-2">
                  <BarChartIcon color="primary" />
                  <span>Ventas Mensuales</span>
                </Box>
              }
            />
            <CardContent>
              <BarChart
                xAxis={[{ data: salesData.map((d) => d.month), scaleType: "band" }]}
                series={[{ data: salesData.map((d) => d.ventas), color: theme.palette.primary.main }]}
                height={220}
                sx={{
                  "& .MuiChartsAxis-tickLabel": { fill: theme.palette.text.primary },
                  "& .MuiChartsLegend-label": { fill: theme.palette.text.primary },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Card className="rounded-xl shadow-md h-full flex flex-col">
            <CardHeader
              title={
                <Box className="flex items-center gap-2">
                  <PieChartIcon color="secondary" />
                  <span>Órdenes por Categoría</span>
                </Box>
              }
            />
            <CardContent>
              <PieChart
                series={[
                  {
                    data: ordersByCategory.map((c) => ({
                      id: c.category,
                      value: c.value,
                      label: c.category,
                      color: theme.palette.secondary.main,
                    })),
                  },
                ]}
                height={220}
                sx={{
                  "& .MuiChartsLegend-label": { fill: theme.palette.text.primary },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <Card className="rounded-xl shadow-md h-full flex flex-col">
            <CardHeader
              title={
                <Box className="flex items-center gap-2">
                  <ShowChart color="primary" />
                  <span>Ventas por Producto</span>
                </Box>
              }
            />
            <CardContent>
              <LineChart
                xAxis={[{ data: salesByProduct.map((d) => d.product), scaleType: "point" }]}
                series={[{ data: salesByProduct.map((d) => d.ventas), color: theme.palette.primary.main }]}
                height={220}
                sx={{
                  "& .MuiChartsAxis-tickLabel": { fill: theme.palette.text.primary },
                  "& .MuiChartsLegend-label": { fill: theme.palette.text.primary },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        {/* Gráfica dinámica */}
        <Grid item xs={12} md={12} lg={12}>
          <Card className="rounded-xl shadow-md h-full flex flex-col">
            <CardHeader
              title={
                <Box className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <span className="flex items-center gap-2">
                    <BarChartIcon color="primary" />
                    <span>Gráfica Personalizada</span>
                  </span>
                  <Box className="flex gap-2">
                    <FormControl size="small">
                      <InputLabel id="chart-type-label">Tipo</InputLabel>
                      <Select
                        labelId="chart-type-label"
                        value={chartType}
                        label="Tipo"
                        onChange={(e) => setChartType(e.target.value)}
                        sx={{ minWidth: 100 }}
                      >
                        {chartTypes.map((type) => (
                          <MenuItem key={type.value} value={type.value}>
                            <Box className="flex items-center gap-2">
                              {type.icon}
                              {type.label}
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl size="small">
                      <InputLabel id="chart-dataset-label">Datos</InputLabel>
                      <Select
                        labelId="chart-dataset-label"
                        value={chartDataset}
                        label="Datos"
                        onChange={(e) => setChartDataset(e.target.value)}
                        sx={{ minWidth: 150 }}
                      >
                        {chartDatasets.map((ds) => (
                          <MenuItem key={ds.value} value={ds.value}>
                            {ds.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              }
            />
            <CardContent>
              {chartType === "bar" && (
                <BarChart
                  xAxis={[{ data: chartLabels, scaleType: "band" }]}
                  series={[{ data: chartData, color: theme.palette.primary.main }]}
                  height={220}
                  sx={{
                    "& .MuiChartsAxis-tickLabel": { fill: theme.palette.text.primary },
                  }}
                />
              )}
              {chartType === "pie" && (
                <PieChart
                  series={[
                    {
                      data: chartLabels.map((label, i) => ({
                        id: label,
                        value: chartData[i],
                        label,
                        color: theme.palette.secondary.main,
                      })),
                    },
                  ]}
                  height={220}
                  sx={{
                    "& .MuiChartsLegend-label": { fill: theme.palette.text.primary },
                  }}
                />
              )}
              {chartType === "line" && (
                <LineChart
                  xAxis={[{ data: chartLabels, scaleType: "point" }]}
                  series={[{ data: chartData, color: theme.palette.primary.main }]}
                  height={220}
                  sx={{
                    "& .MuiChartsAxis-tickLabel": { fill: theme.palette.text.primary },
                  }}
                />
              )}
            </CardContent>
          </Card>
        </Grid>
        {/* Últimas reseñas */}
        <Grid item xs={12} md={6} lg={4}>
          <Card className="rounded-xl shadow-md h-full flex flex-col">
            <CardHeader title="Últimas Reseñas" />
            <CardContent>
              <List dense>
                {recentReviews.map((r) => (
                  <ListItem key={r.id} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar>
                        <Star color="warning" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <span>
                          <b>{r.user}</b> sobre <b>{r.product}</b>
                        </span>
                      }
                      secondary={
                        <span>
                          {r.comment}{" "}
                          <span className="ml-2">
                            {[...Array(r.rating)].map((_, i) => (
                              <Star key={i} fontSize="small" color="warning" />
                            ))}
                          </span>
                        </span>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        {/* Inventario bajo */}
        {lowStockProducts.length > 0 && (
          <Grid item xs={12} md={6} lg={4}>
            <Paper className="rounded-xl shadow-md p-4 h-full flex flex-col">
              <Box className="flex items-center mb-2 gap-2">
                <Warning color="warning" />
                <Typography variant="h6" fontWeight={600}>
                  Inventario Bajo
                </Typography>
              </Box>
              <Box className="flex flex-wrap gap-2">
                {lowStockProducts.map((p) => (
                  <Chip
                    key={p.id}
                    label={`${p.name} (${p.stock} en stock)`}
                    color="warning"
                    variant="outlined"
                    className="text-sm"
                  />
                ))}
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>

      {/* Tabs para tablas */}
      <Paper className="mb-8 rounded-xl shadow-md">
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Usuarios" icon={<People />} iconPosition="start" />
          <Tab label="Productos" icon={<Fastfood />} iconPosition="start" />
          <Tab label="Categorías" icon={<Category />} iconPosition="start" />
        </Tabs>
        <Divider />
        <Box className="p-4">
          {tab === 0 && (
            <DataGrid
              rows={users}
              columns={userColumns}
              autoHeight
              pageSize={5}
              rowsPerPageOptions={[5]}
              sx={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                borderRadius: 2,
              }}
            />
          )}
          {tab === 1 && (
            <DataGrid
              rows={products}
              columns={productColumns}
              autoHeight
              pageSize={5}
              rowsPerPageOptions={[5]}
              sx={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                borderRadius: 2,
              }}
            />
          )}
          {tab === 2 && (
            <DataGrid
              rows={categories}
              columns={categoryColumns}
              autoHeight
              pageSize={5}
              rowsPerPageOptions={[5]}
              sx={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                borderRadius: 2,
              }}
            />
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminDashboard;