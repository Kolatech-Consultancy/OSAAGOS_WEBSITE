import React, { useState, useEffect } from 'react';
import { FaEdit, FaEllipsisH, FaPlus, FaSearch, FaTrash, FaUser } from 'react-icons/fa';
import AddEditJobModal from './AddEditJobModal';
import DeleteJobModal from './DeleteJobModal';
import { getJob, deleteJob, editJob, addJob } from '../../../services/api';
import "../../../index.scss";
import SpinnerMini from '../../SpinnerMini';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { useToggleDropdown } from '../useCloseDropdown';
import { formatDate } from '../../../services/formatDate';

const JobsList = () => {
    const [Job, setJob] = useState([]);
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentJob, setCurrentJob] = useState(null);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const arrOfMonth = ["Jan", 'Feb', 'Mar', 'April', 'May', 'June', 'uly', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let isMounted = true
    const {isOpen, toggleDropdown} = useToggleDropdown()



    useEffect(() => {
        const fetchJob = async () => {
            try {
                setLoader(true);
                const response = await getJob();
                console.log(response.data);
                setJob(response.data);
            } catch (error) {
                setError(true);
                console.error(error);
            } finally {
                setLoader(false);
            }
        };
        if (isMounted) fetchJob();
        return () => {
            isMounted = false
        }
    }, []);
    const handleAddEditJob = async (JobData) => {
        try {
            setIsLoading(true);
            if (currentJob) {
                await editJob(currentJob._id, JobData);
                setJob(Job.map(job =>
                    job._id === currentJob._id ? JobData : job
                ));
                toast.success("Job updated successfully");
            } else {
                const newJob = await addJob(JobData);
                setJob([...Job, newJob.data])
                toast.success("Job added successfully");
                // window.location.reload()
            }
        } catch (error) {
            console.error(error);
            toast.error("Error saving Job.");
        } finally {
            setIsLoading(false);
            closeAddEditModal();
        }
    };

    const handleDeleteJob = async () => {
        try {
            setIsLoading(true);
            await deleteJob(currentJob._id);
            setJob(Job.filter(al => al._id !== currentJob._id));
            toast.success('Job deleted successfully');
        } catch (error) {
            console.error(error);
            toast.error("Error deleting Job");
        } finally {
            setIsLoading(false);
            closeDeleteModal();
        }
    };

    const openAddEditModal = (Job = null) => {
        setCurrentJob(Job);
        setIsAddEditModalOpen(true);
    };

    const closeAddEditModal = () => {
        setCurrentJob(null);
        setIsAddEditModalOpen(false);
    };

    const openDeleteModal = (Job) => {
        setCurrentJob(Job);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setCurrentJob(null);
        setIsDeleteModalOpen(false);
    };
    return (
        <>
            <main className="bg-white flex flex-col gap-10 rounded-t-lg py-5 text-gray-700">
                <div className="flex justify-between gap-3 items-center">
                    <h1 className="font-medium text-xl px-5">All Jobs</h1>
                    <button onClick={() => openAddEditModal()} className="ms-auto me-2 bg-blue-400 hover:bg-blue-500 w-fit text-slate-50 p-4 flex items-center justify-center gap-3 rounded-full sm:rounded-lg focus:outline-none">
                        <FaPlus />
                        <span className='hidden sm:flex'>Add Job</span>
                    </button>
                </div>

                <section className="flex px-5 flex-wrap md:flex-nowrap py-4 gap-5 items-center border-s-0 border-e-0 border-dashed border-gray-200" style={{ borderWidth: "1px" }}>
                    <div className="border ring-gray-100 flex gap-2 items-center py-2 px-3 rounded-lg w-full md:w-56" style={{ borderWidth: "1px" }}>
                        <FaSearch className="text-gray-500" />
                        <input type="search" placeholder="Search for Job" className="w-full border-0 focus-visible:outline-none" />
                    </div>

                </section>
            </main>
            <main className='tableContainer overflow-x-scroll mt-1 pb-3'>
                {loader ?
                    <div className="bg-white w-full h-40 flex items-center justify-center mt-2">
                        {Job.length === 0 &&
                            <SpinnerMini />
                        }
                    </div>
                    : <>
                        {Job.length > 0 ?
                            <table className="min-w-full profileTable">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4">Title</th>
                                        <th className="py-2 px-4">Company Name</th>
                                        <th className="py-2 px-4">Location</th>
                                        <th className="py-2 px-4">Salary Range</th>
                                        <th className="py-2 px-4">Employment Type</th>
                                        <th className="py-2 px-4">Application Deadline</th>
                                        <th className="py-2 px-4">Posted Date</th>
                                        <th className="py-2 px-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white text-gray-700">
                                    {Job.map((job, index) => (
                                        <tr key={job._id}>
                                            <td className="py-2 px-4">{job.title}</td>
                                            <td className="py-2 px-4">{job.companyName}</td>
                                            <td className="py-2 px-4">{job.location}</td>
                                            <td className="py-2 px-4">{job.salaryRange}</td>
                                            <td className="py-2 px-4 capitalize">{job.employmentType}</td>
                                            <td className="py-2 px-4">{formatDate(job.applicationDeadline)}</td>
                                            <td className="py-2 px-4">{formatDate(job.postedDate)}</td>
                                            <td className="py-2 px-4">
                                                <div className="relative">
                                                    <button
                                                        className="text-slate-500 bg-slate-300 p-1 rounded focus:outline-none"
                                                        onClick={(event) => toggleDropdown(index, event)}
                                                    >
                                                        <FaEllipsisH />
                                                    </button>
                                                    {isOpen === index && (
                                                        <div className="dropdown-menu absolute mb-4 right-0 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                                            <Link to={`${job._id}`}
                                                                className="block px-4 py-2 text-green-500 hover:bg-gray-200 w-full text-left"

                                                            >
                                                                <FaUser className="inline mr-2" />
                                                                See Job
                                                            </Link>
                                                            <button
                                                                className="block px-4 py-2 text-blue-500 hover:bg-gray-200 w-full text-left focus:outline-none"
                                                                onClick={() => openAddEditModal(job)}
                                                            >
                                                                <FaEdit className="inline mr-2" />
                                                                Edit
                                                            </button>
                                                            <button
                                                                className="block px-4 py-2 text-red-500 hover:bg-gray-200 w-full text-left focus:outline-none"
                                                                onClick={() => openDeleteModal(job)}
                                                            >
                                                                <FaTrash className="inline mr-2" />
                                                                Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            :
                            <div className="bg-white w-full h-40 flex items-center justify-center mt-2">
                                {error ? "An error occurred. Try again later" : "No Job Available"}
                            </div>
                        }
                    </>
                }
                <AddEditJobModal
                    isOpen={isAddEditModalOpen}
                    onClose={closeAddEditModal}
                    onSave={handleAddEditJob}
                    job={currentJob}
                    loader={isLoading}
                />

                <DeleteJobModal
                    isOpen={isDeleteModalOpen}
                    onClose={closeDeleteModal}
                    onDelete={handleDeleteJob}
                    loader={isLoading}
                />
            </main>
        </>
    );
};

export default JobsList;
