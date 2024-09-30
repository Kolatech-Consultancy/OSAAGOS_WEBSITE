import React, { useState, useEffect } from 'react';
import { FaEdit, FaEllipsisH, FaPlus, FaSearch, FaTrash, FaUser } from 'react-icons/fa';
import AddMemberModal from './AddMemberModal';
import DeleteMemberModal from './DeleteMemberModal';
// import { getPost, deleteMember, editPost, addPost } from '../../../services/api';
import "../../../../index.scss";
import SpinnerMini from '../../../SpinnerMini';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { useToggleDropdown } from '../../useCloseDropdown';
import { addGroupMember, deleteGroupMember, getGroupMembers } from '../../../../services/api';

const PostsList = () => {
    const [Members, setMembers] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentMember, setCurrentMember] = useState(null);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    let isMounted = true
    const {groupId} = useParams()
    const {isOpen, toggleDropdown} = useToggleDropdown()






    useEffect(() => {
        const fetchMembers = async () => {
            try {
                setLoader(true);
                const response = await getGroupMembers(groupId);
                console.log(response.data);
                
                setMembers(response.data.members);
                console.log(Members);
                
            } catch (error) {
                setError(true);
                console.error(error);
            } finally {
                setLoader(false);
            }
        };
        if (isMounted) fetchMembers();
        return () => {
            isMounted = false
        }
    }, []);
    const handleAddMember = async (userId) => {
        try {
            setIsLoading(true);
                const newMember = await addGroupMember(groupId, userId);
                setMembers([...Members, newMember.data.members])
                toast.success("Members added successfully");
                window.location.reload()
        } catch (error) {
            console.error(error);
            toast.error("Error saving Members.");
        } finally {
            setIsLoading(false);
            closeAddModal();
        }
    };

    const handleDeleteMember = async () => {
        try {
            setIsLoading(true);
            await deleteGroupMember(groupId, currentMember._id);
            setMembers(Members.filter(member => member._id !== currentMember._id));
            toast.success('Members deleted successfully');
        } catch (error) {
            console.error(error);
            toast.error("Error deleting Members");
        } finally {
            setIsLoading(false);
            closeDeleteModal();
        }
    };

    const openAddModal = (Members = null) => {
        setCurrentMember(Members);
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setCurrentMember(null);
        setIsAddModalOpen(false);
    };

    const openDeleteModal = (Members) => {
        setCurrentMember(Members);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setCurrentMember(null);
        setIsDeleteModalOpen(false);
    };
    return (
        <>
            <main className="bg-white flex flex-col gap-10 rounded-t-lg py-5 text-gray-700">
                <div className="flex justify-between gap-3 items-center">
                    <h1 className="font-medium text-xl px-5">All Members</h1>
                    <button onClick={() => openAddModal()} className="ms-auto me-2 bg-blue-400 hover:bg-blue-500 w-fit text-slate-50 p-4 flex items-center justify-center gap-3 rounded-full sm:rounded-lg focus:outline-none">
                        <FaPlus />
                        <span className='hidden sm:flex'>Add Members</span>
                    </button>
                </div>

                <section className="flex px-5 flex-wrap md:flex-nowrap py-4 gap-5 items-center border-s-0 border-e-0 border-dashed border-gray-200" style={{ borderWidth: "1px" }}>
                    <div className="border ring-gray-100 flex gap-2 items-center py-2 px-3 rounded-lg w-full md:w-56" style={{ borderWidth: "1px" }}>
                        <FaSearch className="text-gray-500" />
                        <input type="search" placeholder="Search for Members" className="w-full border-0 focus-visible:outline-none" />
                    </div>

                </section>
            </main>
            <main className='tableContainer overflow-x-scroll mt-1 pb-3'>
                {loader ?
                    <div className="bg-white w-full h-40 flex items-center justify-center mt-2">
                        {Members.length === 0 &&
                            <SpinnerMini />
                        }
                    </div>
                    : <>
                        {Members.length > 0 ?
                            <table className="min-w-full profileTable">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4">Name</th>
                                        <th className="py-2 px-4">Email</th>
                                        <th className="py-2 px-4">MemberId</th>
                                        <th className="py-2 px-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white text-gray-700">
                                    {Members.map((member, index) => (
                                        <tr key={member._id}>
                                            <td className="py-2 px-4">{member?.name}</td>
                                            <td className="py-2 px-4">{member?.email}</td>
                                            <td className="py-2 px-4">{member?._id}</td>
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
                                                            {/* <Link to={`/dashboard/group/posts/${member._id}`}
                                                                className="block px-4 py-2 text-green-500 hover:bg-gray-200 w-full text-left"

                                                            >
                                                                <FaUser className="inline mr-2" />
                                                                See Members
                                                            </Link>
                                                            <button
                                                                className="block px-4 py-2 text-blue-500 hover:bg-gray-200 w-full text-left focus:outline-none"
                                                                onClick={() => openAddModal(member)}
                                                            >
                                                                <FaEdit className="inline mr-2" />
                                                                Edit
                                                            </button> */}
                                                            <button
                                                                className="block px-4 py-2 text-red-500 hover:bg-gray-200 w-full text-left focus:outline-none"
                                                                onClick={() => openDeleteModal(member)}
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
                                {error ? "An error occurred. Try again later" : "No Members Available"}
                            </div>
                        }
                    </>
                }
                <AddMemberModal
                    isOpen={isAddModalOpen}
                    onClose={closeAddModal}
                    onSave={handleAddMember}
                    loader={isLoading}
                />

                <DeleteMemberModal
                    isOpen={isDeleteModalOpen}
                    onClose={closeDeleteModal}
                    onDelete={handleDeleteMember}
                    loader={isLoading}
                />
            </main>
        </>
    );
};

export default PostsList;
