import { useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Box,
  useTheme,
  Paper,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  IconButton,
  Chip,
  InputAdornment
} from '@mui/material';
import { motion } from 'framer-motion';
import { Add, Delete, PhotoCamera } from '@mui/icons-material';
import CategoryService from '../services/CategoryService';
import ProductsService from '../services/ProductsService';

const AddProductPage = () => {
  const theme = useTheme();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [available, setAvailable] = useState(true);
  const [onSale, setOnSale] = useState(false);
  const [extras, setExtras] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      var result = await CategoryService.getCategories();
      setCategories(result.categories);
    };

    getCategories();
  }, [])

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };

  const handleAddExtra = () => {
    setExtras([...extras, { name: '', price: '' }]);
  };

  const handleRemoveExtra = (index) => {
    const newExtras = extras.filter((_, i) => i !== index);
    setExtras(newExtras);
  };

  const handleSubmit = async(e) => {
    var result = await ProductsService.addProduct(e, name, description, price, available, categories, extras, images);
    console.log(result)
  }

  return (
    <Container maxWidth="md" className="py-10">
      <Paper className="p-6 md:p-10 rounded-lg shadow-lg" sx={{ backgroundColor: theme.palette.background.paper }}>
        <Typography variant="h4" align="center" className="font-bold mb-6" sx={{ color: theme.palette.text.primary }}>
          Agregar Nuevo Producto
        </Typography>

        <Grid container spacing={4}>
          {/* Datos principales */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Nombre del Producto"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-4"
              margin="normal"
              sx={{
                backgroundColor: theme.palette.background.default,
                '& .MuiInputBase-root': {
                  color: theme.palette.text.primary,
                  borderColor: theme.palette.divider,
                },
                '& .MuiInputLabel-root': {
                  color: theme.palette.text.secondary,
                }
              }}
            />
            <TextField
              label="Descripción"
              fullWidth
              multiline
              rows={3}
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
                }
              }}
            />
          </Grid>

          {/* Precio y opciones */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Precio"
              type="number"
              fullWidth
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mb-4"
              margin="normal"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              sx={{
                backgroundColor: theme.palette.background.default,
                '& .MuiInputBase-root': {
                  color: theme.palette.text.primary,
                  borderColor: theme.palette.divider,
                },
                '& .MuiInputLabel-root': {
                  color: theme.palette.text.secondary,
                }
              }}
            />
            {/* <FormControlLabel
              control={<Checkbox checked={onSale} onChange={(e) => setOnSale(e.target.checked)} />}
              label="En oferta"
              sx={{ color: theme.palette.text.primary }}
            /> */}
            <FormControlLabel
              control={<Checkbox checked={available} onChange={(e) => setAvailable(e.target.checked)} />}
              label="Disponible"
              sx={{ color: theme.palette.text.primary }}
            />
          </Grid>

          {/* Categorías */}
          <Grid item xs={12}>
            <Typography variant="h6" className="mb-2" sx={{ color: theme.palette.text.primary }}>
              Categorías
            </Typography>
            <Select
              multiple
              fullWidth
              value={selectedCategories}
              onChange={(e) => setSelectedCategories(e.target.value)}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((id) => {
                    const category = categories.find((cat) => cat._id === id);
                    return category ? <Chip key={id} label={category.name} /> : null;
                  })}
                </Box>
              )}
              sx={{
                backgroundColor: theme.palette.background.default,
                '& .MuiSelect-icon': {
                  color: theme.palette.text.primary,
                },
                '& .MuiInputBase-root': {
                  color: theme.palette.text.primary,
                },
                '& .MuiInputLabel-root': {
                  color: theme.palette.text.secondary,
                },
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          {/* Extras Dinámicos */}
          <Grid item xs={12}>
            <Typography variant="h6" className="mb-2" sx={{ color: theme.palette.text.primary }}>
              Extras
            </Typography>
            {extras.map((extra, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Grid container spacing={2} className="mb-2">
                  <Grid item xs={5}>
                    <TextField
                      label="Nombre del Extra"
                      fullWidth
                      value={extra.name}
                      onChange={(e) => {
                        const newExtras = [...extras];
                        newExtras[index].name = e.target.value;
                        setExtras(newExtras);
                      }}
                      margin="normal"
                      sx={{
                        backgroundColor: theme.palette.background.default,
                        '& .MuiInputBase-root': {
                          color: theme.palette.text.primary,
                          borderColor: theme.palette.divider,
                        },
                        '& .MuiInputLabel-root': {
                          color: theme.palette.text.secondary,
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      label="Precio"
                      type="number"
                      fullWidth
                      value={extra.price}
                      onChange={(e) => {
                        const newExtras = [...extras];
                        newExtras[index].price = e.target.value;
                        setExtras(newExtras);
                      }}
                      margin="normal"
                      sx={{
                        backgroundColor: theme.palette.background.default,
                        '& .MuiInputBase-root': {
                          color: theme.palette.text.primary,
                          borderColor: theme.palette.divider,
                        },
                        '& .MuiInputLabel-root': {
                          color: theme.palette.text.secondary,
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={2} className="flex items-center">
                    <IconButton onClick={() => handleRemoveExtra(index)} sx={{ color: theme.palette.text.primary }}>
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              </motion.div>
            ))}
            <Button startIcon={<Add />} onClick={handleAddExtra} sx={{ color: theme.palette.text.primary }}>
              Agregar Extra
            </Button>
          </Grid>

          {/* Imágenes */}
          <Grid item xs={12}>
            <Typography variant="h6" className="mb-2" sx={{ color: theme.palette.text.primary }}>
              Imágenes del producto
            </Typography>
            <input
              accept="image/*"
              type="file"
              multiple
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button component="span" startIcon={<PhotoCamera />} sx={{ color: theme.palette.text.primary }}>
                Seleccionar Imágenes
              </Button>
            </label>
            <Box className="mt-4 flex gap-2 overflow-auto">
              {images.map((file, index) => (
                <motion.img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="h-20 w-20 object-cover rounded-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </Box>
          </Grid>

          {/* Botón de enviar */}
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary" onClick={handleSubmit}>Agregar Producto</Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AddProductPage;