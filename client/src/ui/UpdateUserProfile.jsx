import { useEffect, useState } from "react";
import { GetOneUser, UpdateUsersProfile } from "../services/api";
import SpinnerMini from "../components/SpinnerMini";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Is_authorized from "../utils/authorization";

function UpdateUserProfile() {
  const [isSbmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    address: "",
    phone: "",
    fieldOfStudy: "",
    graduationYear: "",
    profession: "",
    company: "",
  });
  const navigate = useNavigate();
  async function fetchUser() {
    setIsLoading(true);
    try {
      const response = await GetOneUser();
      setFormData(response.data);
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const handleFilesChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    try {
      const data = new FormData();

      data.append("address", formData.address);
      data.append("phone", formData.phone);
      data.append("fieldOfStudy", formData.fieldOfStudy);
      data.append("graduationYear", formData.graduationYear);
      data.append("profession", formData.profession);
      data.append("company", formData.company);

      const fileInput = document.querySelector('input[type="file"]');
      const file = fileInput.files[0];

      if (file) {
        data.append("profilePicture", file);
      }
      const token = Is_authorized();
      const response = await axios.put(
        "https://osaagos-api-alumni-website.onrender.com/api/users/profile",
        data,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);

      toast.success("Your details are updated successfully");
      navigate("/user/profile");
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
    } finally {
      setIsSubmit(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen">
        <Spinner />
      </div>
    );
  }

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
            onChange={handleFilesChange}
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
