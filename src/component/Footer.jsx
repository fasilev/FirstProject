import React from 'react';

const Footer = () => {
  return (
    <footer className="text-gray-600 body-font bg-white shadow-inner">
      <div className="container px-5 py-16 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <h2 className="text-2xl font-bold text-indigo-600">E-lectronics</h2>
          <p className="mt-2 text-sm text-gray-500">
            Your one-stop shop for the latest electronics and gadgets.
          </p>
        </div>

        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">

          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">SHOP</h2>
            <nav className="list-none mb-10">
              <li><a className="text-gray-600 hover:text-indigo-600">Laptops</a></li>
              <li><a className="text-gray-600 hover:text-indigo-600">Smartphones</a></li>
              <li><a className="text-gray-600 hover:text-indigo-600">Headphones</a></li>
              <li><a className="text-gray-600 hover:text-indigo-600">Accessories</a></li>
            </nav>
          </div>

          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CUSTOMER SERVICE</h2>
            <nav className="list-none mb-10">
              <li><a className="text-gray-600 hover:text-indigo-600">Order Status</a></li>
              <li><a className="text-gray-600 hover:text-indigo-600">Returns</a></li>
              <li><a className="text-gray-600 hover:text-indigo-600">Shipping</a></li>
              <li><a className="text-gray-600 hover:text-indigo-600">FAQ</a></li>
            </nav>
          </div>


          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">MY ACCOUNT</h2>
            <nav className="list-none mb-10">
              <li><a className="text-gray-600 hover:text-indigo-600">Login</a></li>
              <li><a className="text-gray-600 hover:text-indigo-600">Register</a></li>
              <li><a className="text-gray-600 hover:text-indigo-600">Cart</a></li>
              <li><a className="text-gray-600 hover:text-indigo-600">Purchase History</a></li>
            </nav>
          </div>


          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CONTACT</h2>
            <nav className="list-none mb-10">
              <li><a className="text-gray-600 hover:text-indigo-600">+91 9876543210</a></li>
              <li><a className="text-gray-600 hover:text-indigo-600">support@electronics.com</a></li>
              <li><a className="text-gray-600 hover:text-indigo-600">Palakkad, Kerala</a></li>
            </nav>
          </div>

        </div>
      </div>

      <div className="bg-gray-100">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © 2025 E-lectronics — All rights reserved.
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <a className="text-gray-500"><i className="fab fa-facebook-f"></i></a>
            <a className="ml-3 text-gray-500"><i className="fab fa-twitter"></i></a>
            <a className="ml-3 text-gray-500"><i className="fab fa-instagram"></i></a>
            <a className="ml-3 text-gray-500"><i className="fab fa-linkedin-in"></i></a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
