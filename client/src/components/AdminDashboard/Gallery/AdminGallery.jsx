import { useState } from "react";

function AdminGallery() {
  const [active, setActive] = useState("gallery");
  const media = [
    {
      id: 1,
      fileType: "image",
      path: "https://via.placeholder.com/300",
      description: "Hello everyone",
      title: "Hello everyone",
    },
    {
      id: 2,
      fileType: "video",
      path: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Hello everyone",
      title: "Hello everyone",
    },

    {
      id: 3,
      fileType: "image",
      path: "https://via.placeholder.com/300",
      description: "Hello everyone",
      title: "Hello everyone",
    },
    {
      id: 4,
      fileType: "video",
      path: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Hello everyone",
      title: "Hello everyone",
    },
    {
      id: 5,
      fileType: "image",
      path: "https://via.placeholder.com/300",
      description: "Hello everyone",
      title: "Hello everyone",
    },
  ];

  function deleteItem(id) {
    console.log(id);
  }

  return (
    <main>
      <nav className="bg-white text-xl flex gap-4 text-center justify-center rounded-t-lg py-6">
        <p
          className={`cursor-pointer px-4 py-2 border rounded-md hover:bg-black hover:text-white transition-all duration-200 ${
            active === "gallery" ? "bg-black text-white" : ""
          }`}
          onClick={(e) => setActive("gallery")}
        >
          Gallery
        </p>
        <p
          className={`cursor-pointer px-4 py-2 border rounded-md hover:bg-black hover:text-white transition-all duration-200 ${
            active === "modal" ? "bg-black text-white" : ""
          }`}
          onClick={(e) => setActive("modal")}
        >
          Create
        </p>
      </nav>
      <section className="bg-white p-2 rounded-b-md mt-4 h-full">
        {active === "gallery" && (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
            {media.map((e) => {
              return (
                <article key={e.id}>
                  {e.fileType === "image" && (
                    <div className="slide card-container">
                      <div className="size">
                        <div className="card-container-front pos">
                          {e.fileType === "image" && (
                            <img
                              src={e.path}
                              className="w-full h-full object-cover overflow-hidden"
                              alt="proj1"
                            />
                          )}
                        </div>
                        <div className="card-container-back pos">
                          <h2 className="font-medium text-xl">{e.title}</h2>
                          <h3>{e.description}</h3>
                          <div className="flex gap-4 mt-2">
                            <button className="px-3 py-1 rounded-md cursor-pointer hover:bg-green-400 transition-all duration-200 bg-green-600">
                              Edit
                            </button>
                            <button
                              className="px-3 py-1 rounded-md cursor-pointer hover:bg-red-400 transition-all duration-200 bg-red-600"
                              onClick={() => deleteItem(e.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {e.fileType === "video" && (
                    <div className="h-[15rem] bg-gray-500 text-white">
                      <div className="h-[8rem]">
                        {e.fileType === "video" && (
                          <iframe
                            src={e.path}
                            title="Video"
                            className="w-full h-full overflow-hidden"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        )}
                      </div>
                      <div className="h-fit py-1">
                        <div className="px-2">
                          <h2 className="font-medium text-lg">
                            Title : {e.title}
                          </h2>
                          <h3 className="">Desc : {e.description}</h3>
                          <div className="flex gap-4 mt-1 justify-center">
                            <button className="px-3 py-1 rounded-md cursor-pointer hover:bg-green-400 transition-all duration-200 bg-green-600">
                              Edit
                            </button>
                            <button
                              className="px-3 py-1 rounded-md cursor-pointer hover:bg-red-400 transition-all duration-200 bg-red-600"
                              onClick={() => deleteItem(e.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
        {active === "modal" && <div>create form</div>}
      </section>
    </main>
  );
}

export default AdminGallery;
