import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const AdminProductPage = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
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

  const handleAddOrEditProduct = (e) => {
    e.preventDefault();

    if (editId) {
      fetch(`http://localhost:2084/products/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, id: editId }),
      })
        .then((res) => res.json())
        .then((updated) => {
          setProducts(products.map((p) => (p.id === editId ? updated : p)));
          setFormData({ name: '', price: '', stock: '', status: 'Active', image: '' });
          setEditId(null);
          setShowForm(false);
        });
    } else {
      const newProduct = { ...formData, id: Date.now().toString() };
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
    }
  };

  const openEditForm = (product) => {
    setFormData(product);
    setEditId(product.id);
    setShowForm(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="p-6 w-full ml-60">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Product Management</h2>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => {
              setShowForm(true);
              setFormData({ name: '', price: '', stock: '', status: 'Active', image: '' });
              setEditId(null);
            }}
          >
            + Add Product
          </button>
        </div>

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
                    <button onClick={() => openEditForm(p)} className="text-blue-600 hover:underline text-sm">Edit</button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:underline text-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <form onSubmit={handleAddOrEditProduct} className="bg-white p-6 rounded w-96 shadow relative">
              <h3 className="text-lg font-bold mb-4">{editId ? 'Edit Product' : 'Add Product'}</h3>
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
                  {editId ? 'Update' : 'Add'}
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
