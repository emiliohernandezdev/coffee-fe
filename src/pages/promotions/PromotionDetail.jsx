import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Container,
  Grid,
  Chip,
  Button,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
} from '@mui/material';
import { CartContext } from '../../context/CartContext';
import { apiConfig } from '../../services/ApiConfig';

const PromotionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { addToCart } = useContext(CartContext);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [promotion, setPromotion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromotion = async () => {
      try {
        const response = await fetch(`${apiConfig.baseURL}/promotion/${id}`);
        const data = await response.json();
        if (data.success) {
          setPromotion(data.promotion);
        } else {
          navigate('/promotions');
        }
      } catch (error) {
        console.error('Error al cargar la promoción:', error);
        navigate('/promotions');
      } finally {
        setLoading(false);
      }
    };

    fetchPromotion();
  }, [id, navigate]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Cargando...</Typography>
      </Container>
    );
  }

  if (!promotion) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Promoción no encontrada.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row', gap: 3 }}>
        {/* Imagen y detalles principales */}
        <Box sx={{ flex: 1 }}>
          <Card sx={{ borderRadius: '12px', boxShadow: 3, overflow: 'hidden' }}>
            <CardMedia
              component="img"
              sx={{ width: '100%', height: 400, objectFit: 'cover' }}
              image={`${apiConfig.imagesEndpoint}promotions/${promotion.image}`}
              alt={promotion.title}
            />
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                {promotion.title}
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {promotion.description}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.primary.main, mb: 3 }}>
                Q{promotion.price.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Productos incluidos */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Productos Incluidos
          </Typography>
          <Grid container spacing={2}>
            {promotion.products?.map((product) => (
              <Grid item xs={12} key={product._id}>
                <Card sx={{ display: 'flex', height: '100%' }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 120, objectFit: 'cover' }}
                    image={`${apiConfig.imagesEndpoint}products/${product.images[0]}`}
                    alt={product.name}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {product.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {product.categories?.map((category) => (
                        <Chip
                          key={category._id}
                          label={category.name}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => navigate('/promotions')}
            >
              Volver a Promociones
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                addToCart({
                  _id: promotion._id,
                  name: promotion.title,
                  price: promotion.price,
                  images: [promotion.image],
                  description: promotion.description,
                  isPromotion: true,
                  products: promotion.products
                });
                setOpenSnackbar(true);
              }}
            >
              Agregar al Carrito
            </Button>
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Promoción agregada al carrito
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PromotionDetail;