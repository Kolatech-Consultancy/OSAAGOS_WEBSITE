import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaEdit, FaEllipsisH, FaPlus, FaSearch, FaTrash, FaUser } from 'react-icons/fa';
import AddEditAlumniModal from './AddEditAlumnusModal';
import DeleteAlumniModal from './DeleteAlumniModal';
import { GetAlumni, deleteAlumniProfile, updateAlumniProfile, CreateAlumni } from '../../../services/api';
import "../../../index.scss";
import SpinnerMini from '../../SpinnerMini';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const AlumniList = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [alumni, setAlumni] = useState([]);
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentAlumni, setCurrentAlumni] = useState(null);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    let isMounted = true





    const toggleDropdown = (index, event) => {
        event.stopPropagation();
        setIsOpen((prev) => (prev === index ? null : index));
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.dropdown')) {
                setIsOpen(null);
            }
        };

        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);


    useEffect(() => {
        const fetchAlumni = async () => {
            try {
                setLoader(true);
                const response = await GetAlumni();
                setAlumni(response.data);
            } catch (error) {
                setError(true);
                console.error(error);
            } finally {
                setLoader(false);
            }
        };
        if (isMounted) fetchAlumni();
        return () => {
            isMounted = false
        }
    }, []);
    const handleAddEditAlumni = async (alumniData) => {
        try {
            setIsLoading(true);
            if (currentAlumni) {
                await updateAlumniProfile(currentAlumni._id, alumniData);
                setAlumni(alumni.map(al =>
                    al._id === currentAlumni._id ? alumniData : al
                ));
                toast.success("Alumni updated successfully");
            } else {
                const newAlumnus = await CreateAlumni(alumniData);
                setAlumni([...alumni, newAlumnus.data])
                toast.success("Alumni added successfully");
                // window.location.reload()
            }
        } catch (error) {
            console.error(error);
            toast.error("Error saving Alumni.");
        } finally {
            setIsLoading(false);
            closeAddEditModal();
        }
    };

    const handleDeleteAlumni = async () => {
        try {
            setIsLoading(true);
            await deleteAlumniProfile(currentAlumni._id);
            setAlumni(alumni.filter(al => al._id !== currentAlumni._id));
            toast.success('Alumni deleted successfully');
        } catch (error) {
            console.error(error);
            toast.error("Error deleting alumni");
        } finally {
            setIsLoading(false);
            closeDeleteModal();
        }
    };

    const openAddEditModal = (alumni = null) => {
        setCurrentAlumni(alumni);
        setIsAddEditModalOpen(true);
    };

    const closeAddEditModal = () => {
        setCurrentAlumni(null);
        setIsAddEditModalOpen(false);
    };

    const openDeleteModal = (alumni) => {
        setCurrentAlumni(alumni);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setCurrentAlumni(null);
        setIsDeleteModalOpen(false);
    };
    return (
        <>
            <main className="bg-white flex flex-col gap-10 rounded-t-lg py-5 text-gray-700">
                <div className="flex justify-between gap-3 items-center">
                    <h1 className="font-medium text-xl px-5">All Alumni</h1>
                    <button onClick={() => openAddEditModal()} className="ms-auto me-2 bg-blue-400 hover:bg-blue-500 w-fit text-slate-50 p-4 flex items-center justify-center gap-3 rounded-full sm:rounded-lg focus:outline-none">
                        <FaPlus />
                        <span className='hidden sm:flex'>Add Alumni</span>
                    </button>
                </div>

                <section className="flex px-5 flex-wrap md:flex-nowrap py-4 gap-5 items-center border-s-0 border-e-0 border-dashed border-gray-200" style={{ borderWidth: "1px" }}>
                    <div className="border ring-gray-100 flex gap-2 items-center py-2 px-3 rounded-lg w-full md:w-56" style={{ borderWidth: "1px" }}>
                        <FaSearch className="text-gray-500" />
                        <input type="search" placeholder="Search for Alumni" className="w-full border-0 focus-visible:outline-none" />
                    </div>

                </section>
            </main>
            <main className='tableContainer overflow-x-scroll mt-1 pb-3'>
                {loader ?
                    <div className="bg-white w-full h-40 flex items-center justify-center mt-2">
                        {alumni.length === 0 &&
                            <SpinnerMini />
                        }
                    </div>
                    : <>
                        {alumni.length > 0 ?
                            <table className="min-w-full profileTable">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4">Name</th>
                                        <th className="py-2 px-4">Email</th>
                                        <th className="py-2 px-4">Phone Number</th>
                                        <th className="py-2 px-4">Education</th>
                                        <th className="py-2 px-4">Field Of Study</th>
                                        <th className="py-2 px-4">Graduation Year</th>
                                        <th className="py-2 px-4">Profession</th>
                                        <th className="py-2 px-4">Company</th>
                                        <th className="py-2 px-4">Address</th>
                                        <th className="py-2 px-4">Status</th>
                                        <th className="py-2 px-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white text-gray-700">
                                    {alumni.map((al, index) => (
                                        <tr key={al._id}>
                                            <td className="py-2 px-4 max-w-48 truncate text-ellipsis">{al.name || "Nil"}</td>
                                            <td className="py-2 px-4 max-w-48 truncate text-ellipsis">{al.email || "Nil"}</td>
                                            <td className="py-2 px-4 max-w-48 truncate text-ellipsis">{al.phone || "Nil"}</td>
                                            <td className="py-2 px-4 max-w-48 truncate text-ellipsis capitalize">{al.education || "Nil"}</td>
                                            <td className="py-2 px-4 max-w-48 truncate text-ellipsis capitalize">{al.profession || "Nil"}</td>
                                            <td className="py-2 px-4 max-w-48 truncate text-ellipsis">{al.graduationYear || "Nil"}</td>
                                            <td className="py-2 px-4 max-w-48 truncate text-ellipsis capitalize">{al.fieldOfStudy || "Nil"}</td>
                                            <td className="py-2 px-4 max-w-48 truncate text-ellipsis capitalize">{al.company || "Nil"}</td>
                                            <td className="py-2 px-4 max-w-48 truncate text-ellipsis capitalize">{al.address || "Nil"}</td>
                                            <td className={`py-2 px-4 `}>
                                                <span className={`px-4 font-medium py-1 text-sm rounded-lg w-fit flex items-center justify-center ${al.isVerified ? "text-green-400 bg-green-100" : "text-red-400 bg-red-100"}`}>
                                                    {al.isVerified ?
                                                        "Verified"
                                                        :
                                                        "Not verified"
                                                    }
                                                </span>
                                            </td>
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
                                                            <Link
                                                                className="block px-4 py-2 text-green-500 hover:bg-gray-200 w-full text-left"

                                                            >
                                                                <FaUser className="inline mr-2" />
                                                                Overview
                                                            </Link>
                                                            <button
                                                                className="block px-4 py-2 text-blue-500 hover:bg-gray-200 w-full text-left focus:outline-none"
                                                                onClick={() => openAddEditModal(al)}
                                                            >
                                                                <FaEdit className="inline mr-2" />
                                                                Edit
                                                            </button>
                                                            <button
                                                                className="block px-4 py-2 text-red-500 hover:bg-gray-200 w-full text-left focus:outline-none"
                                                                onClick={() => openDeleteModal(al)}
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
                                {error ? "An error occurred. Try again later" : "No Alumni Registered"}
                            </div>
                        }
                    </>
                }
                <AddEditAlumniModal
                    isOpen={isAddEditModalOpen}
                    onClose={closeAddEditModal}
                    onSave={handleAddEditAlumni}
                    alumni={currentAlumni}
                    loader={isLoading}
                />

                <DeleteAlumniModal
                    isOpen={isDeleteModalOpen}
                    onClose={closeDeleteModal}
                    onDelete={handleDeleteAlumni}
                    loader={isLoading}
                />
            </main>
        </>
    );
};

export default AlumniList;
