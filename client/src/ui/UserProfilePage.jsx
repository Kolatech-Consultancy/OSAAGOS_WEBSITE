import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Button from "./Button";
import { GetOneUser, UpdateOneUser } from "../services/api";
import toast from "react-hot-toast";

function UserProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john@example.com",
    personalDetails: {
      address: "123 Main St",
      phone: "555-555-5555",
    },
    educationalDetails: {
      degree: "B.Sc. in Computer Science",
      graduationYear: "2020",
    },
    professionalDetails: {
      jobTitle: "Software Engineer",
      company: "Tech Corp",
    },
    profilePicture: "",
  });

  async function fetchUser() {
    setIsLoading(true);
    try {
      const response = await GetOneUser();
      const { name, email } = await response.data;
      setName(name);
      setEmail(email);
    } catch (error) {
        toast.error(error.message)
      throw new Error("User not found");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  async function handleUpdate() {
    setIsLoading(true);
    const data = { name, email };
    try {
      await UpdateOneUser(data);
      toast.success("User Updated successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      throw new Error("User not found");
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex items-center justify-center bg-cover bg-center h-30">
        <img
          className="w-24 h-24 object-cover rounded-full border-2 border-white"
          src={
            userData.profilePicture ? userData.profilePicture : "/userDef.png"
          }
          alt="Profile"
        />
      </div>
      <div className="text-center px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800">{userData.name}</h2>
        <p className="text-gray-600">{userData.email}</p>
        <p className="text-gray-700 mt-2">{userData.role}</p>
      </div>
      <div className="flex justify-between">
        <div className="px-6 py-4">
          <h3 className="text-gray-800 font-medium">Personal Details</h3>
          <p className="text-gray-600">
            Address: {userData.personalDetails.address}
          </p>
          <p className="text-gray-600">
            Phone: {userData.personalDetails.phone}
          </p>
        </div>
        <div className="px-6 py-4">
          <h3 className="text-gray-800 font-medium">Educational Details</h3>
          <p className="text-gray-600">
            Degree: {userData.educationalDetails.degree}
          </p>
          <p className="text-gray-600">
            Graduation Year: {userData.educationalDetails.graduationYear}
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="px-6 py-4">
          <h3 className="text-gray-800 font-medium">Professional Details</h3>
          <p className="text-gray-600">
            Job Title: {userData.professionalDetails.jobTitle}
          </p>
          <p className="text-gray-600">
            Company: {userData.professionalDetails.company}
          </p>
        </div>
      </div>

      {/* Update userName and email here  */}
      <article className="px-6">
        <h2 className="text-center py-4 text-2xl">
          Update your email and password
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex justify-center mb-4">
          <Button size="small" onClick={() => handleUpdate()}>
            Update
          </Button>
        </div>
      </article>
    </div>
  );
}

export default UserProfilePage;
