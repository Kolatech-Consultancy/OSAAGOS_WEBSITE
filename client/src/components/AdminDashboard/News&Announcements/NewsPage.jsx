import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaEllipsisH, FaUser, FaTrash } from 'react-icons/fa';
import AddEditNewsModal from './AddEditNewsModal';
import SpinnerMini from '../../SpinnerMini';
import { addNews, deleteNews, editNews, getNews } from '../../../services/api';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import DeleteNewsModal from './DeleteNewsModal';

const NewsPage = () => {
    const [news, setNews] = useState([]);
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentNews, setCurrentNews] = useState(null);
    const [loader, setLoader] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isOpen, setIsOpen] = useState(null);
    let isMounted = true






    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoader(true);
                const response = await getNews();
                setNews(response.data);
            } catch (error) {
                setError(true);
                console.error(error);
            } finally {
                setLoader(false);
            }
        };

        if (isMounted) fetchNews();
        return () => {
            isMounted = false
        }
    }, []);

    const handleAddEditNews = async (newsItem) => {
        try {
            setIsLoading(true);
            if (currentNews) {
                await editNews(currentNews._id, newsItem);
                setNews(news.map((n) => (n._id === currentNews._id ? newsItem : n)));
                toast.success("News updated successfully.");
            } else {
                const newNews = await addNews(newsItem);
                setNews([...news, newNews.data]);
                toast.success("News added successfully.");
                window.location.reload()
            }
        } catch (error) {
            console.error(error);
            toast.error("Error saving news.");
        } finally {
            setIsLoading(false);
            closeAddEditModal();
        }
    };


    const handleDeleteNews = async () => {
        try {
            setIsLoading(true);
            await deleteNews(currentNews._id);
            setNews(news.filter(news => news._id !== currentNews._id));
            toast.success('News deleted successfully');
        } catch (error) {
            console.error(error);
            toast.error("Error deleting news");
        } finally {
            setIsLoading(false);
            closeDeleteModal();
        }
    };

    const openAddEditModal = (newsItem = null) => {
        setCurrentNews(newsItem);
        setIsAddEditModalOpen(true);
    };

    const closeAddEditModal = () => {
        setCurrentNews(null);
        setIsAddEditModalOpen(false);
    };


    const openDeleteModal = (news) => {
        setCurrentNews(news);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setCurrentNews(null);
        setIsDeleteModalOpen(false)
    }

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





    return (
        <>
            <main className="bg-white flex flex-col gap-10 rounded-t-lg py-5 text-gray-700">
                <div className="flex justify-between gap-3 items-center">
                    <h1 className="font-medium text-xl px-5">News</h1>
                    <button
                        onClick={() => openAddEditModal()}
                        className="ms-auto me-2 bg-blue-400 hover:bg-blue-500 w-fit text-slate-50 p-4 flex items-center justify-center gap-3 rounded-full sm:rounded-lg focus:outline-none"
                    >
                        <FaPlus />
                        <span className='hidden sm:flex'>Add News</span>
                    </button>
                </div>
            </main>

            <main className='tableContainer overflow-x-scroll mt-1 pb-3'>
                {loader ? (
                    <div className="bg-white w-full h-40 flex items-center justify-center mt-2">
                        <SpinnerMini />
                    </div>
                ) : news.length > 0 ? (
                    <table className="min-w-full profileTable">
                        <thead>
                            <tr>
                                <th className="py-2 px-4">Title</th>
                                {/* <th className="py-2 px-4">Author</th> */}
                                <th className="py-2 px-4">Created At</th>
                                <th className="py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white text-gray-700">
                            {news.map((item, index) => (
                                <tr key={item._id} className="border-b border-gray-200">
                                    <td className="py-2 px-4">{item.title}</td>
                                    {/* <td className="py-2 px-4">{item.author.name}</td> */}
                                    <td className="py-2 px-4">{new Date(item.createdAt).toLocaleDateString()}</td>
                                    <td className="py-2 px-4">
                                        <div className="relative">
                                            <button
                                                className="text-slate-500 bg-slate-300 p-1 rounded focus:outline-none"
                                                onClick={(event) => toggleDropdown(index, event)}
                                            >
                                                <FaEllipsisH />
                                            </button>
                                            {isOpen === index && (
                                                <div className="dropdown-menu mb-4 absolute right-0 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                                    <Link
                                                        to={`/dashboard/news/${item._id}`}
                                                        className="block px-4 py-2 text-green-500 hover:bg-gray-200 w-full text-left"
                                                    >
                                                        <FaUser className="inline mr-2" />
                                                        Overview
                                                    </Link>
                                                    <button
                                                        className="block px-4 py-2 text-blue-500 hover:bg-gray-200 w-full text-left focus:outline-none"
                                                        onClick={() => openAddEditModal(item)}
                                                    >
                                                        <FaEdit className="inline mr-2" />
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="block px-4 py-2 text-red-500 hover:bg-gray-200 w-full text-left focus:outline-none"
                                                        onClick={() => openDeleteModal(item)}
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
                ) : (
                    <div className="bg-white w-full h-40 flex items-center justify-center mt-2">
                        {error ? "An error occurred. Try again later." : "No news available."}
                    </div>
                )}
            </main>
            <AddEditNewsModal
                isOpen={isAddEditModalOpen}
                onClose={closeAddEditModal}
                onSave={handleAddEditNews}
                newsItem={currentNews}
                loader={isLoading}
            />
            <DeleteNewsModal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onDelete={handleDeleteNews}
                loader={isLoading}
            />
        </>
    );
};

export default NewsPage;
