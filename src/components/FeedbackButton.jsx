import React, { useState, useEffect, useRef } from 'react';
import {
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Rating,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Feedback, Close, Send } from '@mui/icons-material';

const FeedbackFloatingButton = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [rating, setRating] = useState(null);
  const messagesEndRef = useRef(null);

  // Mensaje inicial del sistema
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        text: '¡Hola! ¿Qué te ha parecido nuestra aplicación? Por favor, califícala y cuéntanos tu experiencia.',
        sender: 'system',
        timestamp: new Date()
      }]);
    }
  }, [open]);

  // Auto-scroll al final de los mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    // Agregar mensaje del usuario
    const userMessage = {
      text: message,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');

    // Simular respuesta del sistema después de 1 segundo
    setTimeout(() => {
      if (rating === null) {
        setMessages(prev => [...prev, {
          text: 'Gracias por tu comentario. ¿Podrías calificar nuestra aplicación con estrellas?',
          sender: 'system',
          timestamp: new Date()
        }]);
      } else {
        setMessages(prev => [...prev, {
          text: '¡Gracias por tu feedback y calificación! Tu opinión es muy valiosa para nosotros.',
          sender: 'system',
          timestamp: new Date()
        }]);
      }
    }, 1000);
  };

  const handleSubmit = () => {
    // Aquí puedes agregar la lógica para enviar el feedback a tu backend
    console.log('Feedback enviado:', { rating, messages });
    setOpen(false);
    setMessages([]);
    setRating(null);
    // Mostrar notificación de éxito
    alert('¡Gracias por tu feedback!');
  };

  return (
    <>
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
            zIndex: theme.zIndex.tooltip
          }}
          onClick={() => setOpen(true)}
        >
          <Feedback />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            height: isMobile ? '100%' : '70vh',
            maxHeight: isMobile ? 'none' : '600px',
            position: 'fixed',
            bottom: isMobile ? 0 : 80,
            right: isMobile ? 0 : 20,
            margin: 0,
            width: isMobile ? '100%' : '400px',
            maxWidth: isMobile ? '100%' : 'calc(100% - 40px)'
          }
        }}
      >
        <DialogTitle sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.primary.main,
          py: 1,
          borderBottom: `1px solid ${theme.palette.divider}`
        }}>
          <Typography variant="h6">Feedback</Typography>
          <IconButton 
            onClick={() => setOpen(false)} 
            sx={{ color: theme.palette.text.primary }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          p: 0,
          flexGrow: 1,
          backgroundColor: theme.palette.background.default
        }}>
          <Box sx={{ 
            flexGrow: 1, 
            overflowY: 'auto', 
            p: 2,
            backgroundColor: theme.palette.background.paper
          }}>
            <List sx={{ width: '100%' }}>
              {messages.map((msg, index) => (
                <ListItem 
                  key={index} 
                  alignItems="flex-start"
                  sx={{
                    flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                    px: isMobile ? 1 : 2,
                    py: 1.5
                  }}
                >
                  <ListItemAvatar sx={{ minWidth: '40px' }}>
                    <Avatar sx={{
                      bgcolor: msg.sender === 'user' 
                        ? theme.palette.primary.main 
                        : theme.palette.secondary.main,
                      width: 32,
                      height: 32
                    }}>
                      {msg.sender === 'user' ? 'Tú' : 'S'}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: theme.palette.text.primary,
                          wordBreak: 'break-word'
                        }}
                      >
                        {msg.text}
                      </Typography>
                    }
                    secondary={
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: theme.palette.text.secondary,
                          display: 'block',
                          textAlign: msg.sender === 'user' ? 'right' : 'left'
                        }}
                      >
                        {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </Typography>
                    }
                    sx={{
                      bgcolor: msg.sender === 'user' 
                        ? theme.palette.primary.dark 
                        : theme.palette.background.paper,
                      p: 1.5,
                      borderRadius: 2,
                      maxWidth: isMobile ? '75%' : '80%',
                      ml: msg.sender === 'user' ? 0 : 1,
                      mr: msg.sender === 'user' ? 1 : 0,
                      border: msg.sender === 'user' 
                        ? `1px solid ${theme.palette.primary.main}`
                        : `1px solid ${theme.palette.divider}`,
                    }}
                  />
                </ListItem>
              ))}
              <div ref={messagesEndRef} />
            </List>
          </Box>
          
          <Box sx={{ 
            p: 2, 
            borderTop: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper
          }}>
            {messages.length > 1 && rating === null && (
              <Box sx={{ 
                mb: 2, 
                textAlign: 'center',
                backgroundColor: theme.palette.background.default,
                p: 2,
                borderRadius: 2
              }}>
                <Typography variant="body2" sx={{ mb: 1, color: theme.palette.text.primary }}>
                  ¿Cómo calificarías nuestra aplicación?
                </Typography>
                <Rating
                  value={rating}
                  onChange={(event, newValue) => setRating(newValue)}
                  size="large"
                  sx={{
                    '& .MuiRating-iconFilled': {
                      color: theme.palette.primary.main,
                    },
                    '& .MuiRating-iconHover': {
                      color: theme.palette.primary.light,
                    }
                  }}
                />
              </Box>
            )}
            
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Escribe tu feedback..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: theme.palette.background.default,
                    '& fieldset': {
                      borderColor: theme.palette.divider,
                    },
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: theme.palette.text.primary,
                  }
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSendMessage}
                disabled={!message.trim()}
                sx={{ 
                  minWidth: 'auto',
                  height: '40px',
                  width: '40px'
                }}
              >
                <Send fontSize="small" />
              </Button>
            </Box>
            
            {messages.length > 3 && (
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleSubmit}
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    '&:hover': {
                      backgroundColor: theme.palette.secondary.dark,
                    }
                  }}
                >
                  Enviar feedback
                </Button>
              </Box>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FeedbackFloatingButton;