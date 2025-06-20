// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Header from './component/Header';
// import Home from './component/Home';
// import Category from './component/Category';
// import Types from './component/Types';
// import Banner from './component/Banner';
// import Services from './component/Services';
// import Footer from './component/Footer';
// import Login from './component/Login';
// import Register from './component/Register';
// import Cart from './component/Cart';
// import Products from './component/Products';
// import PaymentPage from './component/Payment';
// import Success from './component/Success';
// import PurchaseHistory from './component/PurchaseHistory';
// import ProductDetails from './component/ProductDetails';

// import { CartProvider } from './Context/CartContext';

// const App = () => {
//   return (
//     <CartProvider>
//       <Router>
//         <Header />

//         <Routes>
//           {/* ✅ Home Page */}
//           <Route
//             path="/"
//             element={
//               <>
//                 <Home />
//                 <Category />
//                 <Types />
//                 <Banner />
//                 <Services />
//               </>
//             }
//           />

//           {/* ✅ Product Pages */}
//           <Route path="/products" element={<Products />} />
//           <Route path="/product/:id" element={<ProductDetails />} />

//           {/* ✅ Auth Pages */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           {/* ✅ Cart / Order Flow */}
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/payment" element={<PaymentPage />} />
//           <Route path="/success" element={<Success />} />
//           <Route path="/orders" element={<PurchaseHistory />} />
//         </Routes>

//         <Footer />
//       </Router>
//     </CartProvider>
//   );
// };

// export default App;



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// import Header from './component/Header';
// import Home from './component/Home';
// import Category from './component/Category';
// import Types from './component/Types';
// import Banner from './component/Banner';
// import Services from './component/Services';
// import Footer from './component/Footer';
// import Login from './component/Login';
// import Register from './component/Register';
// import Cart from './component/Cart';
// import Products from './component/Products';
// import PaymentPage from './component/Payment';
// import Success from './component/Success';
// import PurchaseHistory from './component/PurchaseHistory';
// import ProductDetails from './component/ProductDetails';

// import AdminDashboard from './Admin/Dashboard';


// import { CartProvider } from './Context/CartContext';

// // ✅ Check role from localStorage
// const getUserRole = () => {
//   const user = JSON.parse(localStorage.getItem('loggedInUser'));
//   return user?.role;
// };

// // ✅ Admin route guard
// const ProtectedAdminRoute = ({ children }) => {
//   return getUserRole() === 'admin' ? children : <Navigate to="/" />;
// };

// const App = () => {
//   return (
//     <CartProvider>
//       <Router>
//         <Header />

//         <Routes>
//           <Route
//             path="/"
//             element={
//               <>
//                 <Home />
//                 <Category />
//                 <Types />
//                 <Banner />
//                 <Services />
//               </>
//             }
//           />
//           <Route path="/products" element={<Products />} />
//           <Route path="/product/:id" element={<ProductDetails />} />

//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           <Route path="/cart" element={<Cart />} />
//           <Route path="/payment" element={<PaymentPage />} />
//           <Route path="/success" element={<Success />} />
//           <Route path="/orders" element={<PurchaseHistory />} />
//           <Route
//             path="/admin"
//             element={
//               <ProtectedAdminRoute>
//                 <AdminDashboard />
//               </ProtectedAdminRoute>
//             }
//           />
//         </Routes>

//         <Footer />
//       </Router>
//     </CartProvider>
//   );
// };

// export default App;

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


import { CartProvider } from './Context/CartContext';
import AdminProductPage from './Admin/E-commerce';

// ✅ Check user role from localStorage
const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  return user?.role;
};

// ✅ Admin route protection
const ProtectedAdminRoute = ({ children }) => {
  return getUserRole() === 'admin' ? children : <Navigate to="/" />;
};

// ✅ Layout wrapper to conditionally render header/footer
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
            {/* Public routes */}
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

            {/* Admin routes */}
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
          </Routes>
        </LayoutWrapper>
      </Router>
    </CartProvider>
  );
};

export default App;
