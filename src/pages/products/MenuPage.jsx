import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  TextField,
  MenuItem,
  Button,
  Pagination,
  Skeleton,
  useTheme,
  Box,
  Drawer,
  Chip,
  Rating,
  Dialog,
  DialogContent,
  DialogActions,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  TextareaAutosize,
  useMediaQuery,
  FormGroup,
} from "@mui/material";
import { ChevronLeft, ChevronRight, FilterList, ShoppingCart } from "@mui/icons-material";
import { motion } from "framer-motion";
import ProductsService from "../../services/ProductsService";
import { apiConfig } from "../../services/ApiConfig";
import { useNavigate } from "react-router-dom";

const MenuPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Para manejar el diseño responsivo
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    minPrice: "",
    maxPrice: "",
    category: "",
    dietary: [],
    sortBy: "price_asc",
  });
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const productsPerPage = 9;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductsService.getAvailableProducts();
        if (data.success) {
          setProducts(data.products);
          setFilteredProducts(data.products);
          const uniqueCategories = [...new Set(data.products.flatMap((p) => p.categories.map((c) => c.name)))];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleDietaryChange = (e) => {
    const { value, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      dietary: checked
        ? [...prevFilters.dietary, value]
        : prevFilters.dietary.filter((item) => item !== value),
    }));
  };

  const applyFilters = () => {
    let result = products;

    if (filters.name) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.minPrice) {
      result = result.filter((p) => p.price >= parseFloat(filters.minPrice));
    }

    if (filters.maxPrice) {
      result = result.filter((p) => p.price <= parseFloat(filters.maxPrice));
    }

    if (filters.category) {
      result = result.filter((p) =>
        p.categories.some((c) => c.name === filters.category)
      );
    }

    if (filters.dietary.length > 0) {
      result = result.filter((p) =>
        filters.dietary.every((diet) => p.dietaryOptions?.includes(diet))
      );
    }

    if (filters.sortBy === "price_asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "price_desc") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
    setCurrentPage(1);
    setIsFilterOpen(false);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleCloseProductDetail = () => {
    setIsProductDetailOpen(false);
    setSelectedProduct(null);
  };

  const ProductCard = ({ product }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Carrusel automático
    useEffect(() => {
      if (product.images?.length > 1) {
        const interval = setInterval(() => {
          setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
        }, 3000); // Cambia la imagen cada 3 segundos
        return () => clearInterval(interval);
      }
    }, [product.images]);

    return (
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.2 }}
        onClick={() => handleProductClick(product._id)}
      >
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '12px', boxShadow: 3, overflow: 'hidden' }}>
          {/* Carrusel de imágenes */}
          <Box sx={{ position: 'relative', width: '100%', height: 300, overflow: 'hidden' }}>
            <CardMedia
              component="img"
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              image={`${apiConfig.imagesEndpoint.concat('products/')}${product.images[currentImageIndex]}`}
              alt={product.name}
            />
            {/* Mostrar indicadores de imágenes si hay más de una */}
            {product.images?.length > 1 && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: 1,
                }}
              >
                {product.images.map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: currentImageIndex === index ? theme.palette.primary.main : theme.palette.grey[500],
                    }}
                  />
                ))}
              </Box>
            )}
          </Box>

          {/* Contenido de la tarjeta */}
          <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 1 }}>
                {product.name}
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
                {product.description}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {product.categories.map((cat) => (
                  <Chip key={cat._id} label={cat.name} size="small" />
                ))}
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {product.extras?.map((extra) => (
                  <Chip key={extra._id} label={`${extra.name} (+Q${extra.price})`} size="small" variant="outlined" />
                ))}
              </Box>
              <Rating value={product.rating} precision={0.5} readOnly sx={{ mb: 2 }} />
            </Box>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 700, color: theme.palette.primary.main, mb: 2 }}>
                Q{product.price.toFixed(2)}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Filtros en pantallas grandes */}
      <Box sx={{ display: { xs: 'none', md: 'block' }, p: 3, backgroundColor: theme.palette.background.paper, boxShadow: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Filtros
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Nombre"
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              label="Precio Mínimo"
              name="minPrice"
              type="number"
              value={filters.minPrice}
              onChange={handleFilterChange}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              label="Precio Máximo"
              name="maxPrice"
              type="number"
              value={filters.maxPrice}
              onChange={handleFilterChange}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Categoría"
              name="category"
              select
              value={filters.category}
              onChange={handleFilterChange}
            >
              <MenuItem value="">Todas</MenuItem>
              {categories.map((cat, index) => (
                <MenuItem key={index} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              onClick={applyFilters}
              fullWidth
              sx={{ backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.dark }, borderRadius: '8px' }}
            >
              Buscar
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Contenido Principal */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        {/* Botón para abrir filtros en móvil */}
        <Button
          variant="contained"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          startIcon={<FilterList />}
          sx={{ mb: 4, display: { xs: 'flex', md: 'none' }, backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.dark }, borderRadius: '8px' }}
        >
          Filtros
        </Button>

        {/* Título */}
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 4, fontWeight: 700, color: theme.palette.text.primary }}>
          Menú de la Cafetería
        </Typography>

        {/* Lista de Productos */}
        {loading ? (
          <Grid container spacing={4}>
            {[...Array(productsPerPage)].map((_, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Skeleton variant="rectangular" sx={{ height: 400, borderRadius: '12px' }} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <>
            <Grid container spacing={4}>
              {currentProducts.map((product) => (
                <Grid item key={product._id} xs={12} sm={6} md={4}>
                  <ProductCard key={product._id} product={product} />
                </Grid>
              ))}
            </Grid>

            {/* Paginación */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={Math.ceil(filteredProducts.length / productsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                sx={{
                  '& .MuiPaginationItem-root': {
                    borderRadius: '50%',
                    transition: 'background-color 0.3s',
                  },
                  '& .MuiPaginationItem-root:hover': {
                    backgroundColor: theme.palette.primary.light,
                  },
                }}
              />
            </Box>
          </>
        )}
      </Box>

      {/* Sidebar de Filtros en móvil */}
      <Drawer
        variant="temporary"
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        sx={{
          width: 300,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 300,
            boxSizing: 'border-box',
            borderRight: 'none',
            boxShadow: 3,
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Filtros
          </Typography>
          <TextField
            fullWidth
            label="Nombre"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Precio Mínimo"
            name="minPrice"
            type="number"
            value={filters.minPrice}
            onChange={handleFilterChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Precio Máximo"
            name="maxPrice"
            type="number"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Categoría"
            name="category"
            select
            value={filters.category}
            onChange={handleFilterChange}
            sx={{ mb: 2 }}
          >
            <MenuItem value="">Todas</MenuItem>
            {categories.map((cat, index) => (
              <MenuItem key={index} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            onClick={applyFilters}
            fullWidth
            sx={{ mt: 2, backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.dark }, borderRadius: '8px' }}
          >
            Aplicar Filtros
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default MenuPage;