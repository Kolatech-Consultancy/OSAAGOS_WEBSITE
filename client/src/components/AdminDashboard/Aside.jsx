import React, { useEffect, useState } from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import "../../index.scss"
import { Link } from "react-router-dom";

const Aside = ({ isOpen, setIsOpen, isSmallScreen, setIsSmallScreen }) => {
 
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
        className={`bg-gray-800 z-50 text-white w-64 h-screen  fixed top-0 left-0 transition-transform duration-200 ${isOpen ? "transform translate-x-0" : isSmallScreen ? "transform -translate-x-full" : "transform -translate-x-64"
          } `}
      >
        <div
          className={`absolute bg-blue-600 p-1  ${isOpen ? "right-0" : "-right-[9%]"} cursor-pointer transition-all duration-200"`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaLongArrowAltLeft /> : <FaLongArrowAltRight />}
        </div>
        <div className=" w-full h-[6rem] bg-blue-200 hover:bg-gray-600">
          <img
            className="max-h-full max-w-full object-contain"
            src="/logo.png"
            alt="OSAAGOS Logo"
          />
        </div>
        <ul className="overflow-y-scroll h-[75vh] mb-6 dashLists">
          <Link to="">
            <li className="p-4 hover:bg-gray-600">Analytics Overview</li>
          </Link>
          <Link to={"alumni"}>
            <li className="p-4 hover:bg-gray-600">Alumni Profiles</li>
          </Link>
          <Link to="events">
            <li className="p-4 hover:bg-gray-600">Events Management</li>
          </Link>
          <Link to="news">
            <li className="p-4 hover:bg-gray-600">News and Announcements</li>
          </Link>
          <Link>
            <li className="p-4 hover:bg-gray-600">Job Board</li>
          </Link>
          <Link to="fundraising-campaign">
            <li className="p-4 hover:bg-gray-600">Fundraising Campaigns</li>
          </Link>
          <Link to="groups">
            <li className="p-4 hover:bg-gray-600">Manage Groups</li>
          </Link>
          <Link to="forums">
            <li className="p-4 hover:bg-gray-600">Manage Forums</li>
          </Link>
          <Link to="gallery">
            <li className="p-4 hover:bg-gray-600">Media Gallery</li>
          </Link>
          <Link to="admin/profile">
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



