import React, { useState, useEffect } from 'react';
import { GetOneUser, UpdateUsersProfile } from '../../../services/api'; 
import SpinnerMini from '../../SpinnerMini';
import toast from 'react-hot-toast';

const AdminProfile = () => {
  const [userDetails, setUserDetails] = useState({
    name:"", email:"", education:"", profession:"", graduationYear:"", fieldOfStudy:"", role:"", company:"", address:""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setIsLoading(true);
        const response = await GetOneUser(); 
        setUserDetails(response.data);
      } catch (error) {
        setError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    try {
      setIsUpdating(true);
      await UpdateUsersProfile(userDetails); 
      toast.success('Details updated successfully');
    } catch (error) {
      console.error(error);
      toast.error('Error updating details');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Account Settings</h1>

      {isLoading ? (
        <SpinnerMini />
      ) : error ? (
        <p className="text-red-500">Failed to load user details. Please try again.</p>
      ) : (
        <form onSubmit={handleUpdateDetails}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              className="w-full border px-3 py-2 rounded-lg"
              value={userDetails.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border px-3 py-2 rounded-lg"
              value={userDetails.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* <div className="mb-4">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="w-full border px-3 py-2 rounded-lg"
              value={userDetails.password}
              onChange={handleChange}
            />
          </div> */}

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              disabled={isUpdating}
            >
              {isUpdating ? 'Updating...' : 'Update Details'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminProfile;
