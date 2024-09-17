import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import SpinnerMini from '../../SpinnerMini';

const AddEditAlumniModal = ({ isOpen, onClose, onSave, alumni, loader }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: "",
    password: '',
    education: '',
    profession: '',
    graduationYear: '',
    fieldOfStudy: '',
    company: '',
    address: ''
  });

  useEffect(() => {
    if (alumni) {
      setFormData({ ...alumni, password: null });
    } else {
      setFormData(
        {
          name: "",
          email: "",
          password: "",
          graduationYear: "",
          fieldOfStudy: "",
          profession: ""
        }
      );
    }
  }, [alumni]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
      <div className="bg-white rounded-lg w-11/12 md:w-1/2 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {alumni ? 'Edit Alumni' : 'Add Alumni'}
          </h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800 focus:outline-none">
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit} style={{ maxHeight: "75vh", overflowY: "scroll" }}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name='name'
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
              placeholder="Enter Alumni Name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name='email'
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
              placeholder="Enter Alumni Name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
              Phone Number
            </label>
            <input
              type="phone"
              id="phone"
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
              placeholder="Enter Alumni Name"
              required
            />
          </div>
          {alumni ? "" :
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name='password'
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                placeholder="Enter password"
                required
              />
            </div>
          }
          {alumni ? <div className="mb-4">
            <label htmlFor="education" className="block text-gray-700 font-medium mb-2">
              Education
            </label>
            <input
              type="text"
              id="education"
              name='education'
              value={formData.education}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
              placeholder="Enter education degree"

            />
          </div> : ""}
          <div className="mb-4">
            <label htmlFor="fieldOfStudy" className="block text-gray-700 font-medium mb-2">
              Field of study
            </label>
            <input
              type="text"
              id="fieldOfStudy"
              name='fieldOfStudy'
              value={formData.fieldOfStudy}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
              placeholder="Enter field of study"

            />
          </div>
          <div className="mb-4">
            <label htmlFor="graduationYear" className="block text-gray-700 font-medium mb-2">
              Graduation Year
            </label>
            <input
              type="number"
              id="graduationYear"
              name='graduationYear'
              value={formData.graduationYear}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
              placeholder="Enter Graduation Year"

            />
          </div>

          {alumni ?
            <>
              <div className="mb-4">
                <label htmlFor="profession" className="block text-gray-700 font-medium mb-2">
                  Profession
                </label>
                <input
                  type="text"
                  id="profession"
                  name='profession'
                  value={formData.profession}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                  placeholder="Enter profession"

                />
              </div>
              <div className="mb-4">
                <label htmlFor="company" className="block text-gray-700 font-medium mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name='company'
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                  placeholder="Enter Company's  Name"

                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name='address'
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                  placeholder="Enter company address"

                />
              </div>
            </>
            :
            ""
          }
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg focus:outline-none"
              disabled={loader}
            >
              {loader ? <SpinnerMini /> : alumni ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditAlumniModal;
