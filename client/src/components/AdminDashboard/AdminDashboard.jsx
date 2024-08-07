import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Aside from "./Aside";


const DashboardOverview = () => {
  const [isOpen, setIsOpen] = useState(true);



  return (
    <main >
      <Aside isOpen={isOpen} setIsOpen={setIsOpen} />
      <section className={` ${isOpen ? "md:ml-64" : ""} p-6 bg-slate-200 min-h-screen h-full transition-all duration-200`}>
        <Outlet />
      </section>

    </main>
  );
};

export default DashboardOverview;
