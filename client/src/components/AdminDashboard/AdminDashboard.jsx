import React, { useState } from "react";

import Aside from "./Aside";
import Main from "./Main";

const DashboardOverview = () => {
  const [isOpen, setIsOpen] = useState(true);



  return (
    <main >
      <Aside isOpen={isOpen} setIsOpen={setIsOpen} />
      <Main isOpen={isOpen} />
    </main>
  );
};

export default DashboardOverview;
