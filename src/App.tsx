import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout';
import AboutPage from './pages/AboutPage';
import MainPage from './pages/MainPage';
import ProductsPage from './pages/ProductsPage';
import ProductPage from './pages/ProductPage';
import OrderPage from './pages/OrderPage';
import DeliveryPage from './pages/DeliveryPage';
import SignUpPage from './pages/SignUpPage';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/:{slug}/delivery" element={<DeliveryPage />} />
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export default App
