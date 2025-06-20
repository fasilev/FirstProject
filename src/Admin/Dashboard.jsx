// import React, { useState } from 'react';
// import Sidebar from './Sidebar';

// const users = [
//   {
//     name: "Erwin E. Brown",
//     avatar: "https://randomuser.me/api/portraits/men/32.jpg",
//   },
//   {
//     name: "Madeline Kennedy",
//     avatar: "https://randomuser.me/api/portraits/women/44.jpg",
//   },
//   {
//     name: "George A. Llanes",
//     avatar: "https://randomuser.me/api/portraits/men/45.jpg",
//   },
//   {
//     name: "Rafell John",
//     avatar: "https://randomuser.me/api/portraits/men/19.jpg",
//   },
// ];

// const Dashboard = () => {
//   const [blocked, setBlocked] = useState([]);

//   const toggleBlock = (name) => {
//     setBlocked((prev) =>
//       prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
//     );
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100 font-sans">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Dashboard Content */}
//       <main className="flex-1 p-6">
//         {/* Monthly Statistics */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           <div className="bg-white rounded-lg shadow p-6">
//             <h2 className="text-lg font-semibold mb-2">Monthly Statistics</h2>
//             <div className="flex justify-between">
//               <div>
//                 <p className="text-gray-500">Bounce Rate</p>
//                 <p className="text-red-600 font-bold text-lg">23.32%</p>
//               </div>
//               <div>
//                 <p className="text-gray-500">Page Views</p>
//                 <p className="text-blue-600 font-bold text-lg">42.32%</p>
//               </div>
//             </div>
//             <div className="mt-4 h-32 bg-gray-100 rounded"></div>
//           </div>

//           <div className="bg-white rounded-lg shadow p-6">
//             <h2 className="text-lg font-semibold mb-2">Revenue Overview</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="text-center">
//                 <p className="text-gray-500">Sales</p>
//                 <p className="text-red-600 font-bold text-xl">65.00%</p>
//               </div>
//               <div className="text-center">
//                 <p className="text-gray-500">Purchases</p>
//                 <p className="text-yellow-600 font-bold text-xl">80.26%</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* User List with Block/Unblock */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-lg font-semibold mb-4">Users</h2>
//           <div className="space-y-4">
//             {users.map((user) => (
//               <div
//                 key={user.name}
//                 className="flex items-center justify-between bg-gray-50 p-3 rounded hover:bg-gray-100"
//               >
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={user.avatar}
//                     alt={user.name}
//                     className="w-10 h-10 rounded-full border"
//                   />
//                   <span className="font-medium text-gray-800">{user.name}</span>
//                 </div>
//                 <button
//                   onClick={() => toggleBlock(user.name)}
//                   className={`px-4 py-1 rounded text-sm font-semibold ${
//                     blocked.includes(user.name)
//                       ? "bg-red-500 text-white"
//                       : "bg-green-500 text-white"
//                   }`}
//                 >
//                   {blocked.includes(user.name) ? "Unblock" : "Block"}
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;



import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  // 🔁 Fetch all users except admin
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:2084/users');
        const data = await res.json();
        const filteredUsers = data.filter((user) => user.role !== 'admin');
        setUsers(filteredUsers);
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };

    fetchUsers();
  }, []);

  // 🔄 Toggle block status and save to backend
  const toggleBlock = async (user) => {
    const updatedUser = { ...user, blocked: !user.blocked };

    try {
      await fetch(`http://localhost:2084/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });

      // Update local state
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? updatedUser : u))
      );
    } catch (err) {
      console.error('Failed to update user block status:', err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <Sidebar />

      <main className="flex-1 p-6">
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
            <div className="mt-4 h-32 bg-gray-100 rounded"></div>
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

        {/* Users List */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Users</h2>

          {users.length === 0 ? (
            <p className="text-gray-500">No users registered.</p>
          ) : (
            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded hover:bg-gray-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-purple-200 text-white flex items-center justify-center font-bold">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-gray-800">
                      {user.username}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleBlock(user)}
                    className={`px-4 py-1 rounded text-sm font-semibold ${
                      user.blocked
                        ? 'bg-red-500 text-white'
                        : 'bg-green-500 text-white'
                    }`}
                  >
                    {user.blocked ? 'Unblock' : 'Block'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
