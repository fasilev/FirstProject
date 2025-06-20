// import React, { useEffect, useState } from 'react';
// import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

// const AdminProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState('');

//   const fetchProducts = async () => {
//     try {
//       const res = await fetch('http://localhost:2084/products');
//       const data = await res.json();
//       setProducts(data);
//     } catch (err) {
//       console.error('Failed to fetch products:', err);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await fetch(`http://localhost:2084/products/${id}`, {
//         method: 'DELETE',
//       });
//       setProducts(products.filter((p) => p.id !== id));
//     } catch (err) {
//       console.error('Failed to delete product:', err);
//     }
//   };

//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">Products</h2>
//         <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
//           <FaPlus /> Add New
//         </button>
//       </div>

//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search by product name"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full p-2 border rounded"
//         />
//       </div>

//       <div className="bg-white shadow rounded">
//         <table className="w-full text-sm text-left">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3">Image</th>
//               <th className="p-3">Name</th>
//               <th className="p-3">Price</th>
//               <th className="p-3">Category</th>
//               <th className="p-3">Status</th>
//               <th className="p-3 text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProducts.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="text-center p-4 text-gray-500">
//                   No products found.
//                 </td>
//               </tr>
//             ) : (
//               filteredProducts.map((product) => (
//                 <tr key={product.id} className="border-b">
//                   <td className="p-3">
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="w-12 h-12 object-cover rounded"
//                     />
//                   </td>
//                   <td className="p-3 font-medium text-gray-800">{product.name}</td>
//                   <td className="p-3">
//                     ₹{product.price}
//                     {product.oldprice && (
//                       <span className="text-red-500 line-through ml-2">
//                         ₹{product.oldprice}
//                       </span>
//                     )}
//                   </td>
//                   <td className="p-3 text-gray-600">{product.category}</td>
//                   <td className="p-3">
//                     <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
//                       Published
//                     </span>
//                   </td>
//                   <td className="p-3 text-right space-x-2">
//                     <button className="text-blue-600 hover:underline">
//                       <FaEdit />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(product.id)}
//                       className="text-red-600 hover:underline"
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminProducts;




import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const AdminProductPage = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    status: 'Active',
    image: '',
  });

  useEffect(() => {
    fetch('http://localhost:2084/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Fetch error:', err));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:2084/products/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setProducts(products.filter((product) => product.id !== id));
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      ...formData,
      id: Date.now().toString(),
    };
    fetch('http://localhost:2084/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts([...products, data]);
        setFormData({ name: '', price: '', stock: '', status: 'Active', image: '' });
        setShowForm(false);
      });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="p-6 w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Product Management</h2>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => setShowForm(true)}
          >
            + Add Product
          </button>
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Stock</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-3">
                    <img src={p.image} alt={p.name} className="w-12 h-12 rounded object-cover" />
                  </td>
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">₹{p.price}</td>
                  <td className="p-3">{p.stock}</td>
                  <td className="p-3">{p.status}</td>
                  <td className="p-3 space-x-2">
                    <button className="text-blue-600 hover:underline text-sm">Edit</button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:underline text-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <form onSubmit={handleAddProduct} className="bg-white p-6 rounded w-96 shadow relative">
              <h3 className="text-lg font-bold mb-4">Add Product</h3>
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full mb-3 p-2 border rounded"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full mb-3 p-2 border rounded"
                required
              />
              <input
                type="number"
                placeholder="Stock"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full mb-3 p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full mb-3 p-2 border rounded"
                required
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full mb-4 p-2 border rounded"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowForm(false)} className="bg-gray-300 px-4 py-2 rounded">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  Add
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminProductPage;
