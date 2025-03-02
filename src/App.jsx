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
import { ToastContainer } from 'react-toastify';
import { useContext, useEffect } from 'react';
import AddCategoryPage from './pages/categories/CreateCategory';
import { LoaderContext, LoaderProvider } from './context/LoaderContext';
import Loader from './components/Loader';
import { setupInterceptors } from './services/ApiConfig';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import OrderProducts from './pages/orders/OrderProducts';
import OrderSummary from './pages/orders/OrderSummary';
import MenuPage from './pages/products/MenuPage';
import CartPage from './pages/products/CartPage';
import TrackOrderPage from './pages/orders/TrackOrder';
import CheckoutPage from './pages/orders/CheckoutPage';

function urlBase64ToUint8Array(base64string) {
  const padding = '='.repeat((4 - (base64string.length % 4)) % 4);
  const base64 = (base64string + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

async function requestNotificationPermission() {
  const permission = await Notification.requestPermission();
  if (permission == 'granted') {
    return true;
  } else {
    return false;
  }
}

async function subscribeToPush() {
  const publicKey = 'BCUtZ_aXd1MYYCbC7Ve_Zsnh21m7edXI90n_jmt1nujlI9CwiRBEH-XnIoNEyOL9SQSOjfiozMnUxxVulYSVXo0';
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey),
  });
  return subscription;
}

const AppContent = () => {
  const { setLoading } = useContext(LoaderContext);

  useEffect(() => {
    setupInterceptors(setLoading);
  }, [setLoading]);

  const [darkMode, setDarkMode] = usePersistedTheme();

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Loader />
      <CssBaseline />
      <ToastContainer />
      <div className={darkMode ? "dark" : ""}>
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-500">
          <Router>
            <Appbar darkMode={darkMode} handleThemeChange={handleThemeChange} />

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/recover" element={<ForgotPasswordPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/product/add" element={<AddProductPage />} />
              <Route path="/category/add" element={<AddCategoryPage />} />
              <Route path="/tables" element={<TableMap />} />
              <Route path="/order-products" element={<OrderProducts />} />
              <Route path="/order-summary" element={<OrderSummary />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/tracking" element={<TrackOrderPage />} />
            </Routes>
          </Router>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

function App() {
  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('%cService worker registered', 'background-color: green');

          requestNotificationPermission().then((permissionGranted) => {
            if (permissionGranted) {
              subscribeToPush()
                .then((subscription) => {
                  // console.log('Subscripcion generada', subscription);

                  localStorage.setItem('pushSubscription', JSON.stringify(subscription));
                })
                .catch((err) => {
                  console.log('Error al suscribir al usuario ', err);
                });
            }
          });
        })
        .catch((err) => {
          console.error("Error registrando el service worker");
        });
    } else {
      console.warn('El navegador no soporta notificaciones');
    }
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <LoaderProvider>
          <AppContent />
        </LoaderProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;