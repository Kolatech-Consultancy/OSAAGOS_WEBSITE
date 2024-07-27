import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

function AddEventForm() {
    const navigate = useNavigate()
    const [eventDetails, setEventDetails] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        organizer: '',
        attendees: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventDetails({
            ...eventDetails,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/events")
        console.log(eventDetails);
    };

    return (
        <>
        {/* <Header/> */}
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Add Event</h2>
            <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                    type="text"
                    name="title"
                    value={eventDetails.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                    name="description"
                    value={eventDetails.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Date</label>
                <input
                    type="date"
                    name="date"
                    value={eventDetails.date}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Location</label>
                <input
                    type="text"
                    name="location"
                    value={eventDetails.location}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Organizer</label>
                <input
                    type="text"
                    name="organizer"
                    value={eventDetails.organizer}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Attendees (comma-separated emails)</label>
                <input
                    type="text"
                    name="attendees"
                    value={eventDetails.attendees}
                    onChange={(e) =>
                        setEventDetails({
                            ...eventDetails,
                            attendees: e.target.value.split(','),
                        })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>
            <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Add Event
            </button>
        </form>
        {/* <Footer/> */}
        </>
        
    );
}

export default AddEventForm;
