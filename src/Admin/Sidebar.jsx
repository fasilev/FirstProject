import React from 'react';
import { FaHome, FaCogs, FaShoppingCart, FaBlog, FaCalendarAlt, FaComments, FaEnvelope, FaTh, FaUserCog } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white h-screen shadow-lg border-r border-gray-200 text-sm">
      <div className="px-6 py-4 font-bold text-xl text-blue-600 border-b">
        Hope UI
      </div>

      <nav className="p-4 overflow-y-auto">
        <div className="text-gray-400 uppercase font-bold text-xs mb-2">Home</div>
        <ul className="space-y-1">
        <Link to=""><li className="hover:bg-blue-50 px-3 py-2 rounded flex items-center gap-3 text-blue-600 font-semibold bg-blue-100">
            <FaHome />
            Dashboard
          </li>
        </Link>
          <li className="hover:bg-blue-50 px-3 py-2 rounded flex items-center gap-3">
            <FaTh />
            Menu Style
          </li>
          <li className="hover:bg-blue-50 px-3 py-2 rounded flex items-center gap-3 relative">
            <FaCogs />
            Design System
            <span className="absolute right-3 top-2 bg-green-500 text-white text-xs px-1 rounded">UI</span>
          </li>
          <li className="hover:bg-blue-50 px-3 py-2 rounded flex items-center gap-3">
            <FaShoppingCart />
            E-Commerce
          </li>
          <li className="hover:bg-blue-50 px-3 py-2 rounded flex items-center gap-3">
            <FaBlog />
            Social
          </li>
          <li className="hover:bg-blue-50 px-3 py-2 rounded flex items-center gap-3">
            <FaCalendarAlt />
            Appointment
          </li>
          <li className="hover:bg-blue-50 px-3 py-2 rounded flex items-center gap-3">
            <FaUserCog />
            File Manager
          </li>
          <li className="hover:bg-blue-50 px-3 py-2 rounded flex items-center gap-3">
            <FaComments />
            Chat
          </li>
          <li className="hover:bg-blue-50 px-3 py-2 rounded flex items-center gap-3">
            <FaEnvelope />
            Mail
          </li>
        </ul>

        <div className="text-gray-400 uppercase font-bold text-xs mt-6 mb-2">Pages</div>
        <ul className="space-y-1">
          <li className="hover:bg-blue-50 px-3 py-2 rounded flex items-center gap-3">
            <FaTh />
            Special Pages
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
