import React from "react";
import eventImg from "../../assets/laptop.jpg"

const SecondSection = () => {
    return (
      <>
        <section className=" relative sm:-mt-[8rem] mt-6 z-50 flex flex-wrap-reverse gap-4 md:flex-nowrap space-x-10 bg-blue-500 text-white md:w-5/6 w-[95%] mx-auto py-5 px-10">
          <div>
            <img src={eventImg} className="w-full object-cover h-full" alt="event-img" />
          </div>
          <div>
            <div className="absolute -top-5 right-10">
              <h1 className="text-2xl bg-white shadow-lg text-blue-800 font-extrabold w-60 py-3 px-5">
                Upcoming Event
              </h1>
            </div>
            <div></div>
            <div className="mt-10">
              <p className="">
                We are thrilled to invite you to our Annual Alumni Networking
                Gala, a night dedicated to celebrating the achievements of our
                alumni and fostering meaningful connections within our
                community.
              </p>
              <div className="mt-5">
                <p>
                  <span className="font-extrabold mr-3">Date:</span>September
                  15, 2024
                </p>
                <p>
                  <span className="font-extrabold mr-3">Time:</span>6:00 PM -
                  10:00 PM
                </p>
                <p>
                  <span className="font-extrabold mr-3">Location:</span>Grand
                  Ballroom, City Conference Center
                </p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
};

export default SecondSection;
