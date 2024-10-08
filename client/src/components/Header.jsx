import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import toast from "react-hot-toast";
import { AdminDashboard } from "../services/api";
import parseJwt from "./TokenDecoder";
import UserList from "../ui/UserList";
import axios from "../utils/axios";
import SpinnerMini from "./SpinnerMini";
import {
  FullName,
  MessageButton,
  ProfilePicture,
  UserCard,
  UserInfo,
} from "../ui/UserChat";

const Header = () => {
  const location = useLocation();
  const dashboard = location.pathname === "/dashboard";
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);

  const ref = useRef(null);

  function clickMenu() {
    setMenuOpen(true);
  }
  function closeMenu() {
    setMenuOpen(false);
  }
  const handleSearch = async () => {
    setSearch(true);
    if (searchQuery.length > 1) {
      const response = await axios.get(`/api/users/search?name=${searchQuery}`);
      setSearch(false);
      setUser(response.data);
    } else {
      toast.error("Please fill the input");
      setSearch(false);
    }
    setSearch(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = parseJwt(token);

      if (payload.role === "Admin") {
        return setAdmin(true);
      }
      setAdmin(false);
    }
  }, [token]);

  const handleDashboard = async () => {
    try {
      await AdminDashboard();
      toast.success("Access granted!");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Access to the admin dashboard denied!");
    }
  };

  const handleSelectMessage = async (route) => {
    navigate(`/user/chat/${route}`);
    setSearchQuery("");
    setUser([]);
  };
  return (
    <>
      <header className="sticky top-0 z-[100]">
        <div
          className={`bg-blue-800 flex justify-between ${
            dashboard ? "mb-3" : ""
          } text-white py-3 px-4`}
        >
          <Link to="/">
            <div
              className={`${
                !dashboard && "hidden"
              } mx-10 flex flex-col justify-center items-center`}
            >
              <img
                className="w-[6rem] h-[6rem] object-cover"
                src="/Logo.png"
                alt="OSAAGOS Logo"
              />
            </div>
          </Link>
          <div className="flex gap-2 px-2">
            <article className="flex items-center bg-[rgba(204,204,204,.3)]  rounded-md overflow-hidden">
              <span
                className="sm:px-2 px-1 h-full bg-orange-400 font-bold sm:text-xl text-lg flex items-center cursor-pointer"
                onClick={handleSearch}
              >
                {search ? <SpinnerMini /> : <CiSearch />}
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-0 outline-0 px-1 lg:px-2 py-1 inline-flex"
                placeholder="Search Alumni ..."
              />
            </article>
            {token ? (
              <>
                <Link to="/user/profile" className="hidden lg:inline-block">
                  <li className="bg-orange-400 hover:bg-orange-600 transition-all duration-200 px-5 py-2 rounded-lg list-none">
                    Profile
                  </li>
                </Link>
                <button
                  className="bg-orange-400 hidden lg:inline-block hover:bg-orange-600 transition-all duration-200 px-5 py-2 rounded-lg list-none"
                  onClick={() => {
                    localStorage.clear("token");
                    toast.success("Logout Successfully");
                    setAdmin(false);
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hidden lg:inline-block">
                  <li className="bg-orange-400 hover:bg-orange-600 transition-all duration-200 px-5 py-2 rounded-lg list-none">
                    Login
                  </li>
                </Link>
                <Link
                  to="/sign-up"
                  className="px-5 py-2 bg-orange-400 hover:bg-orange-600 transition-all duration-200 rounded-lg list-none hidden lg:inline-block"
                >
                  <li>Register</li>
                </Link>
              </>
            )}
          </div>
        </div>
        <div
          className={`flex justify-between items-center px-10 relative ${
            dashboard && "hidden"
          } bg-white items-center shadow-lg`}
        >
          <Link to="/">
            <div className="flex flex-col justify-start items-start">
              <img
                src="/Logo.png"
                alt="logo"
                className="w-[6rem] h-[6rem] object-cover"
              />
            </div>
          </Link>

          <div
            className={`px-8 lg:px-0 justify-end lg:basis-[70%]  lg:-translate-x-0  pt-14 lg:py-0 test top-0 left-0 bg-blue-800 lg:bg-transparent sm:w-[20rem] w-full lg:w-full h-full transition-all duration-200 ${
              menuOpen ? "" : "-translate-x-[100%]"
            }`}
            ref={ref}
            onClick={() => setMenuOpen(false)}
          >
            <div
              onClick={closeMenu}
              className="lg:hidden text-3xl cursor-pointer text-white absolute top-2 z-[1000] left-4"
            >
              <IoIosCloseCircleOutline />
            </div>
            <ul className="flex lg:flex-row  justify-end flex-col gap-4 text-white lg:text-black lg:text-sm whitespace-nowrap">
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/aboutus">
                <li>About Us</li>
              </Link>

              <Link to="/news">
                <li>News</li>
              </Link>

              <Link to="/donations">
                <li>Donations</li>
              </Link>

              <Link to="/contactus">
                <li>Contact Us</li>
              </Link>
              {admin && (
                <li role={"button"} onClick={handleDashboard}>
                  Admin Dashboard
                </li>
              )}

              {token ? (
                <div className="lg:hidden mt-6 flex flex-col gap-5">
                  {" "}
                  <Link to="/user/profile" className="">
                    <li className="bg-orange-400 hover:bg-orange-600 text-center transition-all duration-200 px-5 py-2 rounded-lg list-none">
                      Profile
                    </li>
                  </Link>
                  <button
                    className="bg-orange-400 hover:bg-orange-600 transition-all duration-200 px-5 py-2 rounded-lg list-none"
                    onClick={() => {
                      localStorage.setItem("token", "");
                      toast.success("Logout Successfully");
                      navigate("/login");
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="lg:hidden mt-6 flex flex-col gap-5">
                  <>
                    <Link to="/login" className="">
                      <li className="bg-orange-400 hover:bg-orange-600 transition-all duration-200 px-5 py-2 rounded-lg list-none">
                        Login
                      </li>
                    </Link>
                    <Link
                      to="/sign-up"
                      className="px-5 py-2 bg-orange-400 hover:bg-orange-600 transition-all duration-200 rounded-lg list-none"
                    >
                      <li>Register</li>
                    </Link>
                  </>
                </div>
              )}
            </ul>
          </div>

          <div
            className="lg:hidden text-3xl cursor-pointer"
            onClick={clickMenu}
          >
            <HiMenuAlt3 />
          </div>
        </div>
        {user.length > 0 && (
          <article className="fixed lg:right-[25rem] left-0 top-[3.5rem] lg:w-80 w-full p-2 bg-gray-700 h-full z-[9999px] overflow-scroll">
            {user.map((user) => (
              <div key={user._id}>
                <UserCard>
                  <UserInfo>
                    <FullName>{user.name}</FullName>
                  </UserInfo>
                  <MessageButton onClick={() => handleSelectMessage(user._id)}>
                    Message
                  </MessageButton>
                </UserCard>
              </div>
            ))}
          </article>
        )}
      </header>
    </>
  );
};

export default Header;
