import { useState } from "react";

function AdminGallery() {
  const [active, setActive] = useState("gallery");
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
      <section>
        {active === "gallery" && <div>gallery</div>}
        {active === "modal" && <div>create form</div>}
      </section>
    </main>
  );
}

export default AdminGallery;
