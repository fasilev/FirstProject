// import React from 'react';
// import {
//   FaHome,
//   FaShoppingCart,
//   FaCalendarAlt,
// } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';

// const Sidebar = () => {

//   const navigate = useNavigate()
//   return (
//     <aside className="w-64 top-0 fixed bg-white h-screen shadow-lg border-r border-gray-200 text-sm">
//       <div className="px-6 py-4 font-bold text-xl text-blue-600 border-b">
//         HEAD
//       </div>

//       <nav className="p-4 overflow-y-auto">
//         <div className="text-gray-400 uppercase font-bold text-xs mb-2">ADMIN</div>
//         <ul className="space-y-1">
//           <Link to="/admin">
//             <li className="hover:bg-blue-50 px-3 py-2 rounded flex items-center gap-3 text-blue-600 font-semibold bg-blue-100">
//               <FaHome />
//               Dashboard
//             </li>
//           </Link>
//           <li className="hover:bg-blue-50 px-3 py-2 rounded flex items-center gap-3"
//           onClick={()=>{
//             navigate('/admin/products')
//           }}
//           >
//             <FaShoppingCart />
//             E-Commerce
//           </li>
//           <li className="hover:bg-blue-50 px-3 py-2 rounded flex items-center gap-3"
//                     onClick={()=>{
//             navigate('/admin/orders')
//           }}
//           >
//             <FaCalendarAlt />
//             Orders
//           </li>
//         </ul>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;





import React from 'react';
import {
  FaHome,
  FaShoppingCart,
  FaCalendarAlt,
  FaSignOutAlt,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  return (
    <aside className="w-64 top-0 fixed bg-white h-screen shadow-lg border-r border-gray-200 text-sm flex flex-col justify-between">
      <div>
        <div className="px-6 py-4 font-bold text-xl text-blue-600 border-b">
          HEAD
        </div>

        <nav className="p-4 overflow-y-auto">
          <div className="text-gray-400 uppercase font-bold text-xs mb-2">ADMIN</div>
          <ul className="space-y-1">
            <Link to="/admin">
              <li className="hover:bg-blue-50 px-3 py-2 rounded flex items-center gap-3 text-blue-600 font-semibold bg-blue-100">
                <FaHome />
                Dashboard
              </li>
            </Link>
            <li
              className="hover:bg-blue-50 px-3 py-2 rounded flex items-center gap-3"
              onClick={() => navigate('/admin/products')}
            >
              <FaShoppingCart />
              E-Commerce
            </li>
            <li
              className="hover:bg-blue-50 px-3 py-2 rounded flex items-center gap-3"
              onClick={() => navigate('/admin/orders')}
            >
              <FaCalendarAlt />
              Orders
            </li>
          </ul>
        </nav>
      </div>

      {/* Logout Button at Bottom */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 text-red-600 hover:bg-red-50 px-3 py-2 rounded"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
