import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
  Chip,
  Rating,
  FormGroup,
} from "@mui/material";
import { ChevronLeft, ChevronRight, ShoppingCart } from "@mui/icons-material";
import ProductsService from "../../services/ProductsService";
import { apiConfig } from "../../services/ApiConfig";
import { CartContext } from "../../context/CartContext";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [product, setProduct] = useState(null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await ProductsService.getProductById(id);
        if (data.success) {
          setProduct(data.product);
        } else {
          navigate("/"); // Redirigir al menú si el producto no existe
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        navigate("/"); // Redirigir al menú en caso de error
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleExtraChange = (extraId) => (e) => {
    const { checked } = e.target;
    setSelectedExtras((prev) =>
      checked ? [...prev, extraId] : prev.filter((id) => id !== extraId)
    );
  };

  const handleOptionChange = (optionName, value) => {
    setSelectedOptions((prev) => ({ ...prev, [optionName]: value }));
  };

  const handleAddToCart = () => {
    if (!product) return;

    // Crear el objeto del producto con extras, opciones y notas
    const productWithExtrasAndOptions = {
      ...product,
      _id: product._id, // Usar _id en lugar de id
      selectedExtras: selectedExtras,
      selectedOptions: selectedOptions,
      notes: notes,
      quantity: 1, // Asignar una cantidad inicial de 1
    };

    // Agregar el producto al carrito
    addToCart(productWithExtrasAndOptions);

    // Redirigir al menú después de agregar al carrito
    navigate("/");
  };

  if (loading) {
    return <Typography>Cargando...</Typography>;
  }

  if (!product) {
    return <Typography>Producto no encontrado.</Typography>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", gap: 3 }}>
        {/* Tarjeta del producto */}
        <Box sx={{ flex: 1 }}>
          <Card sx={{ borderRadius: '12px', boxShadow: 3, overflow: 'hidden' }}>
            <Box sx={{ position: 'relative', width: '100%', height: 300, overflow: 'hidden' }}>
              <CardMedia
                component="img"
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                image={`${apiConfig.imagesEndpoint.concat('products/')}${product.images[0]}`}
                alt={product.name}
              />
              {product.images?.length > 1 && (
                <Box sx={{ position: 'absolute', top: 8, left: 8, right: 8, display: 'flex', justifyContent: 'space-between' }}>
                  <IconButton onClick={() => {}} size="small" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white' }}>
                    <ChevronLeft />
                  </IconButton>
                  <IconButton onClick={() => {}} size="small" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white' }}>
                    <ChevronRight />
                  </IconButton>
                </Box>
              )}
            </Box>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                {product.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {product.description}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {product.categories?.map((cat) => (
                  <Chip key={cat._id} label={cat.name} size="small" />
                ))}
              </Box>
              <Rating value={product.rating} precision={0.5} readOnly sx={{ mb: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.primary.main, mb: 2 }}>
                Q{product.price.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Formulario de opciones y extras */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Opciones del producto */}
          {product.options?.length > 0 &&
            product.options.map((option) => (
              <FormControl key={option.name} component="fieldset" sx={{ mb: 2 }}>
                <FormLabel component="legend">{option.name}</FormLabel>
                <RadioGroup
                  value={selectedOptions[option.name] || ""}
                  onChange={(e) => handleOptionChange(option.name, e.target.value)}
                >
                  {option.values.map((value) => (
                    <FormControlLabel
                      key={value}
                      value={value}
                      control={<Radio />}
                      label={value}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            ))}

          {/* Extras del producto */}
          {product.extras?.length > 0 && (
            <FormControl component="fieldset" sx={{ mb: 2 }}>
              <FormLabel component="legend">Extras</FormLabel>
              <FormGroup>
                {product.extras.map((extra) => (
                  <FormControlLabel
                    key={extra._id}
                    control={
                      <Checkbox
                        checked={selectedExtras.includes(extra._id)}
                        onChange={handleExtraChange(extra._id)}
                      />
                    }
                    label={`${extra.name} (+Q${extra.price.toFixed(2)})`}
                  />
                ))}
              </FormGroup>
            </FormControl>
          )}

          {/* Textarea para notas */}
          <TextField
            label="Notas adicionales"
            multiline
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />

          {/* Botón para agregar al carrito */}
          <Button
            variant="contained"
            startIcon={<ShoppingCart />}
            onClick={handleAddToCart}
            fullWidth
            sx={{ backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.dark }, borderRadius: '8px' }}
          >
            Agregar al carrito
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetailPage;