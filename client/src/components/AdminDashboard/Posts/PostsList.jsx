import React, { useState, useEffect } from 'react';
import { FaEdit, FaEllipsisH, FaPlus, FaSearch, FaTrash, FaUser } from 'react-icons/fa';
import AddEditPostModal from './AddEditPostModal';
import DeletePostModal from './DeletePostModal';
import { getPost, deletePost, editPost, addPost } from '../../../services/api';
import "../../../index.scss";
import SpinnerMini from '../../SpinnerMini';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';

const PostsList = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [Post, setPost] = useState([]);
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const arrOfMonth = ["Jan", 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let isMounted = true
    const {forumId} = useParams()





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
        const fetchPost = async () => {
            try {
                setLoader(true);
                const response = await getPost(forumId);
                setPost(response.data);
            } catch (error) {
                setError(true);
                console.error(error);
            } finally {
                setLoader(false);
            }
        };
        if (isMounted) fetchPost();
        return () => {
            isMounted = false
        }
    }, []);
    const handleAddEditPost = async (PostData) => {
        try {
            setIsLoading(true);
            if (currentPost) {
                await editPost(currentPost._id, PostData);
                setPost(Post.map(pst =>
                    pst._id === currentPost._id ? PostData : pst
                ));
                toast.success("Post updated successfully");
            } else {
                const newPost = await addPost(forumId,PostData);
                setPost([...Post, newPost.data])
                toast.success("Post added successfully");
                window.location.reload()
            }
        } catch (error) {
            console.error(error);
            toast.error("Error saving Post.");
        } finally {
            setIsLoading(false);
            closeAddEditModal();
        }
    };

    const handleDeletePost = async () => {
        try {
            setIsLoading(true);
            await deletePost(currentPost._id);
            setPost(Post.filter(al => al._id !== currentPost._id));
            toast.success('Post deleted successfully');
        } catch (error) {
            console.error(error);
            toast.error("Error deleting Post");
        } finally {
            setIsLoading(false);
            closeDeleteModal();
        }
    };

    const openAddEditModal = (Post = null) => {
        setCurrentPost(Post);
        setIsAddEditModalOpen(true);
    };

    const closeAddEditModal = () => {
        setCurrentPost(null);
        setIsAddEditModalOpen(false);
    };

    const openDeleteModal = (Post) => {
        setCurrentPost(Post);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setCurrentPost(null);
        setIsDeleteModalOpen(false);
    };
    return (
        <>
            <main className="bg-white flex flex-col gap-10 rounded-t-lg py-5 text-gray-700">
                <div className="flex justify-between gap-3 items-center">
                    <h1 className="font-medium text-xl px-5">All Posts</h1>
                    <button onClick={() => openAddEditModal()} className="ms-auto me-2 bg-blue-400 hover:bg-blue-500 w-fit text-slate-50 p-4 flex items-center justify-center gap-3 rounded-full sm:rounded-lg focus:outline-none">
                        <FaPlus />
                        <span className='hidden sm:flex'>Add Post</span>
                    </button>
                </div>

                <section className="flex px-5 flex-wrap md:flex-nowrap py-4 gap-5 items-center border-s-0 border-e-0 border-dashed border-gray-200" style={{ borderWidth: "1px" }}>
                    <div className="border ring-gray-100 flex gap-2 items-center py-2 px-3 rounded-lg w-full md:w-56" style={{ borderWidth: "1px" }}>
                        <FaSearch className="text-gray-500" />
                        <input type="search" placeholder="Search for Post" className="w-full border-0 focus-visible:outline-none" />
                    </div>

                </section>
            </main>
            <main className='tableContainer overflow-x-scroll mt-1 pb-3'>
                {loader ?
                    <div className="bg-white w-full h-40 flex items-center justify-center mt-2">
                        {Post.length === 0 &&
                            <SpinnerMini />
                        }
                    </div>
                    : <>
                        {Post.length > 0 ?
                            <table className="min-w-full profileTable">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4">Author</th>
                                        <th className="py-2 px-4">Creation Date</th>
                                        <th className="py-2 px-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white text-gray-700">
                                    {Post.map((pst, index) => (
                                        <tr key={pst._id}>
                                            <td className="py-2 px-4">{pst.author.name}</td>
                                            <td className="py-2 px-4">{`${new Date(pst.timestamp).getDate()} ${arrOfMonth[new Date(pst.timestamp).getMonth()]}, ${new Date(pst.timestamp).getFullYear()}`}</td>
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
                                                                See Post
                                                            </Link>
                                                            {/* <button
                                                                className="block px-4 py-2 text-blue-500 hover:bg-gray-200 w-full text-left focus:outline-none"
                                                                onClick={() => openAddEditModal(pst)}
                                                            >
                                                                <FaEdit className="inline mr-2" />
                                                                Edit
                                                            </button> */}
                                                            {/* <button
                                                                className="block px-4 py-2 text-red-500 hover:bg-gray-200 w-full text-left focus:outline-none"
                                                                onClick={() => openDeleteModal(pst)}
                                                            >
                                                                <FaTrash className="inline mr-2" />
                                                                Delete
                                                            </button> */}
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
                                {error ? "An error occurred. Try again later" : "No Post Available"}
                            </div>
                        }
                    </>
                }
                <AddEditPostModal
                    isOpen={isAddEditModalOpen}
                    onClose={closeAddEditModal}
                    onSave={handleAddEditPost}
                    post={currentPost}
                    loader={isLoading}
                />

                <DeletePostModal
                    isOpen={isDeleteModalOpen}
                    onClose={closeDeleteModal}
                    onDelete={handleDeletePost}
                    loader={isLoading}
                />
            </main>
        </>
    );
};

export default PostsList;
