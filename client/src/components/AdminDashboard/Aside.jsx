import React from "react";
import { Link } from "react-router-dom";

const Aside = () => {
  return (
    <>
      <aside className="bg-gray-800 text-white w-64 min-h-screen absolute">
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
      </aside>
    </>
  );
};

export default Aside;
