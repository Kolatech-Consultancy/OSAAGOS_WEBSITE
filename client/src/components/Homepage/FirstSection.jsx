import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
const FirstSection = () => {
    return (
        <Swiper
          spaceBetween={12}
          slidesPerView={1}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="bg-gray-600"
        >
          <SwiperSlide>
            <div className="h-[80vh] flex justify-center items-center  bg-img_1">
              <div className="text-white max-w-screen-md mx-auto w-[90%] text-center">
                <h1 className="text-4xl font-extrabold">
                  Welcome to the OSAAGOS Alumni Hub!
                </h1>
                <p className="mt-3">
                  Whether near or far, the OSAAGOS community is always here for
                  you. Explore the latest updates, find upcoming events, and
                  connect with fellow alumni. We're glad you're here.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-[80vh] flex justify-center items-center  bg-img_2">
              <div className=" text-white max-w-screen-md mx-auto w-[90%] text-center">
                <h1 className="text-4xl font-extrabold">
                  Welcome Home, Alumni!
                </h1>
                <p className="mt-3">
                  We're thrilled to have you back! Explore, connect, and relive
                  the memories. Welcome to the official OSAAGOS Alumni
                  Association website – your gateway to the past, present, and
                  future of our community
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-[80vh] flex justify-center items-center  bg-img_3">
              <div className=" text-white max-w-screen-md mx-auto w-[90%] text-center">
                <h1 className="text-4xl font-extrabold">
                  A Warm Welcome to Our Esteemed Alumni
                </h1>
                <p className="mt-3">
                  It's great to see you again! Our alumni network is a powerful
                  and supportive community. Dive in to connect, collaborate, and
                  celebrate our shared legacy. Welcome to your alumni home!
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-[80vh] flex justify-center items-center  bg-img_4">
              <div className=" text-white max-w-screen-md mx-auto w-[90%] text-center">
                <h1 className="text-4xl font-extrabold">
                  Reconnect and Reignite Your Network!
                </h1>
                <p className="mt-3">
                  Welcome to the OSAAGOS Alumni Association! Stay connected with
                  old friends, make new ones, and keep up with all the latest
                  news and events. Your journey with us continues here.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-[80vh] flex justify-center items-center  bg-img_5">
              <div className=" text-white max-w-screen-md mx-auto w-[90%] text-center">
                <h1 className="text-4xl font-extrabold">
                  Your Alumni Journey Continues Here
                </h1>
                <p className="mt-3">
                  Hello, and welcome back! We're excited to help you reconnect
                  with your fellow alumni, share your stories, and stay engaged
                  with the OSAAGOS family. Let's make new memories together.
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
    );
};

export default FirstSection;
