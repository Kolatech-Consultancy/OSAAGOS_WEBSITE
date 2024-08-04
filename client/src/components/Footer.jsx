import React from "react";
import { Link } from "react-router-dom";
import logo2 from "../assets/os.svg";
import { SiMinutemailer } from "react-icons/si";
import {
  FaChevronRight,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  const usefulLink = [
    { label: "Price Plan" },
    { label: "Categories" },
    { label: "Popular Deal" },
    { label: "FAQ" },
    { label: "Support" },
    { label: "Price Plan" },
    { label: "Categories" },
    { label: "Popular Deal" },
    { label: "FAQ" },
    { label: "Support" },
  ];
  const university = [
    { label: "Price Plan" },
    { label: "Categories" },
    { label: "Popular Deal" },
    { label: "FAQ" },
    { label: "Support" },
  ];

  return (
    <>
      <footer className={`bg-blue-950 py-5 text-white`}>
        <div className="mx-8 grid-container">
          <div className="flex flex-col gap-2">
            <article className="flex justify-start">
              <div className="bg-white rounded-full">
                <img
                  className="w-[4rem] h-[4rem] object-cover"
                  src="/Logo.png"
                  alt=""
                />
              </div>
            </article>
            <p className="text-gray-500 font-semibold text-wrap">
              We are legend Lorem ipsum dolor sitmet, nsecte ipisicing eit, sed
              do eiusmod tempor incidunt ut et do maga aliqua enim ad minim.
            </p>
            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
              <p className="font-medium">Phone number : +2348155563851</p>
              <p className="font-medium"> Fax: +88474 156 362</p>
            </div>
            <p className="font-medium">Email: demoemail@gmail.com</p>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-semibold">Get In Touch</h2>
            <p>
              We are legend Lorem ipsum dolor sitmet, nsecte ipisicing eit, sed
            </p>
            <article className="flex items-center bg-[rgba(204,204,204,.3)] overflow-hidden">
              <input
                type="email"
                className="bg-transparent border-0 outline-0 px-4 py-3 inline-flex w-full"
                placeholder="Enter Your Email"
              />
              <span className="sm:px-2 bg-blue-800 px-1 h-full font-bold sm:text-xl text-lg flex items-center cursor-pointer">
                <SiMinutemailer />
              </span>
            </article>
            <div className="flex gap-2">
              <Link
                to={"/"}
                className="bg-blue-800 hover:bg-blue-600 transition-all duration-100 p-2"
              >
                <FaFacebookF />
              </Link>
              <Link
                to={"/"}
                className="bg-blue-800 hover:bg-blue-600 transition-all duration-100 p-2"
              >
                <FaTwitter />
              </Link>
              <Link
                to={"/"}
                className="bg-blue-800 hover:bg-blue-600 transition-all duration-100 p-2"
              >
                <FaLinkedinIn />
              </Link>
              <Link
                to={"/"}
                className="bg-blue-800 hover:bg-blue-600 transition-all duration-100 p-2"
              >
                <FaInstagram />
              </Link>
            </div>
          </div>
          <div className=" flex flex-col gap-6">
            <h2 className="text-3xl font-semibold">Useful Link</h2>

            <ul className="grid sm:grid-cols-2 grid-cols-1 gap-x-8 gap-y-4">
              {usefulLink.map((element, index) => {
                return (
                  <Link
                    to={"/"}
                    key={element.label + index}
                    className="whitespace-nowrap text-white flex items-center font-medium text-sm hover:text-blue-900 hover:translate-x-2 transition-all duration-200"
                  >
                    <FaChevronRight />
                    <span>{element.label}</span>
                  </Link>
                );
              })}
            </ul>
          </div>
          <div className=" flex flex-col gap-6">
            <h2 className="text-3xl font-semibold">University</h2>

            <ul className="flex flex-col gap-4">
              {university.map((element, index) => {
                return (
                  <Link
                    to={"/"}
                    key={element.label + index}
                    className="whitespace-nowrap text-white flex items-center font-medium text-sm hover:text-blue-900 hover:translate-x-2 transition-all duration-200"
                  >
                    <FaChevronRight />
                    <span>{element.label}</span>
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
