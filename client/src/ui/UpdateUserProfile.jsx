import { useState } from "react";
import { UpdateAlumniProfile } from "../services/api";
import SpinnerMini from "../components/SpinnerMini";
import toast from "react-hot-toast";

function UpdateUserProfile() {
  const [isSbmit, setIsSubmit] = useState(false);
  const [formData, setFormData] = useState({
    profilePicture: null,
    personalDetails: {
      address: "",
      phone: "",
    },
    educationalDetails: {
      degree: "",
      graduationYear: "",
    },
    professionalDetails: {
      jobTitle: "",
      company: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [section, key] = name.split(".");

    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [key]: value,
      },
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
      const {
        personalDetails,
        educationalDetails,
        professionalDetails,
        profilePicture,
      } = formData;
      let profile;
      if (profilePicture) profile = profilePicture;

      const fData = {
        personalDetails,
        educationalDetails,
        professionalDetails,
      };
      const submitData = { data: fData, profilePicture: profile };
      const response = await UpdateAlumniProfile(submitData);
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
            name="personalDetails.address"
            value={formData.personalDetails.address}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Phone</label>
          <input
            type="tel"
            name="personalDetails.phone"
            value={formData.personalDetails.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Degree</label>
          <input
            type="text"
            name="educationalDetails.degree"
            value={formData.educationalDetails.degree}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Graduation Year</label>
          <input
            type="text"
            name="educationalDetails.graduationYear"
            value={formData.educationalDetails.graduationYear}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Job Title</label>
          <input
            type="text"
            name="professionalDetails.jobTitle"
            value={formData.professionalDetails.jobTitle}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Company</label>
          <input
            type="text"
            name="professionalDetails.company"
            value={formData.professionalDetails.company}
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
