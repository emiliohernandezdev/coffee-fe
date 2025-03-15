import { useEffect, useState } from 'react';
import { useTheme } from '@emotion/react';
import { ShoppingCart, Search, FilterList } from '@mui/icons-material';
import { Container, Typography, Grid, Button, Card, CardContent, Fab, TextField, MenuItem, Select, InputLabel, FormControl, Paper, Rating, Dialog, DialogActions, DialogContent, DialogTitle, Pagination } from '@mui/material';
import { motion } from 'framer-motion';
import ProductsService from '../services/ProductsService';

const ProductsPage = () => {
  const theme = useTheme();
  const fabBackgroundColor = theme.palette.primary.main;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [page, setPage] = useState(1); 
  const productsPerPage = 6;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [productImages, setProductImages] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await ProductsService.getAvailableProducts();
        setProducts(data.products);
        const images = {};
        for (let product of data.products) {
          try {
            const url = await ProductsService.getProductImage(product._id);
            images[product._id] = url;
          } catch (err) {
            console.error(`Error al obtener la imagen para el producto ${product._id}:`, err);
          }
        }
        setProductImages(images); 
      } catch (err) {
        
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory ? product.category === selectedCategory : true)
  );

  const startIndex = (page - 1) * productsPerPage;
  const selectedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  return (
    <Container className="mt-24">
      <Typography variant="h4" className="text-center text-3xl font-semibold mt-16 mb-6">
        Nuestros productos
      </Typography>
      <br/>
      <div className="flex justify-center space-x-4 mb-8">
        <TextField
          label="Buscar productos"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
          className="max-w-md"
          InputProps={{
            startAdornment: <Search sx={{ color: theme.palette.text.primary }} />
          }}
        />
        <FormControl className="min-w-[200px]">
          <InputLabel>Categoría</InputLabel>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            label="Categoría"
            startAdornment={<FilterList />}
          >
            <MenuItem value="">Todas</MenuItem>
            <MenuItem value="Café">Café</MenuItem>
            <MenuItem value="Pizza">Pizza</MenuItem>
            <MenuItem value="Hamburguesa">Hamburguesa</MenuItem>
            <MenuItem value="Comida">Comida</MenuItem>
            <MenuItem value="Postre">Postre</MenuItem>
            <MenuItem value="Chips">Chips</MenuItem> {/* Nueva categoría */}
          </Select>
        </FormControl>
      </div>

      <Grid container spacing={4} justifyContent="center">
        {selectedProducts.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <motion.div whileHover={{ scale: 1.05 }} className="transition duration-300 ease-in-out">
              <Paper className="shadow-lg rounded-lg overflow-hidden" onClick={() => handleProductClick(product)} style={{ backgroundColor: theme.palette.background.paper }}>
                {/* Mostrar la imagen solo cuando esté disponible */}
                {productImages[product._id] ? (
                  <img src={productImages[product._id]} alt={product.name} className="h-[250px] w-full object-cover" />
                ) : (
                  <div className="h-[250px] w-full bg-gray-300 flex items-center justify-center">
                    <span>Cargando...</span>
                  </div>
                )}
                <CardContent>
                  <Typography variant="h6" className="font-semibold">{product.name}</Typography>
                  <Typography variant="body2" className="mt-2 text-gray-700">
                    {product.description}
                  </Typography>
                  <div className="flex items-center space-x-2 mt-2">
                    <Rating name="read-only" value={product.rating} readOnly precision={0.5} size="small" />
                    <Typography variant="body2" className="text-gray-500">
                      {product.rating} / 5
                    </Typography>
                  </div>
                  <Typography variant="body1" className="mt-2 font-semibold" style={{ color: theme.palette.primary.main }}>
                    Q{product.price}
                  </Typography>
                  <Button variant="contained" color="primary" size="small" className="mt-4">
                    Agregar al Carrito
                  </Button>
                </CardContent>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Paginación */}
      <div className="flex justify-center mt-8">
        <Pagination
          count={Math.ceil(filteredProducts.length / productsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </div>

      {/* Dialogo para mostrar detalles del producto */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{selectedProduct?.name}</DialogTitle>
        <DialogContent>
          {/* Asegurar que la imagen se muestre correctamente */}
          {selectedProduct?.image ? (
            <img src={selectedProduct.image} alt={selectedProduct?.name} className="w-full h-60 object-cover mb-4" />
          ) : (
            <div className="h-60 bg-gray-300 flex items-center justify-center">
              <span>Cargando...</span>
            </div>
          )}
          <Typography variant="body1" color="textSecondary" className="mb-2">
            {selectedProduct?.description}
          </Typography>
          <div className="flex items-center space-x-2">
            <Rating name="read-only" value={selectedProduct?.rating} readOnly precision={0.5} size="small" />
            <Typography variant="body2" className="text-gray-500">
              {selectedProduct?.rating} / 5
            </Typography>
          </div>
          <Typography variant="h6" className="mt-4 font-semibold" style={{ color: theme.palette.primary.main }}>
            ${selectedProduct?.price}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      <Fab
        variant="extended"
        color="primary"
        aria-label="Ordenar"
        sx={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 1000,
          backgroundColor: fabBackgroundColor,
          color: 'white',
        }}
      >
        <ShoppingCart sx={{ mr: 1 }} />
        Ordenar
      </Fab>
    </Container>
  );
};

export default ProductsPage;
