import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import SpinnerMini from '../../SpinnerMini'; // Ensure the path is correct

const AddEditPostModal = ({ isOpen, onClose, onSave, post, loader }) => {
    const [formData, setFormData] = useState({ content: '' });

    useEffect(() => {
        if (post) {
            setFormData({
                content: post.content || ''
            });
        } else {
            setFormData({ content: '' });
        }
    }, [post]);

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
                            <h2 className="text-xl font-semibold">{post ? 'Edit post' : 'Add post'}</h2>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                                <FaTimes />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="content" className="block text-gray-700 mb-3">Content</label>
                                <textarea
                                    id="content"
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    rows="12"
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
                                    {post ? 'Save Changes' : 'Add Post'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddEditPostModal;
