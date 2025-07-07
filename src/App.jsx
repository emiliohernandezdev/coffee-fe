import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import ProductsPage from './pages/ProductsPage';
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
import OrderProducts from './pages/orders/OrderProducts';
import OrderSummary from './pages/orders/OrderSummary';
import MenuPage from './pages/products/MenuPage';
import CartPage from './pages/products/CartPage';
import TrackOrderPage from './pages/orders/TrackOrder';
import CheckoutPage from './pages/orders/CheckoutPage';
import ProfilePage from './pages/users/ProfilePage';
import OrderHistoryPage from './pages/orders/OrderHistory';
import AdminDashboard from './pages/admin/AdminDashboard';
import WaiterView from './pages/waiter/WaiterOrders';
import Callback from './pages/users/SpotifyCallback';
import ProductDetail from './pages/products/ProductDetail';
import ScrollToTop from './components/ScrollToTop';
import { useThemeStore } from './stores/ThemeStore';


const AppContent = () => {
  const { setLoading } = useContext(LoaderContext);

  useEffect(() => {
    setupInterceptors(setLoading);
  }, [setLoading]);

  const darkMode = useThemeStore(state => state.darkMode);
  const setDarkMode = useThemeStore(state => state.setDarkMode);
  const toggleDarkMode = useThemeStore(state => state.toggleDarkMode);

  const handleThemeChange = () => {
    toggleDarkMode();
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Loader />
      <CssBaseline />
      <ToastContainer />
      <div className={darkMode ? "dark" : ""}>
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-500">
          <Router>
            <ScrollToTop />
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
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/order-history" element={<OrderHistoryPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/waiter" element={<WaiterView />} />
              <Route path="/callback" element={<Callback />} />
              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
          </Router>
        </div>
        <Footer />
        {/* <FeedbackFloatingButton /> */}
        {/* <OrderButton /> */}
      </div>
    </ThemeProvider>
  );
};

function App() {

  return (
    <LoaderProvider>
      <AppContent />
    </LoaderProvider>
  );
}

export default App;