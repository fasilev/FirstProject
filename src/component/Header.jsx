import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaBars, FaTimes } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authMenuOpen, setAuthMenuOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();
  const { totalItems } = useCart(); 

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('loggedInUser'));
    if (userData) {
      setLoggedInUser(userData);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
    setAuthMenuOpen(false);
    navigate('/');
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
    setAuthMenuOpen(false);
  };

  return (
    <header className="text-gray-600 body-font shadow-md bg-white sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
        <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" onClick={handleLinkClick}>
          <span className="ml-3 text-2xl font-bold text-indigo-600">E-lectronics</span>
        </Link>

        <div className="md:hidden text-2xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <nav className={`md:flex md:items-center md:space-x-6 text-base ${menuOpen ? 'block' : 'hidden'} w-full md:w-auto mt-4 md:mt-0`}>
          <Link to="/" onClick={handleLinkClick} className="block md:inline-block hover:text-indigo-600 py-1">Home</Link>
          <Link to="#category" onClick={handleLinkClick} className="block md:inline-block hover:text-indigo-600 py-1">Category</Link>
          <Link to="/products" onClick={handleLinkClick} className="block md:inline-block hover:text-indigo-600 py-1">All Products</Link>

          <div className="flex items-center space-x-6 mt-4 md:mt-0">

            <div className="relative">
              <Link to="/cart" onClick={handleLinkClick} className="hover:text-indigo-600">
                <FaShoppingCart size={22} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>

            <a href="#" className="hover:text-red-500">
              <FaHeart size={20} />
            </a>

            <div className="relative">
              <button
                onClick={() => setAuthMenuOpen(!authMenuOpen)}
                className="bg-gray-100 border px-3 py-1 rounded hover:bg-gray-200"
              >
                {loggedInUser ? loggedInUser.username : 'Login'}
              </button>

              {authMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow-md z-50">
                  {!loggedInUser ? (
                    <>
                      <Link to="/login" onClick={handleLinkClick} className="block px-4 py-2 hover:bg-gray-100">Login</Link>
                      <Link to="/register" onClick={handleLinkClick} className="block px-4 py-2 hover:bg-gray-100">Register</Link>
                    </>
                  ) : (
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
