import React from 'react';
import AboutSecondSection from './SecondSection';
import AboutThirdSection from './ThirdSection';
import AboutFourthSection from './FourthSection';


const Main = () => {
  return (
    <section>
      <div className="w-full h-[50vh] mb-8 flex justify-center items-center text-center bg-img text-white">
        <div>
          <h2 className="text-5xl my-4 font-semibold capitalize">About Us</h2>
          <p className="text-sm font-semibold px-8">
            Welcome to the OSAAGOS Alumni Association. We are dedicated to
            fostering a strong network among our alumni and supporting the
            continuous growth and development of our members.
          </p>
        </div>
      </div>
      <main className=" p-6 min-h-screen max-w-screen-lg w-[90%] mx-auto">
        {/* <AboutFirstSection /> */}
        <div className="flex justify-center flex-wrap md:flex-nowrap items-center md:gap-20 gap-8">
          <AboutSecondSection />
          <AboutThirdSection />
        </div>
        <AboutFourthSection />
      </main>
    </section>
  );
};

export default Main;
