import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
const dummyNews = [
  {
    title: "Alumni Reunion 2024",
    content:
      "Excited to announce our annual alumni reunion. Don’t miss reconnecting with old friends!",
    author: "Jane Smith",
  },
  {
    title: "Tech Innovations Seminar",
    content:
      "Join us for a seminar on the latest tech innovations and trends in the industry.",
    author: "John Doe",
  },
  {
    title: "Scholarship Opportunities",
    content:
      "New scholarship opportunities are available for current students and recent graduates.",
    author: "Alice Johnson",
  },
  {
    title: "Career Fair 2024",
    content:
      "Our annual career fair is back with new companies and exciting opportunities.",
    author: "Bob Brown",
  },
  {
    title: "Workshop on Web Development",
    content:
      "Enroll in our workshop to enhance your skills in modern web development techniques.",
    author: "Emily Davis",
  },
  {
    title: "Networking Event",
    content:
      "A chance to meet and network with industry leaders and fellow alumni.",
    author: "Michael Lee",
  },
  {
    title: "New Alumni Portal Launch",
    content:
      "We are launching a new portal for easier access to alumni resources and networking.",
    author: "Sarah Wilson",
  },
  {
    title: "Volunteering Opportunities",
    content:
      "Get involved with our community through various volunteering programs.",
    author: "David Clark",
  },
  {
    title: "Annual Report Release",
    content:
      "Our annual report has been released with updates on the year’s achievements and goals.",
    author: "Laura Martinez",
  },
];

const Section = () => {
  return (
    <main>
      <div className="news w-full h-[50vh] mb-8 flex justify-center items-center text-center text-white">
        <div className="flex flex-col gap-2">
          <h2 className="text-5xl my-4 font-semibold capitalize">
            News & Announcement
          </h2>
          <p className="text-sm font-semibold px-8">
            Welcome to the OSAAGOS Alumni Association.
          </p>
        </div>
      </div>
      <section className="bg-gray-100 py-10 px-5 sm:px-10 lg:px-20 flex flex-col gap-14">
        <h2 className="text-4xl font-bold text-center">Latest News</h2>
        <section>
          <Swiper
            spaceBetween={12}
            slidesPerView={2}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              300: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            modules={[Autoplay]}
            className="px-2"
          >
            {dummyNews.map((news, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6 h-[12rem] flex flex-col justify-between">
                  <h2 className="text-xl font-semibold mb-2 whitespace-nowrap">
                    {news.title}
                  </h2>
                  <p className="text-gray-700 mb-4">{news.content}</p>
                  <p className="text-gray-500">Author: {news.author}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <h2 className="text-4xl font-bold text-center">Announcements</h2>

        <section>
          <Swiper
            spaceBetween={12}
            slidesPerView={3}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              300: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            modules={[Autoplay]}
            className="px-2"
          >
            {dummyNews.map((news, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6 flex flex-col justify-between h-[12rem]">
                  <h2 className="text-xl font-semibold mb-2 whitespace-nowrap">
                    {news.title}
                  </h2>
                  <p className="text-gray-700 mb-4">{news.content}</p>
                  <p className="text-gray-500">Author: {news.author}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </section>
    </main>
  );
};

export default Section;
