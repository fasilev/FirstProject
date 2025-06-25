import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

const AdminOrders = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:2084/users');
        const data = await res.json();
        const nonAdmins = data.filter(user => user.role !== 'admin' && user.purchaseHistory);
        setUsers(nonAdmins);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 ml-60">
        <h2 className="text-2xl font-semibold mb-6">Order Management</h2>
        {users.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          users.map(user => (
            <div key={user.id} className="mb-6 bg-white rounded shadow p-4">
              <h3 className="text-lg font-bold text-purple-700">{user.username}'s Orders</h3>
              {user.purchaseHistory && user.purchaseHistory.length > 0 ? (
                user.purchaseHistory.map((order, index) => (
                  <div key={index} className="mt-4 border-t pt-4">
                    <p className="text-sm text-gray-600 mb-2">Date: {order.date}</p>
                    <div className="space-y-3">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-4 border p-3 rounded">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                          <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm">quantity: {item.quantity}</p>
                            <p className="text-sm text-green-700">₹{item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 mt-2">No orders placed yet.</p>
              )}
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default AdminOrders;
