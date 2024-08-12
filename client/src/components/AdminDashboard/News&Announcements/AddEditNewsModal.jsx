import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import SpinnerMini from '../../SpinnerMini'; // Ensure the path is correct

const AddEditNewsModal = ({ isOpen, onClose, onSave, newsItem, loader }) => {
    const [formData, setFormData] = useState({ title: '', content: '' });

    useEffect(() => {
        if (newsItem) {
            setFormData({
                title: newsItem.title,
                content: newsItem.content || ''
            });
        } else {
            setFormData({ title: '', content: '' });
        }
    }, [newsItem]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">{newsItem ? 'Edit News' : 'Add News'}</h2>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                                <FaTimes />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-gray-700">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="content" className="block text-gray-700">Content</label>
                                <textarea
                                    id="content"
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-2"
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={`bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center gap-2 ${loader ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={loader}
                                >
                                    {loader && <SpinnerMini />} 
                                    {newsItem ? 'Save Changes' : 'Add News'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddEditNewsModal;
