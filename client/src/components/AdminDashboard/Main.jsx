import React from "react";

const Main = ({ isOpen }) => {
  console.log(isOpen);

  return (
    <>
      <main
        className={` ${
          isOpen ? "ml-64" : ""
        } p-6 bg-white min-h-screen h-full transition-all duration-200`}
      >
        <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
        <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="bg-blue-100 p-4 shadow rounded">
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-3xl">150</p>
          </div>
          <div className="bg-green-100 p-4 shadow rounded">
            <h2 className="text-lg font-semibold">Events</h2>
            <p className="text-3xl">8</p>
          </div>
          <div className="bg-yellow-100 p-4 shadow rounded">
            <h2 className="text-lg font-semibold">News</h2>
            <p className="text-3xl">12</p>
          </div>
          <div className="bg-red-100 p-4 shadow rounded">
            <h2 className="text-lg font-semibold">Donations</h2>
            <p className="text-3xl">$5,000</p>
          </div>
        </div>
        <h2 className="text-xl font-bold mt-8">Recent Activities</h2>
        <div className="bg-gray-100 p-4 shadow rounded mt-4">
          <p>No recent activities.</p>
        </div>
      </main>
    </>
  );
};

export default Main;
