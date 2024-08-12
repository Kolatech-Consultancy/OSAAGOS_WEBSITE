import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Button from "./Button";
import { GetOneUser, UpdateOneUser } from "../services/api";
import toast from "react-hot-toast";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineStatusOnline,
  HiOutlineUser,
} from "react-icons/hi";
import { LiaAddressCard } from "react-icons/lia";
import { PiBagSimple, PiCalendarCheck, PiCertificate } from "react-icons/pi";
import { MdOutlinePlace } from "react-icons/md";
function UserProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
    address: "",
    phone: "",
    fieldOfStudy: "",
    graduationYear: "",
    profession: "",
    company: "",
    profilePicture: "",
  });

  async function fetchUser() {
    setIsLoading(true);
    try {
      const response = await GetOneUser();
      const { name, email } = await response.data;
      setName(name);
      setEmail(email);
      setUserData(response.data);
    } catch (error) {
      throw new Error(
        error.response ? error.response.data.message : error.message
      );
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
      toast.error(error.response ? error.response.data.message : error.message);
      throw new Error(
        error.response ? error.response.data.message : error.message
      );
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
      <div className="flex items-center justify-center bg-cover bg-center h-30 mb-4">
        <img
          className="w-24 h-24 object-cover rounded-full border-2 border-white"
          src={
            userData.profilePicture ? userData.profilePicture : "/userDef.png"
          }
          alt="Profile"
        />
      </div>
      <div className="flex justify-between flex-col gap-2 md:flex-nowrap flex-wrap text-gray-800">
        <p className="px-6 font-semibold text-xl">Personal Details</p>
        <div className="flex-col flex gap-4 text-center px-6 text-lg  w-full">
          <div className="flex justify-between flex-col gap-1 sm:flex-nowrap flex-wrap">
            <article>
              <h2 className="flex items-center gap-4">
                <HiOutlineUser />
                {userData.name}
              </h2>
            </article>
            <article>
              <p className="flex items-center gap-4 ">
                <HiOutlineMail />
                {userData.email}
              </p>
            </article>
            <article>
              <p className="flex items-center gap-4">
                <LiaAddressCard />
                {userData.address}
              </p>
            </article>

            <article>
              <p className="flex items-center gap-4 ">
                <HiOutlinePhone />
                {userData.phone}
              </p>
            </article>
            <p className="flex items-center gap-4">
              <HiOutlineStatusOnline />
              {userData.role}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-4 md:flex-nowrap flex-wrap mt-4">
        <div className="px-6 flex-col gap-2">
          <h3 className="text-gray-800 font-medium">Educational Details</h3>
          <p className="text-gray-600 flex items-center gap-4">
            <PiCertificate /> {userData.fieldOfStudy}
          </p>
          <p className="text-gray-600 flex items-center gap-4">
            <PiCalendarCheck /> {userData.graduationYear}
          </p>
        </div>
        <div className="px-6 flex-col gap-2">
          <h3 className="text-gray-800 font-medium">Professional Details</h3>
          <p className="text-gray-600 flex items-center gap-4">
            <PiBagSimple /> {userData.profession}
          </p>
          <p className="text-gray-600 flex items-center gap-4">
            <MdOutlinePlace /> {userData.company}
          </p>
        </div>
      </div>

      <div className="flex justify-center"></div>

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
