import { Box, CircularProgress, Typography } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import { LoaderContext } from '../context/LoaderContext';

const messages = [
  'Preparando el café...',
  'Moliendo granos de satisfacción...',
  'El café está en el proceso...',
  'En breves te servimos un buen espresso...',
  'Cargando tu dosis de energía...',
  'Concentrando el aroma del café...',
  'Un espresso para tu paciencia...',
  'Preparando el mejor café de la casa...',
  '¿Listo para el café? Estamos casi ahí...',
  '¡Tu café está en camino!',
];

const Loader = () => {
  const [message, setMessage] = useState('');
  const { loading } = useContext(LoaderContext);

  // Función para obtener un mensaje aleatorio
  const getRandomMessage = () => {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setMessage(randomMessage);
  };

  // Cambiar mensaje cada 3 segundos
  useEffect(() => {
    getRandomMessage();
    const interval = setInterval(getRandomMessage, 3000);
    return () => clearInterval(interval);
  }, []);

  if(!loading) return null;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.9)', // Fondo negro semi-transparente
        zIndex: 9999, // Asegúrate de que se muestre sobre otros elementos
      }}
    >
      <Box textAlign="center" sx={{ color: 'white' }}>
        {/* Spinner de Material UI */}
        <CircularProgress color="inherit" size={50} />
        <Typography
          variant="h6"
          sx={{ marginTop: '20px', color: 'white', fontWeight: 'bold' }}
        >
          {message}
        </Typography>
      </Box>
    </Box>
  );
};

export default Loader;
