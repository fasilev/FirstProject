import React, { useEffect, useState } from 'react';

const PurchaseHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('loggedInUser'));
    if (userData) {
      fetch(`http://localhost:2084/users/${userData.id}`)
        .then(res => res.json())
        .then(data => setOrders(data.orders || []));
    }
  }, []);

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">My Purchase History</h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">No previous orders found.</div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {orders.map(order => (
            <div key={order.id} className="border border-gray-300 rounded-lg shadow-lg p-6 bg-white">
              <div className="flex justify-between mb-4">
                <div>
                  <p className="font-semibold text-gray-700">Order ID: <span className="text-gray-500">{order.id}</span></p>
                  <p className="font-semibold text-gray-700">Date: <span className="text-gray-500">{order.date}</span></p>
                </div>
                <div className="text-right font-bold text-lg text-green-600">₹{order.total}</div>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-gray-700">Items:</h3>
                <ul className="divide-y divide-gray-200">
                  {order.items.map(item => (
                    <li key={item.id} className="py-2 flex justify-between">
                      <span className="text-gray-600">{item.name} × {item.quantity}</span>
                      <span className="text-gray-500">₹{item.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PurchaseHistory;
