import { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Box,
  useTheme,
  Paper,
} from '@mui/material';
import CategoryService from '../../services/CategoryService';

const AddCategoryPage = () => {
  const theme = useTheme();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    const response = await CategoryService.addCategory(name, description);
    console.log(response)
  };

  return (
    <Container maxWidth="md" className="py-10">
      <Paper
        className="p-6 md:p-10 rounded-lg shadow-lg"
        sx={{ backgroundColor: theme.palette.background.paper }}
      >
        {/* Título del formulario */}
        <Typography
          variant="h4"
          align="center"
          className="font-bold mb-6"
          sx={{ color: theme.palette.text.primary }}
        >
          Crear Nueva Categoría
        </Typography>

        <Grid container spacing={4}>
          {/* Campo: Nombre de la categoría */}
          <Grid item xs={12}>
            <TextField
              label="Nombre de la Categoría"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
              sx={{
                backgroundColor: theme.palette.background.default,
                '& .MuiInputBase-root': {
                  color: theme.palette.text.primary,
                  borderColor: theme.palette.divider,
                },
                '& .MuiInputLabel-root': {
                  color: theme.palette.text.secondary,
                },
              }}
            />
          </Grid>

          {/* Campo: Descripción de la categoría */}
          <Grid item xs={12}>
            <TextField
              label="Descripción"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="normal"
              sx={{
                backgroundColor: theme.palette.background.default,
                '& .MuiInputBase-root': {
                  color: theme.palette.text.primary,
                  borderColor: theme.palette.divider,
                },
                '& .MuiInputLabel-root': {
                  color: theme.palette.text.secondary,
                },
              }}
            />
          </Grid>

          {/* Botón de enviar */}
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ padding: '12px', fontSize: '1rem' }}
            >
              Crear Categoría
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AddCategoryPage;