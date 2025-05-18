import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Input,
  IconButton
} from '@mui/material';
import { PhotoCamera, Delete } from '@mui/icons-material';
import { apiConfig } from '../../services/ApiConfig';
import { useNavigate, useParams } from 'react-router-dom';
import PromotionsService from '../../services/PromotionsService';

const EditPromotion = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    products: [],
    image: null
  });
  const [products, setProducts] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Cargar los productos disponibles
        const productsResponse = await fetch(`${apiConfig.baseURL}/products`);
        const productsData = await productsResponse.json();
        setProducts(productsData.products || []);

        // Cargar los datos de la promoción
        const promotionResponse = await fetch(`${apiConfig.baseURL}/promotion/${id}`);
        const promotionData = await promotionResponse.json();
        const promotion = promotionData.promotion;

        setFormData({
          title: promotion.title,
          description: promotion.description,
          price: promotion.price,
          products: promotion.products.map(product => product._id),
          image: null
        });

        setImagePreview(`${apiConfig.imagesEndpoint}promotions/${promotion.image}`);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleProductsChange = (event) => {
    setFormData(prev => ({
      ...prev,
      products: event.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await PromotionsService.updatePromotion(id, formData);
      navigate('/promotions');
    } catch (error) {
      console.error('Error al actualizar la promoción:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Editar Promoción
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Título"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descripción"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                multiline
                rows={4}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Precio"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Productos Incluidos</InputLabel>
                <Select
                  multiple
                  value={formData.products}
                  onChange={handleProductsChange}
                  input={<Input />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((productId) => {
                        const product = products.find(p => p._id === productId);
                        return product ? (
                          <Chip key={productId} label={product.name} />
                        ) : null;
                      })}
                    </Box>
                  )}
                >
                  {products.map((product) => (
                    <MenuItem key={product._id} value={product._id}>
                      {product.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                startIcon={<PhotoCamera />}
              >
                Cambiar Imagen
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
              {imagePreview && (
                <Box sx={{ mt: 2, position: 'relative', display: 'inline-block' }}>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ maxWidth: '200px', maxHeight: '200px' }}
                  />
                  <IconButton
                    sx={{ position: 'absolute', top: 0, right: 0 }}
                    onClick={() => {
                      setImagePreview(null);
                      setFormData(prev => ({ ...prev, image: null }));
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              )}
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Guardar Cambios
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                onClick={() => navigate('/promotions')}
                sx={{ ml: 2 }}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default EditPromotion;