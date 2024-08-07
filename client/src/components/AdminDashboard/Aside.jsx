import React, { useEffect, useState } from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

import { Link } from "react-router-dom";

const Aside = ({ isOpen, setIsOpen }) => {

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsOpen]);

  return (
    <>
      <aside
        className={`bg-gray-800 text-white w-64 h-full fixed top-0 left-0 transition-transform duration-200 ${isOpen ? "transform translate-x-0" : isSmallScreen ? "transform -translate-x-full" : "transform -translate-x-64"
          } ${isSmallScreen ? " z-50" : ""}`}
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
          <Link to={"alumni"}>
            <li className="p-4 hover:bg-gray-600">Alumni Profiles</li>
          </Link>
          <Link to="events">
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



