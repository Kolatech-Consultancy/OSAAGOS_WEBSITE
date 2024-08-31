import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';

const NotificationButton = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New group created' },
    { id: 2, message: '1 pending user to be approved' },
    // { id: 3, message: 'Your password was updated' },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className="p-2 hover:bg-gray-700 text-slate-400 text-xl rounded-md relative"
        onClick={toggleDropdown}
      >
        <FaBell />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
            {notifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-2xl rounded-lg">
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Notifications</h2>
            {notifications.length > 0 ? (
              <ul>
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className="border-b border-gray-200 p-3 last:border-none"
                  >
                    {notification.message}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center text-gray-500">No notifications available</div>
            )}
          </div>
          <div className="flex justify-end p-4">
            <button
              onClick={toggleDropdown}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationButton;
