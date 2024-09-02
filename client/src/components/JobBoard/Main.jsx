import React, { useEffect, useState, useCallback } from "react";
import axios from "../../utils/axios";
import toast from "react-hot-toast";
import Spinner from "../Spinner";

const Main = () => {
  const [search, setSearch] = useState("");
  const [fetching, setFetching] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [jobs, setJobs] = useState([]);

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, delay);
    };
  };

  const handleSearch = useCallback(
    debounce(() => {
      const response = jobs.filter((job) =>
        job.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredJobs(response);
    }, 300),
    [jobs, search]
  );

  useEffect(() => {
    handleSearch();
  }, [search, handleSearch]);

  async function fetchJob() {
    try {
      setFetching(true);
      const response = await axios.get("/api/jobs");
      setJobs(response.data);
      setFilteredJobs(response.data);
      setFetching(false);
    } catch (error) {
      setFetching(false);
      toast.error(error.response ? error.response.data.message : error.message);
    }
  }

  useEffect(() => {
    fetchJob();
  }, []);

  if (fetching) return <Spinner />;

  const isPastDeadline = (deadline) => {
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    return deadlineDate < currentDate;
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
      <div className="p-6 max-w-screen-xl w-[90%] mx-auto">
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
          </div>
        </article>
        <ul className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:grid-cols-2">
          {filteredJobs.map((job) => (
            <li key={job._id} className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-600">
                {job.company} - {job.location}
              </p>
              <p className="text-sm text-gray-500 capitalize">
                Type: {job.employmentType}
              </p>
              <p className="mt-2">{job.description}</p>
              <p className="text-sm text-gray-500">
                Application Deadline:{" "}
                {new Date(job.applicationDeadline).toLocaleDateString()}
              </p>
              <div className="flex justify-center">
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                  disabled={isPastDeadline(job.applicationDeadline)}
                >
                  {isPastDeadline(job.applicationDeadline)
                    ? "Expired"
                    : "Apply Now"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Main;
