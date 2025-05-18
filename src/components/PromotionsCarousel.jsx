import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { apiConfig } from '../services/ApiConfig';
import { useNavigate } from 'react-router-dom';

const PromotionsCarousel = () => {
  const [promotions, setPromotions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await fetch(`${apiConfig.baseURL}/promotion`);
        const data = await response.json();
        setPromotions(data.promotions);
      } catch (error) {
        console.error('Error al cargar promociones:', error);
      }
    };

    fetchPromotions();
  }, []);

  const handleAddPromotion = () => {
    navigate('/promotion/add');
  };

  return (
    <Box sx={{ maxWidth: '100%', margin: '2rem auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ textAlign: 'center' }}>
          Promociones Especiales
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleAddPromotion}
        >
          Agregar Promoción
        </Button>
      </Box>
      
      {promotions.length > 0 ? (
        <Carousel
          showArrows={true}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={5000}
        >
          {promotions.map((promotion) => (
            <Paper
              key={promotion._id}
              sx={{
                position: 'relative',
                height: '400px',
                backgroundImage: `url(${apiConfig.imagesEndpoint}promotions/${promotion.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  bgcolor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  padding: 2,
                }}
              >
                <Typography variant="h5">{promotion.title}</Typography>
                <Typography variant="body1">{promotion.description}</Typography>
                <Typography variant="h6" sx={{ mt: 1 }}>
                  Q{promotion.price}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Carousel>
      ) : (
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          No hay promociones disponibles en este momento.
        </Typography>
      )}
    </Box>
  );
};

export default PromotionsCarousel;