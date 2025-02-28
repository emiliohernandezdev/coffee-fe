import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import ProductsPage from './pages/ProductsPage';
import { usePersistedTheme } from './hooks/ThemeHook';
import LoginPage from './pages/LoginPage';
import Appbar from './components/AppBar';
import ForgotPasswordPage from './pages/ForgotPwd';
import SignupPage from './pages/SignUp';
import TableMap from './pages/TableMap';
import AddProductPage from './pages/CreateProduct';
import CheckoutPage from './pages/CheckoutPage';
import Callback from './pages/Callback';
import { ToastContainer } from 'react-toastify';
function App() {


  const [darkMode, setDarkMode] = usePersistedTheme();

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <ToastContainer />
      <div className={darkMode ? "dark" : ""}>
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-500">
          <Router>
            <Appbar darkMode={darkMode} handleThemeChange={handleThemeChange}/>

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/recover" element={<ForgotPasswordPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/product/add" element={<AddProductPage />} />
              <Route path="/callback" element={<Callback />} />
              <Route path="/tables" element=
                <TableMap />

             />
            </Routes>
          </Router>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
