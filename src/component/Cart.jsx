import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, addToCart, decreaseQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const handlePayment = () => {
    navigate('/payment');
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500">Your cart is empty.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between border p-4 rounded">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-gray-600">₹{item.price}</p>
                    <div className="flex items-center mt-2">
                      <button onClick={() => decreaseQuantity(item.id)} className="bg-gray-300 px-2 rounded">-</button>
                      <span className="px-4">{item.quantity}</span>
                      <button onClick={() => addToCart(item)} className="bg-gray-300 px-2 rounded">+</button>
                    </div>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 font-semibold">Remove</button>
              </div>
            ))}
          </div>

          <div className="mt-6 text-right">
            <button 
              onClick={clearCart} 
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Clear Cart
            </button>
          </div>

          <div className="mt-10 text-right">
            <h3 className="text-xl font-bold mb-4">Total: ₹{totalAmount}</h3>
            <button onClick={handlePayment} className="bg-green-500 text-white px-6 py-3 rounded text-lg font-bold hover:bg-green-600 transition">
              Go to Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
