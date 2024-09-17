import React, { useState, useEffect } from 'react';
import { FaEdit, FaEllipsisH, FaPlus, FaSearch, FaTrash, FaUser } from 'react-icons/fa';
import AddEditForumModal from './AddEditForumModal';
import DeleteForumModal from './DeleteForumModal';
import { getForum, deleteForum, editForum, addForum, approveForum, denyForum } from '../../../services/api';
import "../../../index.scss";
import SpinnerMini from '../../SpinnerMini';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../services/formatDate';
import { useToggleDropdown } from '../useCloseDropdown';

const ForumsList = () => {
    const [Forum, setForum] = useState([]);
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentForum, setCurrentForum] = useState(null);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    let isMounted = true
    const {isOpen, toggleDropdown} = useToggleDropdown()



    useEffect(() => {
        const fetchForum = async () => {
            try {
                setLoader(true);
                const response = await getForum();
                setForum(response.data);
                console.log(response.data);

            } catch (error) {
                setError(true);
                console.error(error);
            } finally {
                setLoader(false);
            }
        };
        if (isMounted) fetchForum();
        return () => {
            isMounted = false
        }
    }, []);
    const handleAddEditForum = async (ForumData) => {
        try {
            setIsLoading(true);
            if (currentForum) {
                await editForum(currentForum._id, ForumData);
                setForum(Forum.map(frm =>
                    frm._id === currentForum._id ? ForumData : frm
                ));
                toast.success("Forum updated successfully");
            } else {
                const newForum = await addForum(ForumData);
                setForum([...Forum, newForum.data])
                toast.success("Forum added successfully");
                window.location.reload()
            }
        } catch (error) {
            console.error(error);
            toast.error("Error saving Forum.");
        } finally {
            setIsLoading(false);
            closeAddEditModal();
        }
    };

    const switchFuntion = async (status, id) => {
        try {
            if (status == "approve") {
                const approval = await approveForum(id)

            } else {
                const deny= await denyForum(id)
            }
        } catch (error) {
            console.error(error);
            toast.error("Error changing status.");
        }
    }

    const handleDeleteForum = async () => {
        try {
            setIsLoading(true);
            await deleteForum(currentForum._id);
            setForum(Forum.filter(al => al._id !== currentForum._id));
            toast.success('Forum deleted successfully');
        } catch (error) {
            console.error(error);
            toast.error("Error deleting Forum");
        } finally {
            setIsLoading(false);
            closeDeleteModal();
        }
    };

    const openAddEditModal = (Forum = null) => {
        setCurrentForum(Forum);
        setIsAddEditModalOpen(true);
    };

    const closeAddEditModal = () => {
        setCurrentForum(null);
        setIsAddEditModalOpen(false);
    };

    const openDeleteModal = (Forum) => {
        setCurrentForum(Forum);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setCurrentForum(null);
        setIsDeleteModalOpen(false);
    };
    return (
        <>
            <main className="bg-white flex flex-col gap-10 rounded-t-lg py-5 text-gray-700">
                <div className="flex justify-between gap-3 items-center">
                    <h1 className="font-medium text-xl px-5">All Forum</h1>
                    <button onClick={() => openAddEditModal()} className="ms-auto me-2 bg-blue-400 hover:bg-blue-500 w-fit text-slate-50 p-4 flex items-center justify-center gap-3 rounded-full sm:rounded-lg focus:outline-none">
                        <FaPlus />
                        <span className='hidden sm:flex'>Add Forum</span>
                    </button>
                </div>

                <section className="flex px-5 flex-wrap md:flex-nowrap py-4 gap-5 items-center border-s-0 border-e-0 border-dashed border-gray-200" style={{ borderWidth: "1px" }}>
                    <div className="border ring-gray-100 flex gap-2 items-center py-2 px-3 rounded-lg w-full md:w-56" style={{ borderWidth: "1px" }}>
                        <FaSearch className="text-gray-500" />
                        <input type="search" placeholder="Search for Forum" className="w-full border-0 focus-visible:outline-none" />
                    </div>

                </section>
            </main>
            <main className='tableContainer overflow-x-scroll mt-1 pb-3'>
                {loader ?
                    <div className="bg-white w-full h-40 flex items-center justify-center mt-2">
                        {Forum.length === 0 &&
                            <SpinnerMini />
                        }
                    </div>
                    : <>
                        {Forum.length > 0 ?
                            <table className="min-w-full profileTable">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4">Title</th>
                                        <th className="py-2 px-4">Author</th>
                                        <th className="py-2 px-4">Creation Date</th>
                                        <th className="py-2 px-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white text-gray-700">
                                    {Forum.map((frm, index) => (
                                        <tr key={frm._id}>
                                            <td className="py-2 px-4">{frm.title}</td>
                                            <td className="py-2 px-4">{frm.createdBy.name}</td>
                                            <td className="py-2 px-4">{formatDate(frm.createdAt)}</td>
                                            <td className={`py-2 px-4 `}>
                                                <span className={`px-4 font-medium py-1 text-sm rounded-lg w-32 flex items-center justify-center ${frm.status == "pending" ? "text-yellow-400 bg-yellow-100" : frm.status == "approved" ? "text-green-400 bg-green-100" : "text-red-400 bg-red-100"}`}>
                                                    {frm.status}
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
                                                            <button className="block px-4 py-2  w-full text-left focus:outline-none"
                                                            >
                                                                {frm.status == "pending" ?
                                                                    <div>
                                                                        <span onClick={() => switchFuntion("approve", frm._id)} className='text-green-500 hover:underline'>Approve</span>
                                                                         <span> / </span>
                                                                         <span onClick={() => switchFuntion("deny", frm._id)} className='text-red-500 hover:underline'> Deny</span>
                                                                    </div> : 
                                                                    <Link  to={frm._id} className='text-green-500 hover:bg-gray-200'>
                                                                        <FaUser className="inline mr-2" />
                                                                        Posts
                                                                    </Link>
                                                            }

                                                            </button>
                                                            <button
                                                                className="block px-4 py-2 text-blue-500 hover:bg-gray-200 w-full text-left focus:outline-none"
                                                                onClick={() => openAddEditModal(frm)}
                                                            >
                                                                <FaEdit className="inline mr-2" />
                                                                Edit
                                                            </button>
                                                            <button
                                                                className="block px-4 py-2 text-red-500 hover:bg-gray-200 w-full text-left focus:outline-none"
                                                                onClick={() => openDeleteModal(frm)}
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
                                {error ? "An error occurred. Try again later" : "No Forum Registered"}
                            </div>
                        }
                    </>
                }
                <AddEditForumModal
                    isOpen={isAddEditModalOpen}
                    onClose={closeAddEditModal}
                    onSave={handleAddEditForum}
                    forum={currentForum}
                    loader={isLoading}
                />

                <DeleteForumModal
                    isOpen={isDeleteModalOpen}
                    onClose={closeDeleteModal}
                    onDelete={handleDeleteForum}
                    loader={isLoading}
                />
            </main>
        </>
    );
};

export default ForumsList;
