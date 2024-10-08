import { useState } from "react";
import { LiaUserEditSolid } from "react-icons/lia";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { SlEvent } from "react-icons/sl";
import {
  MdOutlineForum,
  MdOutlinePermMedia,
  MdWorkOutline,
} from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { PiChatsLight } from "react-icons/pi";
import { Link, Outlet, useLocation } from "react-router-dom";
import { BsArrowBarLeft } from "react-icons/bs";

function UserDashboardLayout() {
  const [isAsideOpen, setIsAsideOpen] = useState(true);
  const location = useLocation().pathname;
  const toggleAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };
  return (
    <section className="flex gap-2 h-full bg-gray-200">
      <div className="relative z-[999]">
        <aside
          className={`h-screen  bg-white shadow-lg fixed left-0 top-0 transition-all transform duration-300 ${
            isAsideOpen ? "lg:w-[20rem] w-[15rem]" : "-translate-x-full w-0"
          }`}
        >
          <button
            onClick={toggleAside}
            className="absolute flex justify-center items-center font-bold top-8 right-0 -mr-5 w-10 h-10 bg-gray-900 text-white rounded-full transform -translate-y-1/2"
          >
            <BsArrowBarLeft />
          </button>
          <div className="flex items-center">
            {isAsideOpen && (
              <nav className="p-4 w-full">
                <div className="flex justify-center items-center mb-2">
                  <img
                    src="/Logo.png"
                    className="h-[6rem] w-[6rem] object-cover "
                    alt="logo.png"
                  />
                </div>
                <ul className="flex flex-col gap-2">
                  <li
                    className="w-full block"
                    onClick={() => setIsAsideOpen(false)}
                  >
                    <Link
                      to="/user/profile"
                      className={`flex items-center hover:bg-gray-300 rounded-md py-2 px-4 text-gray-600 gap-6 font-light text-base transition-all duration-200 ${
                        location.includes("/user/profile") ? "bg-gray-400" : ""
                      }`}
                    >
                      <AiOutlineHome />
                      <span className="text-gray-600 font-medium">
                        Dashboard
                      </span>
                    </Link>
                  </li>
                  <li
                    className="w-full block"
                    onClick={() => setIsAsideOpen(false)}
                  >
                    <Link
                      to="/user/chat"
                      className={`flex items-center hover:bg-gray-300 rounded-md py-2 px-4 text-gray-600 gap-6 font-light text-base transition-all duration-200 ${
                        location.includes("/user/chat") ? "bg-gray-400" : ""
                      }`}
                    >
                      <PiChatsLight />
                      <span className="text-gray-600 font-medium">Chat</span>
                    </Link>
                  </li>
                  <li
                    className="w-full block"
                    onClick={() => setIsAsideOpen(false)}
                  >
                    <Link
                      to="/user/groups"
                      className={`flex items-center hover:bg-gray-300 rounded-md py-2 px-4 text-gray-600 gap-6 font-light text-base transition-all duration-200 ${
                        location.includes("/user/groups") ? "bg-gray-400" : ""
                      }`}
                    >
                      <HiOutlineUserGroup />
                      <span className="text-gray-600 font-medium">Groups</span>
                    </Link>
                  </li>
                  <li
                    className="w-full block"
                    onClick={() => setIsAsideOpen(false)}
                  >
                    <Link
                      to="/user/update-profile"
                      className={`flex items-center hover:bg-gray-300 rounded-md py-2 px-4 text-gray-600 gap-6 font-light text-base transition-all duration-200 ${
                        location.includes("/user/update-profile")
                          ? "bg-gray-400"
                          : ""
                      }`}
                    >
                      <LiaUserEditSolid />
                      <span className="text-gray-600 font-medium">
                        Update Profile
                      </span>
                    </Link>
                  </li>
                  <li
                    className="w-full block"
                    onClick={() => setIsAsideOpen(false)}
                  >
                    <Link
                      to="/user/events"
                      className={`flex items-center hover:bg-gray-300 rounded-md py-2 px-4 text-gray-600 gap-6 font-light text-base transition-all duration-200 ${
                        location.includes("/user/events") ? "bg-gray-400" : ""
                      }`}
                    >
                      <SlEvent />
                      <span className="text-gray-600 font-medium">Events</span>
                    </Link>
                  </li>
                  <li
                    className="w-full block"
                    onClick={() => setIsAsideOpen(false)}
                  >
                    <Link
                      to="/user/jobs"
                      className={`flex items-center hover:bg-gray-300 rounded-md py-2 px-4 text-gray-600 gap-6 font-light text-base transition-all duration-200 ${
                        location.includes("/user/jobs") ? "bg-gray-400" : ""
                      }`}
                    >
                      <MdWorkOutline />
                      <span className="text-gray-600 font-medium">
                        Job Board
                      </span>
                    </Link>
                  </li>
                  <li
                    className="w-full block"
                    onClick={() => setIsAsideOpen(false)}
                  >
                    <Link
                      to="/user/forum"
                      className={`flex items-center hover:bg-gray-300 rounded-md py-2 px-4 text-gray-600 gap-6 font-light text-base transition-all duration-200 ${
                        location.includes("/user/forum") ? "bg-gray-400" : ""
                      }`}
                    >
                      <MdOutlineForum />
                      <span className="text-gray-600 font-medium">Forum</span>
                    </Link>
                  </li>
                  <li
                    className="w-full block"
                    onClick={() => setIsAsideOpen(false)}
                  >
                    <Link
                      to="/user/media"
                      className={`flex items-center hover:bg-gray-300 rounded-md py-2 px-4 text-gray-600 gap-6 font-light text-base transition-all duration-200 ${
                        location.includes("/user/media") ? "bg-gray-400" : ""
                      }`}
                    >
                      <MdOutlinePermMedia />
                      <span className="text-gray-600 font-medium">
                        Media Gallery
                      </span>
                    </Link>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </aside>
      </div>
      <main
        className={`flex-grow p-4 transition-all duration-300 ${
          isAsideOpen ? "ml-0" : "ml-0"
        }`}
      >
        <Outlet />
      </main>
    </section>
  );
}

export default UserDashboardLayout;
