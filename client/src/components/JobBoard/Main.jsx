import React, { useState } from "react";

const jobListings = [
  {
    id: 1,
    title: "Frontend Developer Angular",
    company: "Tech Corp",
    location: "Ibadan",
    type: "Full-time",
    description: "Build and maintain user interfaces using React.",
  },
  {
    id: 2,
    title: "Backend Developer Express",
    company: "Data Inc",
    location: "Lagos",
    type: "Part-time",
    description: "Develop server-side logic and databases.",
  },
  {
    id: 4,
    title: "Fullstack Developer ",
    company: "Data Inc",
    location: "Lagos",
    type: "Part-time",
    description: "Develop server-side logic and databases.",
  },
  {
    id: 5,
    title: "Frontend Developer React",
    company: "Tech Corp",
    location: "Ibadan",
    type: "Full-time",
    description: "Build and maintain user interfaces using React.",
  },
  {
    id: 6,
    title: "Backend Developer Php",
    company: "Data Inc",
    location: "Lagos",
    type: "Part-time",
    description: "Develop server-side logic and databases.",
  },
  {
    id: 7,
    title: "Frontend Developer VueJs",
    company: "Tech Corp",
    location: "Ibadan",
    type: "Full-time",
    description: "Build and maintain user interfaces using React.",
  },
  {
    id: 8,
    title: "Backend Developer NodeJs",
    company: "Data Inc",
    location: "Lagos",
    type: "Part-time",
    description: "Develop server-side logic and databases.",
  },
  {
    id: 9,
    title: "Frontend Developer NextJs",
    company: "Tech Corp",
    location: "Ibadan",
    type: "Full-time",
    description: "Build and maintain user interfaces using React.",
  },
  {
    id: 10,
    title: "Backend Developer NestJs",
    company: "Data Inc",
    location: "Lagos",
    type: "Part-time",
    description: "Develop server-side logic and databases.",
  },
];

const Main = () => {
  const [search, setSearch] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobListings);

  const handleSearch = () => {
    const results = jobListings.filter(
      (job) =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredJobs(results);
  };

  return (
    <section className="bg-gray-50">
      <div className="w-full h-[50vh] flex justify-center items-center text-center bg-img text-white">
        <div>
          <h2 className="text-5xl my-4 font-semibold capitalize">Jobs</h2>
          <p className="text-sm font-semibold px-8">
            Welcome to the OSAAGOS Alumni Association.
          </p>
        </div>
      </div>
      <div className="p-6  max-w-screen-xl w-[90%] mx-auto">
        <article className="sm:flex justify-between items-center">
          <header className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Job Board</h1>
            <p className="text-gray-600">
              Find your next career opportunity here.
            </p>
          </header>
          <div className="mb-4 flex">
            <input
              type="text"
              className="flex-1 p-2 border border-gray-300 rounded-l-md outline-none"
              placeholder="Search for jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="p-2 bg-blue-500 text-white rounded-r-md"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </article>
        <ul className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:grid-cols-2">
          {filteredJobs.map((job) => (
            <li key={job.id} className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-600">
                {job.company} - {job.location}
              </p>
              <p className="text-sm text-gray-500">{job.type}</p>
              <p className="mt-2">{job.description}</p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
                Apply Now
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Main;
