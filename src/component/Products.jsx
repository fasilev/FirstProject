// import React, { useEffect, useState } from 'react';
// import { FaShoppingCart } from 'react-icons/fa';
// import { useCart } from '../Context/CartContext';

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { addToCart } = useCart();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch('http://localhost:2084/products');
//         const data = await res.json();
//         setProducts(data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Failed to fetch products:', err);
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) {
//     return <div className="text-center py-20 text-gray-500">Loading products...</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-10">
//       <h1 className="text-3xl font-bold text-center mb-8">All Products</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products.map((product) => (
//           <div key={product.id} className="border rounded-lg p-4 shadow hover:shadow-lg bg-white flex flex-col justify-between">
//             <img src={product.image || 'https://via.placeholder.com/150'} alt={product.name} className="w-full h-40 object-cover rounded mb-3" />
//             <h2 className="text-lg font-semibold">{product.name}</h2>
//             <p className="text-gray-600 text-sm mb-2">{product.description}</p>
//             <p className="text-indigo-600 font-bold text-md mb-3">₹{product.price} <span className='line-through text-xs text-gray-400'>{product.oldprice}</span></p>
//             <button onClick={() => addToCart(product)} className="flex items-center justify-center bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
//               <FaShoppingCart className="mr-2" /> Add to Cart
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Products;






import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../Context/CartContext';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:2084/products');
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const selectedProducts = products.slice(startIndex, startIndex + productsPerPage);

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading products...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">All Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {selectedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1 duration-300 flex flex-col justify-between"
          >
            {/* ✅ Link to details page */}
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image || 'https://via.placeholder.com/150'}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-4 hover:opacity-90"
              />
            </Link>

            <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
            <p className="text-indigo-600 font-bold text-md mb-4">
              ₹{product.price}{' '}
              <span className="line-through text-xs text-gray-400">
                ₹{product.oldprice}
              </span>
            </p>
            <button
              onClick={() => addToCart(product)}
              className="flex items-center justify-center bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
            >
              <FaShoppingCart className="mr-2" /> Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {products.length > productsPerPage && (
        <div className="flex justify-center mt-10 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 border rounded ${
                currentPage === i + 1
                  ? 'bg-indigo-600 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
