// // import React, { useEffect, useState } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { FaShoppingCart, FaHeart, FaBars, FaTimes } from 'react-icons/fa';
// // import { useCart } from '../Context/CartContext';

// // const Header = () => {
// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const [authMenuOpen, setAuthMenuOpen] = useState(false);
// //   const [loggedInUser, setLoggedInUser] = useState(null);
// //   const navigate = useNavigate();
// //   const { totalItems } = useCart();

// //   useEffect(() => {
// //     const userData = JSON.parse(localStorage.getItem('loggedInUser'));
// //     setLoggedInUser(userData); // no condition needed, update directly
// //   }, [localStorage.getItem("loggedInUser")]); // observe login changes

// //   const handleLogout = () => {
// //     localStorage.removeItem('loggedInUser');
// //     setLoggedInUser(null);
// //     setAuthMenuOpen(false);
// //     navigate('/');
// //   };

// //   const handleLinkClick = () => {
// //     setMenuOpen(false);
// //     setAuthMenuOpen(false);
// //   };

// //   return (
// //     <header className="text-gray-600 body-font shadow-md bg-white sticky top-0 z-50">
// //       <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
// //         <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" onClick={handleLinkClick}>
// //           <span className="ml-3 text-2xl font-bold text-indigo-600">E-lectronics</span>
// //         </Link>

// //         <div className="md:hidden text-2xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
// //           {menuOpen ? <FaTimes /> : <FaBars />}
// //         </div>

// //         <nav className={`md:flex md:items-center md:space-x-6 text-base ${menuOpen ? 'block' : 'hidden'} w-full md:w-auto mt-4 md:mt-0`}>
// //           <Link to="/" onClick={handleLinkClick} className="block md:inline-block hover:text-indigo-600 py-1">Home</Link>
// //           <Link to="#category" onClick={handleLinkClick} className="block md:inline-block hover:text-indigo-600 py-1">Category</Link>
// //           <Link to="/products" onClick={handleLinkClick} className="block md:inline-block hover:text-indigo-600 py-1">All Products</Link>

// //           <div className="flex items-center space-x-6 mt-4 md:mt-0">
// //             <div className="relative">
// //               <Link to="/cart" onClick={handleLinkClick} className="hover:text-indigo-600">
// //                 <FaShoppingCart size={22} />
// //                 {totalItems > 0 && (
// //                   <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 rounded-full">
// //                     {totalItems}
// //                   </span>
// //                 )}
// //               </Link>
// //             </div>

// //             <a href="#" className="hover:text-red-500">
// //               <FaHeart size={20} />
// //             </a>

// //             <div className="relative">
// //               <button
// //                 onClick={() => setAuthMenuOpen(!authMenuOpen)}
// //                 className="bg-gray-100 border px-3 py-1 rounded hover:bg-gray-200"
// //               >
// //                 {loggedInUser ? loggedInUser.username : 'Login'}
// //               </button>

// //               {authMenuOpen && (
// //                 <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow-md z-50">
// //                   {!loggedInUser ? (
// //                     <>
// //                       <Link to="/login" onClick={handleLinkClick} className="block px-4 py-2 hover:bg-gray-100">Login</Link>
// //                       <Link to="/register" onClick={handleLinkClick} className="block px-4 py-2 hover:bg-gray-100">Register</Link>
// //                     </>
// //                   ) : (
// //                     <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
// //                   )}
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </nav>
// //       </div>
// //     </header>
// //   );
// // };

// // export default Header;



// import React, { useEffect, useState, useCallback } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaShoppingCart, FaHeart, FaBars, FaTimes } from 'react-icons/fa';
// import { useCart } from '../Context/CartContext';

// const Header = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [authMenuOpen, setAuthMenuOpen] = useState(false);
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const navigate = useNavigate();
//   const { totalItems } = useCart();

//   // Fix 5: Proper useEffect for localStorage monitoring
//   useEffect(() => {
//     const updateUserData = () => {
//       const userData = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
//       setLoggedInUser(userData);
//     };

//     // Initial load
//     updateUserData();

//     // Listen for storage changes (from other tabs/windows)
//     window.addEventListener('storage', updateUserData);

//     return () => {
//       window.removeEventListener('storage', updateUserData);
//     };
//   }, []);

//   const handleLogout = useCallback(() => {
//     localStorage.removeItem('loggedInUser');
//     setLoggedInUser(null);
//     setAuthMenuOpen(false);
//     navigate('/');
//   }, [navigate]);

//   const handleLinkClick = useCallback(() => {
//     setMenuOpen(false);
//     setAuthMenuOpen(false);
//   }, []);

//   const toggleMenu = useCallback(() => {
//     setMenuOpen(prev => !prev);
//   }, []);

//   const toggleAuthMenu = useCallback(() => {
//     setAuthMenuOpen(prev => !prev);
//   }, []);

//   return (
//     <header className="text-gray-600 body-font shadow-md bg-white sticky top-0 z-50">
//       <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
//         <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" onClick={handleLinkClick}>
//           <span className="ml-3 text-2xl font-bold text-indigo-600">E-lectronics</span>
//         </Link>
        
//         <div className="md:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
//           {menuOpen ? <FaTimes /> : <FaBars />}
//         </div>
        
//         <nav className={`md:flex md:items-center md:space-x-6 text-base ${menuOpen ? 'block' : 'hidden'} w-full md:w-auto mt-4 md:mt-0`}>
//           <Link to="/" onClick={handleLinkClick} className="block md:inline-block hover:text-indigo-600 py-1">Home</Link>
//           <Link to="#category" onClick={handleLinkClick} className="block md:inline-block hover:text-indigo-600 py-1">Category</Link>
//           <Link to="/products" onClick={handleLinkClick} className="block md:inline-block hover:text-indigo-600 py-1">All Products</Link>
          
//           <div className="flex items-center space-x-6 mt-4 md:mt-0">
//             <div className="relative">
//               <Link to="/cart" onClick={handleLinkClick} className="hover:text-indigo-600">
//                 <FaShoppingCart size={22} />
//                 {totalItems > 0 && (
//                   <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 rounded-full">
//                     {totalItems}
//                   </span>
//                 )}
//               </Link>
//             </div>
            
//             <Link to="#" className="hover:text-red-500">
//               <FaHeart size={20} />
//             </Link>
            
//             <div className="relative">
//               <button
//                 onClick={toggleAuthMenu}
//                 className="bg-gray-100 border px-3 py-1 rounded hover:bg-gray-200"
//               >
//                 {loggedInUser ? loggedInUser.username : 'Login'}
//               </button>
//               {authMenuOpen && (
//                 <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow-md z-50">
//                   {!loggedInUser ? (
//                     <>
//                       <Link to="/login" onClick={handleLinkClick} className="block px-4 py-2 hover:bg-gray-100">Login</Link>
//                       <Link to="/register" onClick={handleLinkClick} className="block px-4 py-2 hover:bg-gray-100">Register</Link>
//                     </>
//                   ) : (
//                     <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default React.memo(Header);




import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import { useCart } from '../Context/CartContext';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authMenuOpen, setAuthMenuOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { totalItems } = useCart();

  useEffect(() => {
    const updateUserData = () => {
      const userData = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
      setLoggedInUser(userData);
    };
    updateUserData();
    window.addEventListener('storage', updateUserData);
    return () => {
      window.removeEventListener('storage', updateUserData);
    };
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
    setAuthMenuOpen(false);
    navigate('/');
  }, [navigate]);

  const handleLinkClick = useCallback(() => {
    setMenuOpen(false);
    setAuthMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => !prev);
  }, []);

  const toggleAuthMenu = useCallback(() => {
    setAuthMenuOpen(prev => !prev);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      setMenuOpen(false);
    }
  };

  return (
    <header className="text-gray-600 body-font shadow-md bg-white sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" onClick={handleLinkClick}>
          <span className="ml-3 text-2xl font-bold text-indigo-600">E-lectronics</span>
        </Link>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Full Navigation */}
        <nav className={`md:flex md:items-center text-base ${menuOpen ? 'block' : 'hidden'} w-full md:w-auto mt-4 md:mt-0`}>

          <div className="flex items-center justify-center w-full md:w-auto space-x-4 md:space-x-6">

            <Link to="/" onClick={handleLinkClick} className="hover:text-indigo-600 py-1">Home</Link>

            {/* Center Search */}
            <form onSubmit={handleSearch} className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-full py-1 px-4 focus:outline-none"
              />
              <button type="submit" className="absolute right-3 top-1.5 text-indigo-600">
                <FaSearch />
              </button>
            </form>

            <Link to="/products" onClick={handleLinkClick} className="hover:text-indigo-600 py-1">All Products</Link>

            {/* Cart */}
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

            {/* Wishlist */}
            <Link to="#" className="hover:text-red-500">
              <FaHeart size={20} />
            </Link>

            {/* Login / User */}
            <div className="relative">
              <button onClick={toggleAuthMenu} className="bg-gray-100 border px-3 py-1 rounded hover:bg-gray-200">
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

export default React.memo(Header);
