import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Eye, EyeOff, Edit, Trash2, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
    password: '',
    dob: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost/user_management/backend/api/users.php');
      setUsers(response.data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Add new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost/user_management/backend/api/users.php`, currentUser);
      fetchUsers();
      setCurrentUser({
        name: '',
        email: '',
        password: '',
        dob: ''
      });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  // Edit user
  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost/user_management/backend/api/users.php/${currentUser.id}`, currentUser);
      fetchUsers();
      setCurrentUser({
        name: '',
        email: '',
        password: '',
        dob: ''
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Prepare user for editing
  const prepareEdit = (user) => {
    setCurrentUser(user);
    setIsEditing(true);
  };

  // Delete user
  const handleDeleteUser = async (id) => {
    try {
      // Explicitly send id in the request body
      await axios.delete(`http://localhost/user_management/backend/api/users.php`, {
        data: { id: id }
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id)); 
      // fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error.response ? error.response.data : error);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-md rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <UserPlus className="mr-3" />
              {isEditing ? 'Edit User' : 'Add New User'}
            </h2>
            <form onSubmit={isEditing ? handleEditUser : handleAddUser}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={currentUser.name || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={currentUser.email || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4 relative">
                <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    value={currentUser.password || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                    required={!isEditing}
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="dob" className="block text-gray-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={currentUser.dob  || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                {isEditing ? 'Update User' : 'Add User'}
              </button>
            </form>
          </motion.div>

          {/* User List Section */}
          {users.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">User List</h2>
                <div className="overflow-x-auto">
                  <AnimatePresence>
                    <table className="w-full">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="p-3 text-left">Sr No</th>
                          <th className="p-3 text-left">Name</th>
                          <th className="p-3 text-left">Email</th>
                          <th className="p-3 text-left">Date of Birth</th>
                          <th className="p-3 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <AnimatePresence>
                          {users.map((user, index) => (
                            <motion.tr
                              key={user.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="border-b hover:bg-gray-50 transition-colors"
                            >
                              <td className="p-3">{index + 1}</td>
                              <td className="p-3">{user.name}</td>
                              <td className="p-3">{user.email}</td>
                              <td className="p-3">{user.dob}</td>
                              <td className="p-3 flex justify-center space-x-2">
                                <button
                                  onClick={() => prepareEdit(user)}
                                  className="text-blue-500 hover:text-blue-700"
                                  title="Edit User"
                                >
                                  <Edit size={20} />
                                </button>
                                <button
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="text-red-500 hover:text-red-700"
                                  title="Delete User"
                                >
                                  <Trash2 size={20} />
                                </button>
                              </td>
                            </motion.tr>
                          ))}
                        </AnimatePresence>
                      </tbody>
                    </table>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;