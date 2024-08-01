import React from "react";
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";
import ThirdSection from "./ThirdSection";
import FourthSection from "./FourthSection";
import Responsibilty from "./Responsibilty";
import CountSection from "./CountSection";
import JobListing from "./JobListing";

const Main = () => {
  return (
    <>
      <main className="slider">
        <FirstSection />
        <SecondSection />
        <ThirdSection />
        <Responsibilty />
        <CountSection />
        <FourthSection />
        <JobListing />
      </main>
    </>
  );
};

export default Main;
