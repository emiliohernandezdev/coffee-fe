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
  Chip,
} from "@mui/material";
import { ChevronLeft, ChevronRight, Search, Add, FilterList, LocalOffer } from "@mui/icons-material";
import { motion } from "framer-motion";
import ProductsService from "../../services/ProductsService";

const MenuPage = () => {
  const theme = useTheme();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    minPrice: "",
    maxPrice: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductsService.getAvailableProducts();
        if (data.success) {
          setProducts(data.products);
          setFilteredProducts(data.products);
        }

        const uniqueCategories = [...new Set(data.products.map((p) => p.category))];
        setCategories(uniqueCategories);
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
      result = result.filter((p) => p.category === filters.category);
    }

    setFilteredProducts(result);
    setCurrentPage(1);
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

  const ProductCard = ({ product }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleNextImage = () => {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    };

    const handlePrevImage = () => {
      setCurrentImageIndex(
        (prev) => (prev - 1 + product.images.length) % product.images.length
      );
    };

    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="relative h-96 overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-300">
          {/* Carrusel de imágenes */}
          <CardMedia
            component="img"
            className="h-48 object-cover rounded-t-lg"
            image={product.images[currentImageIndex]}
            alt={product.name}
          />
          {/* Botones del carrusel */}
          {product.images.length > 1 && (
            <div className="absolute top-0 left-0 right-0 flex justify-between p-2">
              <IconButton onClick={handlePrevImage} className="text-white bg-black/50 hover:bg-black/70 transition-all">
                <ChevronLeft />
              </IconButton>
              <IconButton onClick={handleNextImage} className="text-white bg-black/50 hover:bg-black/70 transition-all">
                <ChevronRight />
              </IconButton>
            </div>
          )}
          {/* Contenido de la tarjeta */}
          <CardContent className="p-4">
            <Typography variant="h6" className="font-semibold text-gray-800 hover:text-gray-900 transition-all">
              {product.name}
            </Typography>
            <Typography variant="body2" className="text-gray-600 mt-2">
              {product.description}
            </Typography>
            <Typography variant="body1" className="mt-2 font-bold text-primary">
              ${product.price.toFixed(2)}
            </Typography>
            {/* Botón de agregar al carrito */}
            <Button
              variant="contained"
              startIcon={<Add />}
              className="mt-4 w-full text-white bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 hover:from-blue-500 hover:via-purple-600 hover:to-pink-500 transition-all"
            >
              Agregar al carrito
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="p-8">
      {/* Título */}
      <Typography variant="h4" className="text-center mb-8 font-bold text-gray-900">
        Menú de la Cafetería
      </Typography>

      {/* Filtros en una barra organizada */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 rounded-xl shadow-lg mb-8" style={{ backgroundColor: theme.palette.background.paper }}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="name"
                  value={filters.name}
                  onChange={handleFilterChange}
                  sx={{
                    backgroundColor: theme.palette.background.default,
                    borderRadius: "8px",
                  }}
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
                  sx={{
                    backgroundColor: theme.palette.background.default,
                    borderRadius: "8px",
                  }}
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
                  sx={{
                    backgroundColor: theme.palette.background.default,
                    borderRadius: "8px",
                  }}
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
                  sx={{
                    backgroundColor: theme.palette.background.default,
                    borderRadius: "8px",
                  }}
                >
                  <MenuItem value="">Todas</MenuItem>
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  variant="contained"
                  onClick={applyFilters}
                  startIcon={<Search />}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    "&:hover": { backgroundColor: theme.palette.primary.dark },
                    borderRadius: "8px",
                  }}
                >
                  Buscar
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </motion.div>

      {/* Lista de Productos */}
      {loading ? (
        <Grid container spacing={4} className="mt-4">
          {[...Array(productsPerPage)].map((_, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Skeleton variant="rectangular" className="h-96 rounded-xl shadow-lg" />
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          <Grid container spacing={4} className="mt-4">
            {currentProducts.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>

          {/* Paginación */}
          <div className="flex justify-center mt-8">
            <Pagination
              count={Math.ceil(filteredProducts.length / productsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              sx={{
                "& .MuiPaginationItem-root": {
                  borderRadius: "50%",
                  transition: "background-color 0.3s",
                },
                "& .MuiPaginationItem-root:hover": {
                  backgroundColor: theme.palette.primary.light,
                },
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MenuPage;