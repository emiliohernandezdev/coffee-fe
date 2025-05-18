import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Container,
  Box,
  IconButton,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PromotionsService from '../../services/PromotionsService';
import { apiConfig } from '../../services/ApiConfig';

const PromotionsPage = () => {
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [promotionToDelete, setPromotionToDelete] = useState(null);

  const handleEdit = (promotionId) => {
    navigate(`/promotion/edit/${promotionId}`);
  };

  const handlePromotionClick = (promotionId) => {
    navigate(`/promotion/${promotionId}`);
  };

  const handleDeleteClick = (promotion) => {
    setPromotionToDelete(promotion);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (promotionToDelete) {
      try {
        await PromotionsService.deletePromotion(promotionToDelete._id);
        setPromotions(promotions.filter(p => p._id !== promotionToDelete._id));
        setOpenDialog(false);
        setPromotionToDelete(null);
      } catch (error) {
        console.error('Error al eliminar la promoción:', error);
      }
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setPromotionToDelete(null);
  };

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await fetch(`${apiConfig.baseURL}/promotion`);
        const data = await response.json();
        setPromotions(data.promotions || []);
      } catch (error) {
        console.error('Error al cargar promociones:', error);
      }
    };

    fetchPromotions();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Promociones Disponibles
      </Typography>

      <Grid container spacing={3}>
        {promotions.map((promotion) => (
          <Grid item xs={12} sm={6} md={4} key={promotion._id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.02)',
                  transition: 'transform 0.2s ease-in-out'
                }
              }}
              onClick={() => handlePromotionClick(promotion._id)}
            >
              <CardMedia
                component="img"
                height="200"
                image={`${apiConfig.imagesEndpoint}promotions/${promotion.image}`}
                alt={promotion.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {promotion.title}
                </Typography>
                <Typography>
                  {promotion.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                  Q{promotion.price}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Productos incluidos: {promotion.products?.map(product => product.name).join(', ')}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <IconButton 
                  size="small" 
                  onClick={() => handleEdit(promotion._id)}
                  aria-label="editar"
                >
                  <EditIcon />
                </IconButton>
                <IconButton 
                  size="small" 
                  onClick={() => handleDeleteClick(promotion)}
                  aria-label="eliminar"
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {promotions.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No hay promociones disponibles en este momento
          </Typography>
        </Box>
      )}

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¿Confirmar eliminación?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que deseas eliminar la promoción "{promotionToDelete?.title}"? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PromotionsPage;