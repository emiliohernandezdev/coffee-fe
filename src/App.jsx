import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme'; // Importa tus temas personalizados
import { CssBaseline, AppBar, Toolbar, Typography } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import { MaterialUISwitch } from './components/CustomComponents';
import ProductsPage from './pages/ProductsPage';
import { usePersistedTheme } from './hooks/ThemeHook'; // Importación correcta

function App() {
  const [darkMode, setDarkMode] = usePersistedTheme(); // Usando el hook personalizado

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className={darkMode ? "dark" : ""}>
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-500">
          <Router>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" className="flex-grow">Mia Cafe</Typography>
                <MaterialUISwitch
                  checked={darkMode !== null ? darkMode : false} // Asegura que sea siempre un valor booleano
                  onChange={handleThemeChange}
                  color="primary"
                  size="medium"
                  inputProps={{ 'aria-label': 'theme switch' }}
                  className="transition duration-300"
                />
              </Toolbar>
            </AppBar>

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
            </Routes>
          </Router>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
