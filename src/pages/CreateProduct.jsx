import { useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Box,
  Paper,
  Select,
  MenuItem,
  FormControlLabel,
  IconButton,
  Chip,
  InputAdornment,
  Autocomplete,
  FormControl,
  InputLabel,
  Switch,
  Checkbox,
} from '@mui/material';
import { Snackbar, Alert } from "@mui/material";
import { Add, Delete, CloudUpload } from '@mui/icons-material';
import CategoryService from '../services/CategoryService';
import ProductsService from '../services/ProductsService';

const AddProductPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [available, setAvailable] = useState(true);
  const [options, setOptions] = useState([]);
  const [extras, setExtras] = useState([]);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const getCategories = async () => {
      const result = await CategoryService.getCategories();
      setCategories(result.categories);
    };

    getCategories();
  }, []);

  const handleAddExtra = () => {
    setExtras([...extras, { name: '', price: '', optional: false }]);
  };

  const handleRemoveExtra = (index) => {
    setExtras(extras.filter((_, i) => i !== index));
  };

  const handleAddOption = () => {
    setOptions([...options, { name: '', values: [], required: false }]);
  };

  const handleRemoveOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 3) {
      alert('Solo puedes subir un máximo de 3 imágenes.');
      return;
    }

    const newImages = [...images, ...files];
    setImages(newImages);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);

    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const product = {
        name,
        description,
        price: parseFloat(price),
        available,
        categories: selectedCategories,
        options,
        extras
      };
      console.log(product)
      const result = await ProductsService.addProduct(product);
      const imagesResult = await ProductsService.uploadImages(result.product._id, images);

      setSnackbarMessage("Producto guardado correctamente");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage("Error al guardar el producto");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="lg" className="py-10">
      <Paper className="p-10 rounded-2xl shadow-2xl">
        <Typography variant="h3" align="center" className="font-bold mb-10">
          Crear Producto
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Nombre"
                fullWidth
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                className="mb-4"
              />
              <TextField
                label="Descripción"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                margin="normal"
                className="mb-4"
              />
              <TextField
                label="Precio"
                type="number"
                fullWidth
                variant="outlined"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                margin="normal"
                InputProps={{ startAdornment: <InputAdornment position="start">Q</InputAdornment> }}
                className="mb-4"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth className="mb-4">
                <InputLabel id="categories-label">Categorías</InputLabel>
                <Select
                  labelId="categories-label"
                  label="Categorías"
                  multiple
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
                >
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControlLabel
                control={
                  <Switch
                    checked={available}
                    onChange={(e) => setAvailable(e.target.checked)}
                    color="primary"
                  />
                }
                label="Disponible"
                className="mb-4"
              />
            </Grid>

            {/* Sección 3: Opciones */}
            <Grid item xs={12}>
              <Typography variant="h5" className="mb-4">Opciones</Typography>
              {options.map((option, index) => (
                <Grid container spacing={3} key={index} className="mb-4">
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Nombre"
                      fullWidth
                      value={option.name}
                      onChange={(e) => {
                        const newOptions = [...options];
                        newOptions[index].name = e.target.value;
                        setOptions(newOptions);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      multiple
                      freeSolo
                      options={[]}
                      value={option.values}
                      onChange={(e, newValue) => {
                        const newOptions = [...options];
                        newOptions[index].values = newValue;
                        setOptions(newOptions);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Valores"
                          fullWidth
                        />
                      )}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            key={index}
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={2} className="flex items-center">
                    <FormControlLabel
                      control={<Checkbox checked={option.required} onChange={(e) => {
                        const newOptions = [...options];
                        newOptions[index].required = e.target.checked;
                        setOptions(newOptions);
                      }} />}
                      label="Requerido"
                    />
                    <IconButton onClick={() => handleRemoveOption(index)}>
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Button startIcon={<Add />} onClick={handleAddOption} className="mb-4">
                Agregar Opción
              </Button>
            </Grid>

            {/* Sección 4: Extras */}
            <Grid item xs={12}>
              <Typography variant="h5" className="mb-4">Extras</Typography>
              {extras.map((extra, index) => (
                <Grid container spacing={3} key={index} className="mb-4">
                  <Grid item xs={12} md={5}>
                    <TextField
                      label="Nombre"
                      fullWidth
                      value={extra.name}
                      onChange={(e) => {
                        const newExtras = [...extras];
                        newExtras[index].name = e.target.value;
                        setExtras(newExtras);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={5}>
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
                    />
                  </Grid>
                  <Grid item xs={12} md={2} className="flex items-center">
                    <IconButton onClick={() => handleRemoveExtra(index)}>
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Button startIcon={<Add />} onClick={handleAddExtra} className="mb-4">
                Agregar Extra
              </Button>
            </Grid>

            {/* Sección 5: Imágenes */}
            <Grid item xs={12}>
              <Typography variant="h5" className="mb-4">Imágenes (Máximo 3)</Typography>
              <input
                accept="image/*"
                id="upload-images"
                type="file"
                multiple
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="upload-images">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<CloudUpload />}
                  className="mb-4"
                >
                  Subir imágenes
                </Button>
              </label>
              <br />
              <br />
              {imagePreviews.length > 0 && (
                <Grid container spacing={2} className="mb-4">
                  {imagePreviews.map((preview, index) => (
                    <Grid item key={index}>
                      <Box position="relative" display="inline-block">
                        <img
                          src={preview}
                          alt={`Vista previa ${index + 1}`}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <IconButton
                          size="small"
                          style={{ position: 'absolute', top: 0, right: 0 }}
                          onClick={() => handleRemoveImage(index)}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>

            {/* Sección 6: Botón Guardar */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
              >
                Guardar Producto
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>

  );
};

export default AddProductPage;