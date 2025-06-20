import React, { useEffect, useState } from 'react';

const PurchaseHistory = () => {
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await fetch(`http://localhost:2084/users/1`); // Replace 1 with dynamic ID if needed
      const data = await res.json();
      setUser(data);
      setHistory(data.purchaseHistory || []);
    };
    fetchHistory();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-2">Purchase History</h1>
      {user && (
        <p className="text-gray-600 mb-6">
          User: <span className="font-semibold">{user.username}</span>
        </p>
      )}

      {history.length === 0 ? (
        <p className="text-gray-500">No purchases yet.</p>
      ) : (
        history.map((order, index) => (
          <div key={index} className="mb-6 border p-4 rounded-lg shadow-sm">
            <p className="font-medium text-gray-700 mb-2">Date: {order.date}</p>
            <div className="grid md:grid-cols-2 gap-4">
              {order.items.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <p className="text-indigo-600 font-bold">₹{item.price}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PurchaseHistory;
