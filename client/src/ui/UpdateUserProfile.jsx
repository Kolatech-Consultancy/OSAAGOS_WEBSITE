import { useState } from "react";
import { UpdateUsersProfile } from "../services/api";
import SpinnerMini from "../components/SpinnerMini";
import toast from "react-hot-toast";

function UpdateUserProfile() {
  const [isSbmit, setIsSubmit] = useState(false);
  const [formData, setFormData] = useState({
    profilePicture: null,
    address: "",
    phone: "",
    fieldOfStudy: "",
    graduationYear: "",
    profession: "",
    company: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: type === 'file' ? files[0] : value,
  }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      profilePicture: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    try {
      const submitData = { ...formData };
      console.log(submitData);
      const response = await UpdateUsersProfile(submitData);
      console.log(response.data);
    } catch (error) {
      toast.error(error.message);
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Update Your Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 w-full"
          />
        </div>
        <div>
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Degree</label>
          <input
            type="text"
            name="fieldOfStudy"
            value={formData.fieldOfStudy}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Graduation Year</label>
          <input
            type="text"
            name="graduationYear"
            value={formData.graduationYear}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Job Title</label>
          <input
            type="text"
            name="profession"
            value={formData.profession}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-700 text-white py-2 px-4 flex justify-center items-center rounded-lg hover:bg-blue-900 w-full"
        >
          {isSbmit ? <SpinnerMini /> : "Update Profile"}
        </button>
      </form>
    </div>
  );
}

export default UpdateUserProfile;
