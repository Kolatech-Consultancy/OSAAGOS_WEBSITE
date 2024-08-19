import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import SpinnerMini from '../../SpinnerMini'; // Ensure the path is correct

const AddEditJobModal = ({ isOpen, onClose, onSave, job, loader }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        companyName: "",
        location: "",
        salaryRange: "",
        employmentType: 'full-time',
        applicationDeadline: "",
    });

    useEffect(() => {
        if (job) {
            setFormData(job);
        } else {
            setFormData({
                title: "",
                description: "",
                companyName: "",
                location: "",
                salaryRange: "",
                employmentType: 'full-time',
                applicationDeadline: "",
            });
        }
    }, [job]);

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
                            <h2 className="text-xl font-semibold">{job ? 'Edit Job' : 'Add Job'}</h2>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                                <FaTimes />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} style={{height:"75vh", overflowY:"scroll"}}>
                            <div className="mb-4">
                                <label htmlFor="title" className="block text-gray-700 mb-2">Title</label>
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
                                <label htmlFor="description" className="block text-gray-700 mb-2">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full border rounded-lg p-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="companyName" className="block text-gray-700 mb-2">Company Name</label>
                                <input
                                    type="text"
                                    id="companyName"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="location" className="block text-gray-700 mb-2">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="salaryRange" className="block text-gray-700 mb-2">Salary Range</label>
                                <input
                                    type="text"
                                    id="salaryRange"
                                    name="salaryRange"
                                    value={formData.salaryRange}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="employmentType" className="block text-gray-700 mb-2">Employment Type</label>
                                <select
                                    id="employmentType"
                                    name="employmentType"
                                    value={formData.employmentType}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-2"
                                    required
                                >
                                    <option value="full-time">full-Time</option>
                                    <option value="part-time">part-Time</option>
                                    <option value="contract">contract</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="applicationDeadline" className="block text-gray-700 mb-2">Application Deadline</label>
                                <input
                                    type="date"
                                    id="applicationDeadline"
                                    name="applicationDeadline"
                                    value={formData.applicationDeadline}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-2"
                                    required
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
                                    {job ? 'Save Changes' : 'Add Job'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddEditJobModal;
