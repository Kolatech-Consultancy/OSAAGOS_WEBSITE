import React, { useState } from 'react';


function AddNewsForm() {
    const [newsDetails, setNewsDetails] = useState({
        title: '',
        content: '',
        author: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewsDetails({
            ...newsDetails,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(newsDetails);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Add News and Announcements</h2>
            <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                    type="text"
                    name="title"
                    value={newsDetails.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Content</label>
                <textarea
                    name="content"
                    value={newsDetails.content}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Author</label>
                <input
                    type="text"
                    name="author"
                    value={newsDetails.author}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>
            <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Add News
            </button>
        </form>
        </>
            );
}

export default AddNewsForm;
