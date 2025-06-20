import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const PaymentPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const navigate = useNavigate();
  const { clearCart, cartItems } = useCart();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
      alert("User not logged in");
      return;
    }

    const newOrder = {
      date: new Date().toLocaleString(),
      items: cartItems
    };

    try {
      // Fetch user data
      const userResponse = await fetch(`http://localhost:2084/users/${loggedInUser.id}`);
      const userData = await userResponse.json();

      const previousHistory = userData.purchaseHistory || [];
      const updatedPurchaseHistory = [...previousHistory, newOrder];

      // Update both purchaseHistory and clear cart on backend
      await fetch(`http://localhost:2084/users/${loggedInUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          purchaseHistory: updatedPurchaseHistory,
          cart: []  // clear cart after successful purchase
        }),
      });

      clearCart();  // clear frontend cart context also
      navigate('/success');
    } catch (err) {
      console.error("Error updating purchase history:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
      <form onSubmit={handleSubmit} className="grid gap-6 bg-white shadow-lg rounded-lg p-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Billing Information</h3>
          <input name="fullName" onChange={handleChange} value={formData.fullName} type="text" placeholder="Full Name" className="w-full p-2 border rounded mb-2" required />
          <input name="email" onChange={handleChange} value={formData.email} type="email" placeholder="Email" className="w-full p-2 border rounded mb-2" required />
          <input name="address" onChange={handleChange} value={formData.address} type="text" placeholder="Address" className="w-full p-2 border rounded" required />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Card Details</h3>
          <input name="cardNumber" onChange={handleChange} value={formData.cardNumber} type="text" placeholder="Card Number" className="w-full p-2 border rounded mb-2" required />
          <div className="flex gap-2">
            <input name="expiry" onChange={handleChange} value={formData.expiry} type="text" placeholder="MM/YY" className="w-1/2 p-2 border rounded" required />
            <input name="cvv" onChange={handleChange} value={formData.cvv} type="text" placeholder="CVV" className="w-1/2 p-2 border rounded" required />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
          <div className="flex justify-between">
            <span>Total:</span>
            <span className="font-bold">₹{totalAmount}</span>
          </div>
        </div>

        <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
