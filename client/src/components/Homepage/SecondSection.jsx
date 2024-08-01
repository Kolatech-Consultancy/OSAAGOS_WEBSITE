import React from "react";
import eventImg from "../../assets/laptop.jpg"

const SecondSection = () => {
    return (
      <>
        <section className="margin-top relative flex space-x-10 bg-blue-500 text-white w-5/6 mx-auto py-5 px-10">
          <div>
            <img src={eventImg} alt="event-img" />
          </div>
          <div>
            <div className="absolute -top-5 right-10">
              <h1 className="text-2xl bg-white text-blue-800 font-extrabold w-60 py-3 px-5">
                Upcoming Event
              </h1>
            </div>
            <div></div>
            <div className="mt-10">
              {/* <h1></h1> */}
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
