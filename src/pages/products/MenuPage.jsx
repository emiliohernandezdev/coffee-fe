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
  IconButton
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import ProductsService from "../../services/ProductsService";
import { apiConfig } from "../../services/ApiConfig";
import { CartContext } from "../../context/CartContext";

const MenuPage = () => {
  const { palette } = useTheme();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { addToCart } = useContext(CartContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});

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

  // Manejo selección opciones
  const handleOptionChange = (optionId, value) => {
    setSelectedOptions((prev) => ({ ...prev, [optionId]: value }));
    setErrors((prev) => ({ ...prev, [optionId]: null }));
  };

  // Manejo selección extras (checkboxes)
  const handleExtraToggle = (extra) => {
    setSelectedExtras((prev) =>
      prev.includes(extra)
        ? prev.filter((e) => e !== extra)
        : [...prev, extra]
    );
  };

  // Validar antes de agregar
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

  // Agregar al carrito (aquí solo demo)
  const handleAddToCart = () => {

    addToCart(selectedProduct);

    closeModal();
  };

  const FiltersContent = (
    <Box
      className="w-64 p-6"
      style={{ backgroundColor: palette.background.paper }}
    >
      <Typography
        variant="h5"
        component="div"
        className="text-gray-800 dark:text-white mb-6 font-bold"
      >
        Menú
      </Typography>
      <Divider className="mb-4" />

      <Typography className="text-gray-700 dark:text-neutral-300 mb-2 font-medium">
        Filtrar por precio
      </Typography>
      <Slider valueLabelDisplay="auto" min={0} max={100} className="mb-6" />

      <FormControl fullWidth className="mb-6">
        <InputLabel className="text-gray-700 dark:text-neutral-300">
          Categoría
        </InputLabel>
        <Select defaultValue="">
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography className="text-gray-700 dark:text-neutral-300 mb-2 font-medium">
        Ordenar por
      </Typography>
      <RadioGroup defaultValue="popular" className="mb-4">
        <FormControlLabel
          value="popular"
          control={<Radio />}
          label="Más popular"
        />
        <FormControlLabel
          value="price-asc"
          control={<Radio />}
          label="Precio: bajo a alto"
        />
        <FormControlLabel
          value="price-desc"
          control={<Radio />}
          label="Precio: alto a bajo"
        />
      </RadioGroup>

      <Typography className="text-gray-700 dark:text-neutral-300 mb-2 font-medium">
        Disponibilidad
      </Typography>
      <FormControlLabel control={<Checkbox />} label="Solo disponibles" className="mb-4" />

      <Typography className="text-gray-700 dark:text-neutral-300 mb-2 font-medium">
        Buscar por nombre
      </Typography>
      <TextField
        fullWidth
        placeholder="Buscar..."
        variant="outlined"
        size="small"
        className="mb-6"
      />
    </Box>
  );

  return (
    <Box className="flex flex-col md:flex-row min-h-screen">
      {/* Botón para abrir drawer en modo móvil */}
      <Box className="md:hidden p-4">
        <Button
          variant="outlined"
          startIcon={<MenuIcon className="text-gray-800 dark:text-white" />}
          onClick={() => setDrawerOpen(true)}
        >
          Filtros
        </Button>
      </Box>

      {/* Sidebar en escritorio */}
      <Box className="hidden md:block w-64 shadow-md">
        {FiltersContent}
      </Box>

      {/* Drawer para móviles */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {FiltersContent}
      </Drawer>

      {/* Contenido principal */}
      <Box className="flex-1 p-4 md:p-6">
        {loading ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <Card
                key={index}
                className="rounded-2xl shadow-xl overflow-hidden"
              >
                <Skeleton variant="rectangular" height={208} />
                <CardContent>
                  <Skeleton width="60%" />
                  <Skeleton width="90%" />
                  <Skeleton width="40%" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <motion.div
                key={product._id}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl shadow-xl overflow-hidden bg-white dark:bg-neutral-800 cursor-pointer"
                onClick={() => openModal(product)}
              >
                <Card className="!bg-transparent shadow-none">
                  <CardMedia
                    component="img"
                    height="200"
                    image={`${apiConfig.imagesEndpoint.concat(
                      "products/"
                    )}${product.images[0]}`}
                    alt={product.name}
                    className="object-cover w-full h-52"
                  />
                  <CardContent className="space-y-2">
                    <Typography
                      variant="h6"
                      component="div"
                      className="text-gray-900 dark:text-white font-semibold truncate"
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-gray-600 dark:text-neutral-400 line-clamp-2"
                    >
                      {product.description}
                    </Typography>
                    <Box className="flex flex-wrap gap-1">
                      {product.categories?.map((cat, idx) => (
                        <Chip
                          key={idx}
                          label={cat.name}
                          size="small"
                          className="!text-sm !bg-neutral-200 dark:!bg-neutral-700 !text-black dark:!text-white"
                        />
                      ))}
                    </Box>
                    <Box className="flex items-center justify-between pt-2">
                      <Typography
                        variant="subtitle1"
                        className="text-primary font-bold"
                      >
                        Q{product.price}
                      </Typography>
                      <Rating
                        name="product-rating"
                        value={product.rating || 0}
                        precision={0.5}
                        readOnly
                        size="small"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </Box>

      {/* Modal de producto */}
      <Dialog open={modalOpen} onClose={closeModal} maxWidth="sm" fullWidth>
        {selectedProduct && (
          <>
            <DialogTitle>{selectedProduct.name}</DialogTitle>
            <DialogContent dividers>
              <Box mb={2}>
                <img
                  src={`${apiConfig.imagesEndpoint}products/${selectedProduct.images[0]}`}
                  alt={selectedProduct.name}
                  style={{
                        maxWidth: "200px",
                        maxHeight: "200px",
                        objectFit: "cover",
                        display: "block",
                        margin: "0 auto 1rem",
                        borderRadius: 8
                    }}
                />
              </Box>
              <Typography variant="body1" paragraph>
                {selectedProduct.description}
              </Typography>

              <Typography variant="h6" gutterBottom>
                Precio: Q{selectedProduct.price}
              </Typography>
              <Rating
                name="product-rating"
                value={selectedProduct.rating || 0}
                precision={0.5}
                readOnly
                size="medium"
              />

              {/* Opciones */}
              {selectedProduct.options?.map((option) => (
                <FormControl
                  key={option._id}
                  fullWidth
                  margin="normal"
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
                <Box mt={2} mb={1}>
                  <Typography variant="subtitle1">Extras:</Typography>
                  {selectedProduct.extras.map((extra) => (
                    <FormControlLabel
                      key={extra._id}
                      control={
                        <Checkbox
                          checked={selectedExtras.includes(extra.name)}
                          onChange={() => handleExtraToggle(extra.name)}
                        />
                      }
                      label={extra.name}
                    />
                  ))}
                </Box>
              )}

              {/* Cantidad */}
              <TextField
                type="number"
                label="Cantidad"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                inputProps={{ min: 1 }}
                fullWidth
                margin="normal"
                error={!!errors.quantity}
                helperText={errors.quantity}
              />

              {/* Notas */}
              <TextField
                label="Notas adicionales"
                multiline
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                fullWidth
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={closeModal}>Cancelar</Button>
              <Button variant="contained" onClick={handleAddToCart}>
                Agregar al carrito
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default MenuPage;
