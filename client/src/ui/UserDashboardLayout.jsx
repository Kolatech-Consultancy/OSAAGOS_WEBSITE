import { useState } from "react";
import {
  FaTachometerAlt,
  FaComments,
  FaUsers,
  FaUserEdit,
} from "react-icons/fa";
import { Link, Outlet, useLocation } from "react-router-dom";

function UserDashboardLayout() {
  const [isAsideOpen, setIsAsideOpen] = useState(true);
  const location = useLocation().pathname;

  const toggleAside = () => {
    setIsAsideOpen(!isAsideOpen);
  };
  return (
    <section className="flex gap-2 h-full bg-gray-200">
      <div className="relative">
        <aside
          className={`h-screen  bg-white shadow-lg fixed left-0 top-0 transition-all transform duration-300 ${
            isAsideOpen ? "w-[20rem]" : "-translate-x-full w-0"
          }`}
        >
          <button
            onClick={toggleAside}
            className="absolute top-1/2 right-0 -mr-5 w-10 h-10 bg-blue-500 text-white rounded-full transform -translate-y-1/2"
          >
            &lt;
          </button>
          <div className="flex items-center">
            {isAsideOpen && (
              <nav className="p-4 w-full">
                <div className="flex justify-center items-center mb-4">
                  <img
                    src="/logo.png"
                    className="h-[6rem] w-[6rem] object-cover "
                    alt="logo.png"
                  />
                </div>
                <ul className="flex flex-col gap-4">
                  <li className="w-full block">
                    <Link
                      to="/user/profile"
                      className={`flex items-center hover:bg-gray-300 rounded-md py-2 px-4 text-gray-600 gap-6 font-light text-2xl transition-all duration-200 ${
                        location === "/user/profile" ? "bg-gray-400" : ""
                      }`}
                    >
                      <FaTachometerAlt />
                      <span className="text-gray-600 font-medium">
                        Dashboard
                      </span>
                    </Link>
                  </li>
                  <li className="w-full block">
                    <Link
                      to="/user/chat"
                      className={`flex items-center hover:bg-gray-300 rounded-md py-2 px-4 text-gray-600 gap-6 font-light text-2xl transition-all duration-200 ${
                        location === "/user/chat" ? "bg-gray-400" : ""
                      }`}
                    >
                      <FaComments />
                      <span className="text-gray-600 font-medium">Chat</span>
                    </Link>
                  </li>
                  <li className="w-full block">
                    <Link
                      to="/user/groups"
                      className={`flex items-center hover:bg-gray-300 rounded-md py-2 px-4 text-gray-600 gap-6 font-light text-2xl transition-all duration-200 ${
                        location === "/user/groups" ? "bg-gray-400" : ""
                      }`}
                    >
                      <FaUsers />
                      <span className="text-gray-600 font-medium">Groups</span>
                    </Link>
                  </li>
                  <li className="w-full block">
                    <Link
                      to="/user/update-profile"
                      className={`flex items-center hover:bg-gray-300 rounded-md py-2 px-4 text-gray-600 gap-6 font-light text-2xl transition-all duration-200 ${
                        location === "/user/update-profile" ? "bg-gray-400" : ""
                      }`}
                    >
                      <FaUserEdit />
                      <span className="text-gray-600 font-medium">
                        Update Profile
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
