import { useTheme } from "@mui/material/styles";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Rating,
  Skeleton,
  Drawer,
  Button,
  Checkbox,
  TextField,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormHelperText,
  IconButton,
  Grid,
  Stack
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ProductsService from "../../services/ProductsService";
import { apiConfig } from "../../services/ApiConfig";
import { useCartStore } from "../../stores/CartStore";

const MenuPage = () => {
  const theme = useTheme();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const addToCart = useCartStore(state => state.addToCart);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});

  // Filtros
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductsService.getAvailableProducts();
        if (data.success) {
          setProducts(data.products);
          setFilteredProducts(data.products);
          const uniqueCategories = [
            ...new Set(
              data.products.flatMap((p) =>
                p.categories.map((c) => c.name)
              )
            ),
          ];
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

  // Abrir modal de producto
  const openModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setNotes("");
    setSelectedExtras([]);
    const initialOptions = {};
    product.options?.forEach((opt) => {
      initialOptions[opt._id] = "";
    });
    setSelectedOptions(initialOptions);
    setErrors({});
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  // Manejo de opciones
  const handleOptionChange = (optionId, value) => {
    setSelectedOptions((prev) => ({ ...prev, [optionId]: value }));
    setErrors((prev) => ({ ...prev, [optionId]: null }));
  };

  // Manejo de extras
  const handleExtraToggle = (extra) => {
    setSelectedExtras((prev) =>
      prev.includes(extra)
        ? prev.filter((e) => e !== extra)
        : [...prev, extra]
    );
  };

  // Manejo de cantidad
  const handleQuantityChange = (newQuantity) => {
    const qty = Math.max(1, newQuantity);
    setQuantity(qty);
    if (qty < 1) {
      setErrors((prev) => ({ ...prev, quantity: "La cantidad debe ser al menos 1" }));
    } else {
      setErrors((prev) => ({ ...prev, quantity: null }));
    }
  };

  // Validación antes de agregar al carrito
  const validate = () => {
    const newErrors = {};
    selectedProduct.options?.forEach((opt) => {
      if (opt.required && !selectedOptions[opt._id]) {
        newErrors[opt._id] = "Esta opción es requerida";
      }
    });
    if (quantity < 1) {
      newErrors.quantity = "La cantidad debe ser al menos 1";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Agregar al carrito
  const handleAddToCart = () => {
    if (!validate()) return;


    addToCart(selectedProduct);
    closeModal();
  };

  // Componente de Filtros
  const FiltersContent = (
    <Box sx={{
      width: { xs: '100%', md: 280 },
      p: 3,
      bgcolor: 'background.paper',
      height: '100%',
      overflowY: 'auto'
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Filtros
        </Typography>
        <IconButton onClick={() => setDrawerOpen(false)} sx={{ display: { md: 'none' } }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Filtro por precio */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
          Rango de precios
        </Typography>
        <Slider
          value={priceRange}
          onChange={(e, newValue) => setPriceRange(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={100}
          sx={{ color: 'primary.main' }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2">Q{priceRange[0]}</Typography>
          <Typography variant="body2">Q{priceRange[1]}</Typography>
        </Box>
      </Box>

      {/* Filtro por categoría */}
      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel>Categoría</InputLabel>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          label="Categoría"
        >
          <MenuItem value="">Todas</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Ordenar por */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
          Ordenar por
        </Typography>
        <RadioGroup
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <FormControlLabel
            value="popular"
            control={<Radio />}
            label="Más popular"
            sx={{ mb: 1 }}
          />
          <FormControlLabel
            value="price-asc"
            control={<Radio />}
            label="Precio: bajo a alto"
            sx={{ mb: 1 }}
          />
          <FormControlLabel
            value="price-desc"
            control={<Radio />}
            label="Precio: alto a bajo"
            sx={{ mb: 1 }}
          />
        </RadioGroup>
      </Box>

      {/* Filtros adicionales */}
      <FormControlLabel
        control={
          <Checkbox
            checked={onlyAvailable}
            onChange={(e) => setOnlyAvailable(e.target.checked)}
          />
        }
        label="Solo disponibles"
        sx={{ mb: 3 }}
      />

      {/* Buscador */}
      <TextField
        fullWidth
        placeholder="Buscar productos..."
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button
        variant="outlined"
        fullWidth
        onClick={() => {
          setPriceRange([0, 100]);
          setSelectedCategory("");
          setSortBy("popular");
          setOnlyAvailable(false);
          setSearchQuery("");
        }}
      >
        Limpiar filtros
      </Button>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Filtros - Desktop */}
      <Box sx={{
        display: { xs: 'none', md: 'block' },
        width: 280,
        borderRight: `1px solid ${theme.palette.divider}`,
        bgcolor: 'background.paper'
      }}>
        {FiltersContent}
      </Box>

      {/* Contenido principal */}
      <Box sx={{ flex: 1, p: { xs: 2, md: 3 } }}>
        {/* Botón de filtros para móvil */}
        <Button
          variant="outlined"
          startIcon={<MenuIcon />}
          onClick={() => setDrawerOpen(true)}
          sx={{ mb: 2, display: { md: 'none' } }}
        >
          Filtros
        </Button>

        {/* Título */}
        <Typography variant="h4" sx={{
          fontWeight: 700,
          mb: 3,
          color: 'text.primary'
        }}>
          Nuestro Menú
        </Typography>

        {/* Lista de productos */}
        {loading ? (
          <Grid container spacing={3}>
            {[...Array(6)].map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ height: '100%' }}>
                  <Skeleton variant="rectangular" height={200} />
                  <CardContent>
                    <Skeleton width="60%" height={30} />
                    <Skeleton width="90%" height={20} sx={{ mt: 1 }} />
                    <Skeleton width="40%" height={20} sx={{ mt: 1 }} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      '&:hover': {
                        boxShadow: theme.shadows[6]
                      }
                    }}
                    onClick={() => openModal(product)}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={`${apiConfig.imagesEndpoint}products/${product.images[0]}`}
                      alt={product.name}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          mb: 1,
                          color: 'text.primary'
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          mb: 2,
                          color: 'text.secondary',
                          height: 40,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical'
                        }}
                      >
                        {product.description}
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                        {product.categories?.map((cat, idx) => (
                          <Chip
                            key={idx}
                            label={cat.name}
                            size="small"
                            sx={{
                              bgcolor: 'primary.light',
                              color: 'primary.contrastText'
                            }}
                          />
                        ))}
                      </Box>

                      <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 700,
                            color: 'primary.main'
                          }}
                        >
                          Q{product.price}
                        </Typography>
                        <Rating
                          value={product.rating || 0}
                          precision={0.5}
                          readOnly
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Drawer de filtros para móvil */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ display: { md: 'none' } }}
      >
        {FiltersContent}
      </Drawer>

      {/* Modal de producto */}
      <Dialog
        open={modalOpen}
        onClose={closeModal}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            bgcolor: 'background.paper'
          }
        }}
      >
        {selectedProduct && (
          <>
            <DialogTitle sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: `1px solid ${theme.palette.divider}`,
              pb: 2,
              pt: 3,
              px: 3
            }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
                {selectedProduct.name}
              </Typography>
              <IconButton
                onClick={closeModal}
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    color: 'text.primary',
                    bgcolor: 'action.hover'
                  }
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent sx={{ p: 3 }}>
              <Grid container spacing={3}>
                {/* Columna de imagen */}
                <Grid item xs={12} md={6}>
                  <Box sx={{
                    borderRadius: 2,
                    overflow: 'hidden',
                    height: 300,
                    bgcolor: 'background.default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px solid ${theme.palette.divider}`
                  }}>
                    <img
                      src={`${apiConfig.imagesEndpoint}products/${selectedProduct.images[0]}`}
                      alt={selectedProduct.name}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain'
                      }}
                    />
                  </Box>
                </Grid>

                {/* Columna de detalles */}
                <Grid item xs={12} md={6}>
                  <Stack spacing={3}>
                    {/* Descripción */}
                    <Box>
                      <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
                        {selectedProduct.description}
                      </Typography>

                      {/* Precio y rating */}
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 2
                      }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          Q{selectedProduct.price.toFixed(2)}
                        </Typography>
                        <Rating
                          value={selectedProduct.rating || 0}
                          precision={0.5}
                          readOnly
                        />
                      </Box>
                    </Box>

                    {/* Opciones */}
                    {selectedProduct.options?.map((option) => (
                      <FormControl
                        key={option._id}
                        fullWidth
                        error={!!errors[option._id]}
                        required={option.required}
                      >
                        <InputLabel>{option.name}</InputLabel>
                        <Select
                          value={selectedOptions[option._id] || ""}
                          onChange={(e) =>
                            handleOptionChange(option._id, e.target.value)
                          }
                          label={option.name}
                          sx={{ borderRadius: 1 }}
                        >
                          <MenuItem value="">
                            <em>Seleccionar...</em>
                          </MenuItem>
                          {option.values.map((val) => (
                            <MenuItem key={val} value={val}>
                              {val}
                            </MenuItem>
                          ))}
                        </Select>
                        {!!errors[option._id] && (
                          <FormHelperText>{errors[option._id]}</FormHelperText>
                        )}
                      </FormControl>
                    ))}

                    {/* Extras */}
                    {selectedProduct.extras?.length > 0 && (
                      <Box>
                        <Typography variant="subtitle1" sx={{ mb: 1 }}>
                          Extras
                        </Typography>
                        <Box sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 1
                        }}>
                          {selectedProduct.extras.map((extra) => (
                            <Chip
                              key={extra._id}
                              label={extra.name}
                              onClick={() => handleExtraToggle(extra.name)}
                              color={selectedExtras.includes(extra.name) ? 'primary' : 'default'}
                              variant={selectedExtras.includes(extra.name) ? 'filled' : 'outlined'}
                              sx={{
                                borderColor: theme.palette.mode === 'dark' ?
                                  selectedExtras.includes(extra.name) ?
                                    'primary.main' : 'divider' : undefined
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                    )}

                    {/* Cantidad - Botones mejorados */}
                    <Box>
                      <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        Cantidad
                      </Typography>
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        width: 'fit-content'
                      }}>
                        <IconButton
                          onClick={() => handleQuantityChange(quantity - 1)}
                          sx={{
                            border: `1px solid ${theme.palette.divider}`,
                            color: theme.palette.text.primary,
                            '&:hover': {
                              bgcolor: 'action.hover',
                              color: theme.palette.primary.main
                            },
                            '&:disabled': {
                              color: theme.palette.text.disabled,
                              borderColor: theme.palette.divider
                            }
                          }}
                          disabled={quantity <= 1}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography variant="h6" sx={{
                          minWidth: 30,
                          textAlign: 'center',
                          color: 'text.primary'
                        }}>
                          {quantity}
                        </Typography>
                        <IconButton
                          onClick={() => handleQuantityChange(quantity + 1)}
                          sx={{
                            border: `1px solid ${theme.palette.divider}`,
                            color: theme.palette.text.primary,
                            '&:hover': {
                              bgcolor: 'action.hover',
                              color: theme.palette.primary.main
                            }
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                      {!!errors.quantity && (
                        <FormHelperText error>{errors.quantity}</FormHelperText>
                      )}
                    </Box>

                    {/* Notas */}
                    <TextField
                      label="Notas adicionales"
                      placeholder="Ej: Sin cebolla, bien cocido, etc."
                      multiline
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      fullWidth
                    />
                  </Stack>
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions sx={{
              borderTop: `1px solid ${theme.palette.divider}`,
              p: 2,
              px: 3
            }}>
              <Button
                onClick={closeModal}
                sx={{ mr: 2 }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                onClick={handleAddToCart}
                startIcon={<AddIcon />}
                sx={{ px: 3 }}
              >
                Agregar al carrito (Q{(selectedProduct.price * quantity).toFixed(2)})
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default MenuPage;