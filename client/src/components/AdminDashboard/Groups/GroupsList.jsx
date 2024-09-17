import React, { useState, useEffect } from 'react';
import { FaEdit, FaEllipsisH, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import AddEditGroupModal from './AddEditGroupModal';
import DeleteGroupModal from './DeleteGroupModal';
import { getGroup, deleteGroup, editGroup, addGroup } from '../../../services/api';
import "../../../index.scss";
import SpinnerMini from '../../SpinnerMini';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useToggleDropdown } from '../useCloseDropdown';
import { formatDate } from '../../../services/formatDate';

const GroupList = () => {

    const [Group, setGroup] = useState([]);
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentGroup, setCurrentGroup] = useState(null);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    let isMounted = true
    const { isOpen, toggleDropdown } = useToggleDropdown()


    useEffect(() => {
        const fetchGroup = async () => {
            try {
                setLoader(true);
                const response = await getGroup();
                setGroup(response.data);
            } catch (error) {
                setError(true);
                console.error(error);
            } finally {
                setLoader(false);
            }
        };
        if (isMounted) fetchGroup();
        return () => {
            isMounted = false
        }
    }, []);
    const handleAddEditGroup = async (GroupData) => {
        try {
            setIsLoading(true);
            if (currentGroup) {
                await editGroup(currentGroup._id, GroupData);
                setGroup(Group.map(grp =>
                    grp._id === currentGroup._id ? GroupData : grp
                ));
                toast.success("Group updated successfully");
            } else {
                const newGroup = await addGroup(GroupData);
                setGroup([...Group, newGroup.data])
                toast.success("Group added successfully");
                // window.location.reload()
            }
        } catch (error) {
            console.error(error);
            toast.error("Error saving group.");
        } finally {
            setIsLoading(false);
            closeAddEditModal();
        }
    };

    const handleDeleteGroup = async () => {
        try {
            setIsLoading(true);
            await deleteGroup(currentGroup._id);
            setGroup(Group.filter(al => al._id !== currentGroup._id));
            toast.success('Group deleted successfully');
        } catch (error) {
            console.error(error);
            toast.error("Error deleting Group");
        } finally {
            setIsLoading(false);
            closeDeleteModal();
        }
    };

    const openAddEditModal = (Group = null) => {
        setCurrentGroup(Group);
        setIsAddEditModalOpen(true);
    };

    const closeAddEditModal = () => {
        setCurrentGroup(null);
        setIsAddEditModalOpen(false);
    };

    const openDeleteModal = (Group) => {
        setCurrentGroup(Group);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setCurrentGroup(null);
        setIsDeleteModalOpen(false);
    };
    return (
        <>
            <main className="bg-white flex flex-col gap-10 rounded-t-lg py-5 text-gray-700">
                <div className="flex justify-between gap-3 items-center">
                    <h1 className="font-medium text-xl px-5">All Groups</h1>
                    <button onClick={() => openAddEditModal()} className="ms-auto me-2 bg-blue-400 hover:bg-blue-500 w-fit text-slate-50 p-4 flex items-center justify-center gap-3 rounded-full sm:rounded-lg focus:outline-none">
                        <FaPlus />
                        <span className='hidden sm:flex'>Add Group</span>
                    </button>
                </div>

                <section className="flex px-5 flex-wrap md:flex-nowrap py-4 gap-5 items-center border-s-0 border-e-0 border-dashed border-gray-200" style={{ borderWidth: "1px" }}>
                    <div className="border ring-gray-100 flex gap-2 items-center py-2 px-3 rounded-lg w-full md:w-56" style={{ borderWidth: "1px" }}>
                        <FaSearch className="text-gray-500" />
                        <input type="search" placeholder="Search for Group" className="w-full border-0 focus-visible:outline-none" />
                    </div>

                </section>
            </main>
            <main className='tableContainer overflow-x-scroll mt-1 pb-3'>
                {loader ?
                    <div className="bg-white w-full h-40 flex items-center justify-center mt-2">
                        {Group.length === 0 &&
                            <SpinnerMini />
                        }
                    </div>
                    : <>
                        {Group.length > 0 ?
                            <table className="min-w-full profileTable">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4">Name</th>
                                        <th className="py-2 px-4">Members</th>
                                        <th className="py-2 px-4">Creation Date</th>
                                        <th className="py-2 px-4">status</th>
                                        <th className="py-2 px-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white text-gray-700">
                                    {Group.map((grp, index) => (
                                        <tr key={grp._id}>
                                            <td className="py-2 px-4">{grp.name}</td>
                                            <td className="py-2 px-4">{grp.members.length}</td>
                                            <td className="py-2 px-4">{formatDate(grp.createdAt)}</td>
                                            <td className="py-2 px-4">
                                                <span className={`px-4 py-1 rounded-lg w-fit flex items-center justify-center font-medium ${grp.status == "pending" ? "bg-yellow-100 text-yellow-500" : " bg-green-100 text-green-500"} `}>{grp.status}</span>
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
                                                            <button
                                                                className="block px-4 py-2 text-blue-500 hover:bg-gray-200 w-full text-left focus:outline-none"
                                                                onClick={() => openAddEditModal(grp)}
                                                            >
                                                                <FaEdit className="inline mr-2" />
                                                                Edit
                                                            </button>
                                                            <button
                                                                className="block px-4 py-2 text-red-500 hover:bg-gray-200 w-full text-left focus:outline-none"
                                                                onClick={() => openDeleteModal(grp)}
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
                                {error ? "An error occurred. Try again later" : "No Group Registered"}
                            </div>
                        }
                    </>
                }
                <AddEditGroupModal
                    isOpen={isAddEditModalOpen}
                    onClose={closeAddEditModal}
                    onSave={handleAddEditGroup}
                    group={currentGroup}
                    loader={isLoading}
                />

                <DeleteGroupModal
                    isOpen={isDeleteModalOpen}
                    onClose={closeDeleteModal}
                    onDelete={handleDeleteGroup}
                    loader={isLoading}
                />
            </main>
        </>
    );
};

export default GroupList;
