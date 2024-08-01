import { Link, useLocation } from "react-router-dom";
import logo from "../assets/osaagoslogo.png";
import logo2 from "../assets/os.svg";
import React, { useState } from 'react';

const Header = () => {
  const location = useLocation();
  const dashboard = location.pathname === "/dashboard";
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
 
    // Dummy data for search results
    const alumniList = [
      { id: 1, name: 'Ibrahim' },
      { id: 2, name: 'Ibrahim' },
    ];

    const results = alumniList.filter(alumni => alumni.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setSearchResults(results);
  };

  return (
    <>
      <header className="sticky top-0 z-30">
        <div
          className={`bg-blue-800 flex justify-between ${
            dashboard ? "mb-3" : ""
          } text-white py-3`}
        >
          <Link to="/">
            <div
              className={`${
                !dashboard && "hidden"
              } mx-10 flex flex-col items-start`}
            >
              <img className="" src={logo2} alt="OSAAGOS Logo" />
              <h1 className="text-2xl font-bold ml-2">OSAAGOS</h1>
            </div>
          </Link>
          <div className="flex items-center space-x-5 mx-10">
            <input
              type="text"
              placeholder="Search alumni..."
              className="px-4 py-2 rounded-lg text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="bg-orange-400 px-5 py-2 rounded-lg ml-20"
            >
              Search
            </button>
            <Link to="/login">
              <li className="bg-orange-400 px-5 py-2 rounded-lg list-none">
                Login
              </li>
            </Link>
            <Link
              to="/sign-up"
              className="px-5 py-2 hover:bg-orange-400 rounded-lg list-none"
            >
              <li>Register</li>
            </Link>
          </div>
        </div>
        <div
          className={`flex justify-between px-10 ${
            dashboard && "hidden"
          } bg-white items-center shadow-lg`}
        >
          <Link to="/">
            <div className="flex flex-col justify-start items-start">
              <img src={logo} alt="logo" />
              <h1 className="text-2xl">OSAAGOS</h1>
            </div>
          </Link>
          <div>
            <ul className="flex space-x-5">
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/aboutus">
                <li>About Us</li>
              </Link>
              {/* <ul>Alumni Profiles</ul> */}
              {/* <ul>Networking</ul> */}
              <Link to="/events">
                <li>Events</li>
              </Link>
              <Link to="/news">
                <li>News & Announcements</li>
              </Link>
              <Link to="/jobs">
                <li>Job Board</li>
              </Link>
              <Link to="/donations">
                <li>Donations</li>
              </Link>
              <Link to="/media">
                <li>Media Gallery</li>
              </Link>
              <Link to="/contactus">
                <li>Contact Us</li>
              </Link>
              <Link to="/dashboard">
                <li>Admin Dashboard</li>
              </Link>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;