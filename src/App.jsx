import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Header from './component/Header';
import Footer from './component/Footer';

import Home from './component/Home';
import Category from './component/Category';
import Types from './component/Types';
import Banner from './component/Banner';
import Services from './component/Services';
import Login from './component/Login';
import Register from './component/Register';
import Cart from './component/Cart';
import Products from './component/Products';
import PaymentPage from './component/Payment';
import Success from './component/Success';
import PurchaseHistory from './component/PurchaseHistory';
import ProductDetails from './component/ProductDetails';

import Dashboard from './Admin/Dashboard';
import AdminProductPage from './Admin/E-commerce';
import AdminOrders from './Admin/Orders';

import { CartProvider } from './Context/CartContext';

const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  return user?.role;
};

const ProtectedAdminRoute = ({ children }) => {
  return getUserRole() === 'admin' ? children : <Navigate to="/" />;
};

const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  return (
    <>
      {!isAdminPage && <Header />}
      {children}
      {!isAdminPage && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <CartProvider>
      <Router>
        <LayoutWrapper>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <Category />
                  <Types />
                  <Banner />
                  <Services />
                </>
              }
            />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/success" element={<Success />} />
            <Route path="/orders" element={<PurchaseHistory />} />

            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <Dashboard />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <ProtectedAdminRoute>
                  <AdminProductPage />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProtectedAdminRoute>
                  <AdminOrders />
                </ProtectedAdminRoute>
              }
            />
          </Routes>
        </LayoutWrapper>
      </Router>
    </CartProvider>
  );
};

export default App;
