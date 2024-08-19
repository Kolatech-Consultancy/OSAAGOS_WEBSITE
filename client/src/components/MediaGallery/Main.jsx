import React, { useState } from "react";
import Heading from "./Heading";
import MediaFilter from "./MediaFilter";
const mediaItems = [
  {
    id: 1,
    fileType: "image",
    path: "https://via.placeholder.com/300",
    description: "Hello everyone",
  },
  {
    id: 2,
    fileType: "video",
    path: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  { id: 3, fileType: "image", path: "https://via.placeholder.com/300" },
  {
    id: 4,
    fileType: "video",
    path: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  { id: 5, fileType: "image", path: "https://via.placeholder.com/300" },
];

function filterItems(type) {
  if (type === "all") {
    return mediaItems;
  }
  return mediaItems.filter((item) => item.type === type);
}

const Main = () => {
  const [filterVal, setFilterVal] = useState("all");
  const filteredMediaItems = filterItems(filterVal.toLowerCase());

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredMediaItems.length / itemsPerPage);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const paginatedItems = filteredMediaItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="py-6 ">
      <div className="w-full h-[50vh] bg-green-500 mb-8 flex justify-center items-center text-center bg-img text-white">
        <div>
          <h2 className="text-5xl my-4 font-semibold">Gallery</h2>
          <p className="text-lg font-semibold">
            Explore our beautiful gallery, showcasing a stunning collection of
            images and videos. Discover the beauty and creativity in every piece
          </p>
        </div>
      </div>
      <header className="mb-6">
        <MediaFilter filterVal={filterVal} setFilterVal={setFilterVal} />
      </header>
      <main className="max-w-[85%] w-full mx-auto my-4">
        <Heading />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {paginatedItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {item.type === "image" ? (
                <img
                  src={item.url}
                  alt="Media"
                  className="w-full h-48 object-cover"
                />
              ) : item.type === "video" ? (
                <iframe
                  src={item.url}
                  title="Video"
                  className="w-full h-48"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : null}
            </div>
          ))}
        </div>

        <div className=" w-[70%] mx-auto">
          <div className="flex justify-center mt-8 text-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handleClick(index + 1)}
                className={`px-2 py-1 mx-1 border-2 border-blue-700 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-blue-700 text-white"
                    : "bg-white text-blue-700"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
