import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Header from './component/Header';
import Home from './component/Home';
import Category from './component/Category';
import Types from './component/Types';
import Banner from './component/Banner';
import Services from './component/Services';
import Footer from './component/Footer';
import Login from './component/Login';
import Register from './component/Register';
import Cart from './component/Cart';
import Products from './component/Products';
import PaymentPage from './component/Payment';
import Success from './component/Success';
import PurchaseHistory from './component/PurchaseHistory'; 


import { CartProvider } from './context/CartContext';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Header />
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
                <Footer />
              </>
            }
          />

      
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/success" element={<Success />} />
          <Route path="/orders" element={<PurchaseHistory />} />  

        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
