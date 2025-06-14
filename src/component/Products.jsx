import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading products...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow hover:shadow-lg bg-white flex flex-col justify-between">
            <img src={product.image || 'https://via.placeholder.com/150'} alt={product.name} className="w-full h-40 object-cover rounded mb-3" />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
            <p className="text-indigo-600 font-bold text-md mb-3">₹{product.price} <span className='line-through text-xs text-gray-400'>{product.oldprice}</span></p>
            <button onClick={() => addToCart(product)} className="flex items-center justify-center bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
              <FaShoppingCart className="mr-2" /> Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
