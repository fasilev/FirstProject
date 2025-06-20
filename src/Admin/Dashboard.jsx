import React, { useState } from 'react';

const users = [
  {
    name: "Erwin E. Brown",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Madeline Kennedy",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "George A. Llanes",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Rafell John",
    avatar: "https://randomuser.me/api/portraits/men/19.jpg",
  },
];

const Dashboard = () => {
  const [blocked, setBlocked] = useState([]);

  const toggleBlock = (name) => {
    setBlocked((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans">
      {/* Monthly Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Monthly Statistics</h2>
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">Bounce Rate</p>
              <p className="text-red-600 font-bold text-lg">23.32%</p>
            </div>
            <div>
              <p className="text-gray-500">Page Views</p>
              <p className="text-blue-600 font-bold text-lg">42.32%</p>
            </div>
          </div>
          <div className="mt-4 h-32 bg-gray-100 rounded"></div> {/* placeholder chart */}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Revenue Overview</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-gray-500">Sales</p>
              <p className="text-red-600 font-bold text-xl">65.00%</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500">Purchases</p>
              <p className="text-yellow-600 font-bold text-xl">80.26%</p>
            </div>
          </div>
        </div>
      </div>

      {/* User List with Block/Unblock */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Users</h2>
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.name}
              className="flex items-center justify-between bg-gray-50 p-3 rounded hover:bg-gray-100"
            >
              <div className="flex items-center gap-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border"
                />
                <span className="font-medium text-gray-800">{user.name}</span>
              </div>
              <button
                onClick={() => toggleBlock(user.name)}
                className={`px-4 py-1 rounded text-sm font-semibold ${
                  blocked.includes(user.name)
                    ? "bg-red-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {blocked.includes(user.name) ? "Unblock" : "Block"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
