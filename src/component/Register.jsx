


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     
      const getRes = await fetch('http://localhost:2084/users');
      const users = await getRes.json();

    
      const emailExists = users.some(user => user.email === formData.email);
      if (emailExists) {
        alert("Email already registered. Please use a different one.");
        return;
      }

      const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

      const newUser = {
        id: newId,
        ...formData,
      
      };

      const response = await fetch('http://localhost:2084/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        alert('Registration Successful!');
        navigate('/login');
      } else {
        alert('Registration Failed!');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-[300px]">
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full mb-3 px-3 py-2 border rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-3 px-3 py-2 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

