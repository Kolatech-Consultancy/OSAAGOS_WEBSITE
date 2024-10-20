import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import MediaFilter from "./MediaFilter";
import axios from "../../utils/axios";

const Main = () => {
  const [media, setMedia] = useState([]);
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

  function filterItems(type) {
    if (type === "all") {
      return media;
    }
    return media.filter((item) => item.fileType === type);
  }

  useEffect(() => {
    async function fetchMedia() {
      const med = await axios.get("/api/media");
      setMedia(med.data);
    }
    fetchMedia();
  }, []);

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
              className="bg-white rounded-lg shadow-md overflow-hidden group relative h-72"
            >
              {item.fileType === "image" ? (
                <>
                  <img
                    src={item.fileUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm mt-2">{item.description}</p>
                  </div>
                  <div className="block sm:hidden p-4">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm mt-2">{item.description}</p>
                  </div>
                </>
              ) : item.fileType === "video" ? (
                <>
                  <div className="aspect-w-16 aspect-h-9">
                    {item.fileType === "video" ? (
                      item.source === "youtube" ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${
                            item.fileUrl.split("v=")[1]
                          }`}
                          title={item.title}
                          className="w-full h-48"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <video
                          controls
                          src={item.fileUrl}
                          className="w-full h-48"
                        >
                          Your browser does not support the video tag.
                        </video>
                      )
                    ) : null}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm mt-2">
                      {" "}
                      {item.description.split(" ").length > 5
                        ? item.description.split(" ").slice(0, 5).join(" ") +
                          " ..."
                        : item.description}
                    </p>
                  </div>
                </>
              ) : null}
            </div>
          ))}
        </div>

        <div className=" w-[70%] mx-auto">
          <div className="flex justify-center mt-8 text-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
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
