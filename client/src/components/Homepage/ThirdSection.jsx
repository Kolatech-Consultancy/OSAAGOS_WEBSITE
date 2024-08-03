import React from "react";
import hugImg from "../../assets/hug.jpg"

const ThirdSection = () => {
    return (
      <>
        <section className="bg-gray-300 sm:p-6 p-2 sm:w-4/5 w-full sm:mx-auto mx-2 mt-10 md:flex">
      
            <div>
              <img className="mx-auto h-full object-cover" src={hugImg} alt="mission-img" />
            </div>
            <div className="sm:mx-10 mx-4">
              <h1 className="text-4xl font-bold text-center mb-2">
                Our Mission
              </h1>
              <p className="">
                At OSAAGOS, our mission is to foster a thriving and engaged
                community of alumni, united by shared experiences and a
                commitment to mutual growth and success. We aim to:
                <br />
                <span className="font-bold sm:mr-3">-Connect:</span> Build a robust
                network where alumni can reconnect, share experiences, and
                support each other.
                <br />
                <span className="font-bold sm:mr-3">-Support:</span> Provide
                resources and opportunities for continuous personal and
                professional development.
                <br />
                <span className="font-bold sm:mr-3">-Grow:</span> Encourage
                lifelong learning and advancement through events, workshops, and
                mentoring programs.
                <br />
                <span className="font-bold sm:mr-3">-Contribute:</span> Empower
                alumni to give back to their community and support the next
                generation of students.
                <br />
                Together, we strive to create a vibrant alumni community that
                inspires and empowers every member to achieve their fullest
                potential.
              </p>
            </div>
        </section>
      </>
    );
};

export default ThirdSection;
