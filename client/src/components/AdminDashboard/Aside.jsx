import React from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

import { Link } from "react-router-dom";

const Aside = ({ isOpen, setIsOpen }) => {
  return (
    <>
      <aside
        className={`bg-gray-800 text-white w-64 h-full fixed top-0 left-0 transition-all duration-200 ${
          isOpen ? "" : "translate-x-[-16rem]"
        }`}
      >
        <div
          className="absolute bg-blue-600 p-1 -right-[9%] cursor-pointer transition-all duration-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaLongArrowAltLeft /> : <FaLongArrowAltRight />}
        </div>
        <ul className="">
          <Link>
            <li className="p-4 hover:bg-gray-600">User Management</li>
          </Link>
          <Link>
            <li className="p-4 hover:bg-gray-600">Alumni Profiles</li>
          </Link>
          <Link to="/eventform">
            <li className="p-4 hover:bg-gray-600">Events Management</li>
          </Link>
          <Link to="/newsform">
            <li className="p-4 hover:bg-gray-600">News and Announcements</li>
          </Link>
          <Link>
            <li className="p-4 hover:bg-gray-600">Job Board</li>
          </Link>
          <Link>
            <li className="p-4 hover:bg-gray-600">Donations</li>
          </Link>
          <Link>
            <li className="p-4 hover:bg-gray-600">Media Gallery</li>
          </Link>
          <Link>
            <li className="p-4 hover:bg-gray-600">Analytics</li>
          </Link>
          <Link>
            <li className="p-4 hover:bg-gray-600">Settings</li>
          </Link>
        </ul>
        <div>
          <div
            className="bg-blue-600 inline-block p-1 bottom-0 cursor-pointer "
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaLongArrowAltLeft />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Aside;
