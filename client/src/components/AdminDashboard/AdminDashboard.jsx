import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Aside from "./Aside";
import DashFooter from "./Footer";
import DashNavbar from "./Navbar";


const DashboardOverview = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);


  return (
    <main >
      <Aside isOpen={isOpen} setIsOpen={setIsOpen} isSmallScreen={isSmallScreen} setIsSmallScreen={setIsSmallScreen} />
      <section className={` ${isOpen ? "md:ml-64" : ""}  bg-slate-200 flex flex-col gap-5 min-h-screen h-full transition-all duration-200`}>
        <DashNavbar isOpen={isOpen} isSmallScreen={isSmallScreen} />
        <main className="px-2 sm:px-6 pt-28 pb-20">
          <Outlet />
        </main>
        <DashFooter/>
      </section>

    </main>
  );
};

export default DashboardOverview;
