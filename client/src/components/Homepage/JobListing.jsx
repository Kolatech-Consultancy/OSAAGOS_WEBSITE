import React from "react";

const jobs = [
  {
    name: "Urgently Need Five Data Center Specialist",
    link: "https://codeboxr.net/themedemo/unialumni/html/assets/images/job/compnay-logo-1.png",
    text: "Claritas est etiam procsus dymicus, qui sequitur mutationem Claritas est etiam procsus est etiam procsus dymicus",
    expired: false,
  },
  {
    name: "Product Owner (m/f) for our Charter Business",
    link: "https://codeboxr.net/themedemo/unialumni/html/assets/images/job/compnay-logo-2.png",
    text: "Claritas est etiam procsus dymicus, qui sequitur mutationem Claritas est etiam procsus est etiam procsus dymicus",
    expired: true,
  },
  {
    name: "Urgently Need Five Data Center Specialist",
    link: "https://codeboxr.net/themedemo/unialumni/html/assets/images/job/compnay-logo-1.png",
    text: "Claritas est etiam procsus dymicus, qui sequitur mutationem Claritas est etiam procsus est etiam procsus dymicus",
    expired: false,
  },
  {
    name: "Urgently Need Five Data Center Specialist",
    link: "https://codeboxr.net/themedemo/unialumni/html/assets/images/job/compnay-logo-1.png",
    text: "Claritas est etiam procsus dymicus, qui sequitur mutationem Claritas est etiam procsus est etiam procsus dymicus",
    expired: false,
  },
  {
    name: "Remotely - Javascript Developer Node.js",
    link: "https://codeboxr.net/themedemo/unialumni/html/assets/images/job/compnay-logo-3.png",
    text: "Claritas est etiam procsus dymicus, qui sequitur mutationem Claritas est etiam procsus est etiam procsus dymicus",
    expired: true,
  },
  {
    name: "Five Years Experience Data Center Specialist Needed",
    link: "https://codeboxr.net/themedemo/unialumni/html/assets/images/job/compnay-logo-4.png",
    text: "Claritas est etiam procsus dymicus, qui sequitur mutationem Claritas est etiam procsus est etiam procsus dymicus",
    expired: false,
  },
  {
    name: "Remotely - Javascript Developer Node.js",
    link: "https://codeboxr.net/themedemo/unialumni/html/assets/images/job/compnay-logo-3.png",
    text: "Claritas est etiam procsus dymicus, qui sequitur mutationem Claritas est etiam procsus est etiam procsus dymicus",
    expired: true,
  },
  {
    name: "Five Years Experience Data Center Specialist Needed",
    link: "https://codeboxr.net/themedemo/unialumni/html/assets/images/job/compnay-logo-4.png",
    text: "Claritas est etiam procsus dymicus, qui sequitur mutationem Claritas est etiam procsus est etiam procsus dymicus",
    expired: false,
  },
];

function JobListing() {
  return (
    <div className="my-4 py-8 px-8 mb-8">
      <h2 className="text-center text-4xl font-bold capitalize whitespace-nowrap py-2 mb-12">
        Recent Jobs
      </h2>
      <main className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {jobs.map((job, i) => {
          return (
            <article
              className="flex-col flex gap-6 items-center text-center border-2 py-6 px-5"
              key={job.link + i}
            >
              <div className="h-[4rem] w-[4rem]">
                <img src={job.link} alt="" className="h-full w-full" />
              </div>
              <h3 className="text-xl font-semibold">{job.name}</h3>
              <p className="font-normal text-lg">{job.text} .....</p>
              <button
                className={` ${
                  job.expired ? "bg-gray-600 cursor-not-allowed" : "bg-blue-800"
                } text-white text-xl font-semibold py-2 px-4 rounded-md`}
              >
                Apply now
              </button>
            </article>
          );
        })}
      </main>

      <div className="flex justify-center items-center mt-10">
        <button className="bg-blue-900 hover:bg-blue-600 transition-all duration-150 text-white text-2xl font-semibold py-2 px-4 rounded-md">
          All Job List
        </button>
      </div>
    </div>
  );
}

export default JobListing;
