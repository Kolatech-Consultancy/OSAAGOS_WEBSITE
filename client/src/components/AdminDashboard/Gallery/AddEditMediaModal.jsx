import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import SpinnerMini from "../../SpinnerMini";

const AddEditMediaModal = ({ isOpen, onClose, onSave, mediaItem, loader }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fileType: "",
    fileUrl: "",
  });

  useEffect(() => {
    if (mediaItem) {
      setFormData({
        title: mediaItem.title,
        fileType: mediaItem.fileType,
        fileUrl: mediaItem.fileUrl,
        description: mediaItem.description,
      });
    } else {
      setFormData({ title: "", fileType: "", fileUrl: "", description: "" });
    }
  }, [mediaItem]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {mediaItem ? "Edit Media" : "Add Media"}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="fileType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Type
                </label>
                <select
                  id="fileType"
                  name="fileType"
                  value={formData.fileType}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="fileUrl"
                  className="block text-sm font-medium text-gray-700"
                >
                  {formData.fileType === "video" ? "Video Url" : "Image Url"}
                </label>
                <input
                  type="text"
                  id="fileUrl"
                  name="fileUrl"
                  value={formData.fileUrl}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md ${
                    loader ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loader}
                >
                  {loader ? (
                    <SpinnerMini />
                  ) : mediaItem ? (
                    "Save Changes"
                  ) : (
                    "Add Media"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddEditMediaModal;
