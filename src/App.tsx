import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout';
import AboutPage from './pages/AboutPage';
import MainPage from './pages/MainPage';
import ProductsPage from './pages/ProductsPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export default App
 