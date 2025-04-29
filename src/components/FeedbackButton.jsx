import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Feedback } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const FeedbackFloatingButton = () => {
  const theme = useTheme();

  return (
    <Tooltip title="Enviar feedback" placement="left">
      <IconButton
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
          boxShadow: 3,
        }}
        onClick={() => {
          // Lógica para abrir el formulario de feedback
          console.log('Abrir formulario de feedback');
        }}
      >
        <Feedback />
      </IconButton>
    </Tooltip>
  );
};

export default FeedbackFloatingButton;