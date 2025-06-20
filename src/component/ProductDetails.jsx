import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { cartItems, addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:2084/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (type) => {
    setQuantity((prevQty) => {
      if (type === 'inc') return prevQty + 1;
      if (type === 'dec' && prevQty > 1) return prevQty - 1;
      return prevQty;
    });
  };

  const handleAddToCart = () => {
    const item = { ...product, quantity };
    addToCart(item);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/payment');
  };

  if (!product) {
    return <div className="text-center py-20 text-gray-500">Loading product details...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Image */}
      <div className="flex flex-col items-center">
        <img
          src={product.image || 'https://via.placeholder.com/400'}
          alt={product.name}
          className="w-full max-w-md object-cover rounded-lg shadow"
        />
        <div className="flex gap-2 mt-4">
          <img src={product.image} alt="thumb" className="w-16 h-16 border rounded" />
          <img src={product.image} alt="thumb" className="w-16 h-16 border rounded" />
        </div>
      </div>

      {/* Info */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p className="text-gray-600">{product.description}</p>

        <div className="text-2xl font-semibold text-indigo-600">
          ₹{product.price}
          <span className="text-sm text-gray-400 line-through ml-2">₹{product.oldprice}</span>
        </div>

        {/* Quantity control */}
        <div className="flex items-center gap-4 mt-4">
          <button onClick={() => handleQuantityChange('dec')} className="bg-gray-300 px-2 rounded">-</button>
          <span>{quantity}</span>
          <button onClick={() => handleQuantityChange('inc')} className="bg-gray-300 px-2 rounded">+</button>
        </div>

        {/* Offers */}
        <div className="space-y-1 text-sm mt-4">
          <p className="text-green-600">✔ Free Delivery</p>
          <p className="text-yellow-600">✔ Cash on Delivery Available</p>
          <p className="text-blue-600">✔ 1 Year Warranty</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleAddToCart}
            className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-500"
          >
            <FaShoppingCart className="inline mr-2" />
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
          >
            Buy Now
          </button>
        </div>

        {/* Delivery Info */}
        <div className="text-sm mt-6">
          <p><strong>Warranty:</strong> 1 Year Replacement</p>
          <p><strong>Delivery:</strong> Estimated 3–5 days</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
