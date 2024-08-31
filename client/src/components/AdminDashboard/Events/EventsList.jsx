import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaEdit, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import AddEditEventModal from './AddEditEventModal';
import DeleteModal from './DeleteModal';
import { getEvents, addEvent, editEvent, deleteEvent } from '../../../services/api'; // Placeholder for actual API functions
import "../../../index.scss"
import SpinnerMini from '../../SpinnerMini';
import toast from 'react-hot-toast';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [eventDate, setEventDate] = useState([]);

  let isMounted = true;
  const date = new Date();
  const today = [date.getDate(), date.getMonth(), date.getFullYear()]; // Adjusted month
  const arrOfMonth = ["Jan", 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoader(true);
        const response = await getEvents();
        setEvents(response.data);
        setEventDate(() => response.data.map(evt => new Date(evt.date).toLocaleDateString().split("/")));
        console.log(response.data, eventDate);
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoader(false);
      }
    };
    if (isMounted) fetchEvents();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddEditEvent = async (event) => {
    try {
      setIsLoading(true);
      if (currentEvent) {
        await editEvent(currentEvent._id, event);
        setEvents(events.map(ev =>
          ev._id === currentEvent._id ? { ...ev, ...event } : ev
        ));
        toast.success("Event updated successfully");
      } else {
        const newEvent = await addEvent(event);
        setEvents([...events, newEvent.data]);
        toast.success("Event created successfully");
        // window.location.reload()
      }
    } catch (error) {
      console.error(error);
      toast.error("Error saving event.");
    } finally {
      setIsLoading(false);
      closeAddEditModal();
    }
  };

  const handleDeleteEvent = async () => {
    try {
      setIsLoading(true);
      await deleteEvent(currentEvent._id);
      setEvents(events.filter(evt => evt._id !== currentEvent._id));
      toast.success('Event deleted successfully');
    } catch (error) {
      console.log(error);
      toast.error("Error deleting event");
    } finally {
      setIsLoading(false);
      closeDeleteModal();
    }
  };

  const openAddEditModal = (event = null) => {
    setCurrentEvent(event);
    setIsAddEditModalOpen(true);
  };

  const closeAddEditModal = () => {
    setCurrentEvent(null);
    setIsAddEditModalOpen(false);
  };

  const openDeleteModal = (event) => {
    setCurrentEvent(event);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setCurrentEvent(null);
    setIsDeleteModalOpen(false);
  };

  const isOngoing = (eventDate, today) => {
    const day = new Date(eventDate).getDate()
    const month = new Date(eventDate).getMonth()
    const year = new Date(eventDate).getFullYear()
    // const [day, month, year] = eventDate.map(Number);
    const [currentDay, currentMonth, currentYear] = today;
    if (year > currentYear) return true;
    if (year === currentYear) {
      if (month > currentMonth) return true;
      if (month === currentMonth) {
        return day >= currentDay;
      }
    }
    return false;
  };

  return (
    <>
      <main className="bg-white flex flex-col gap-10 rounded-t-lg py-5 text-gray-700">
        <div className="flex justify-between gap-3 items-center">
          <h1 className="font-medium text-xl px-5">All Events</h1>
          <button onClick={() => openAddEditModal()} className="ms-auto me-2 bg-blue-400 hover:bg-blue-500 w-fit text-slate-50 p-4 flex items-center justify-center gap-3 rounded-full sm:rounded-lg focus:outline-none">
            <FaPlus />
            <span className='hidden sm:flex'>Add Event</span>
          </button>
        </div>

        <section className="flex px-5 flex-wrap md:flex-nowrap py-4 gap-5 items-center border-s-0 border-e-0 border-dashed border-gray-200" style={{ borderWidth: "1px" }}>
          <div className="border ring-gray-100 flex gap-2 items-center py-2 px-3 rounded-lg w-full md:w-56" style={{ borderWidth: "1px" }}>
            <FaSearch className="text-gray-500" />
            <input type="search" placeholder="Search for Event" className="w-full border-0 focus-visible:outline-none" />
          </div>
          <div className="relative w-full md:w-56 bg-white ring-gray-100 px-1 py-2 rounded-lg" style={{ borderWidth: "1px" }}>
            <select className="block appearance-none w-full px-2 border-0 py-0.5 leading-tight focus:outline-none">
              <option>Select status</option>
              <option>Ongoing</option>
              <option>Closed</option>
            </select>
            <FaChevronDown className="pointer-events-none absolute inset-y-0 right-2 top-1/2 transform -translate-y-1/2" />
          </div>
        </section>
      </main>

      <main className='tableContainer overflow-x-scroll mt-1 pb-3'>
        {loader ? (
          <div className="bg-white w-full h-40 flex items-center justify-center mt-2">
            {events.length === 0 && <SpinnerMini />}
          </div>
        ) : (
          <>
            {events.length > 0 ? (
              <table className="min-w-full profileTable overflow-x-scroll">
                <thead>
                  <tr>
                    <th className="py-2 px-4">Event Name</th>
                    <th className="py-2 px-4">Date</th>
                    <th className="py-2 px-4">RSVPs</th>
                    <th className="py-2 px-4">Location</th>
                    <th className="py-2 px-4">Status</th>
                    <th className="py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-gray-700">
                  {events.map((event, index) => (
                    <tr key={event._id}>
                      <td className="py-2 px-4">{event?.title}</td>
                      <td className="py-2 px-4">
                      {`${new Date(event.date).getDate()} ${arrOfMonth[new Date(event.date).getMonth()]}, ${new Date(event.date).getFullYear()}`}
                      </td>
                      <td className="py-2 px-4">{event?.attendees?.length}</td>
                      <td className="py-2 px-4">{event?.location}</td>
                      <td className="py-2 px-4">
                        {isOngoing(event.date, today) ? (
                          <span className='bg-green-100 px-4 font-medium text-green-400 py-1 rounded-lg w-fit flex items-center justify-center'>Ongoing</span>
                        ) : (
                          <span className='bg-red-100 px-4 font-medium text-red-400 py-1 rounded-lg w-fit flex items-center justify-center'>Closed</span>
                        )}
                      </td>
                      <td className="py-2 px-4">
                        <button
                          className="text-blue-500 mr-2 focus:outline-none"
                          onClick={() => openAddEditModal(event)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-red-500 focus:outline-none"
                          onClick={() => openDeleteModal(event)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="bg-white w-full h-40 flex items-center justify-center mt-2">
                {error ? "An error occurred. Try again later" : "No Events Registered"}
              </div>
            )}
          </>
        )}

        <AddEditEventModal
          isOpen={isAddEditModalOpen}
          onClose={closeAddEditModal}
          onSave={handleAddEditEvent}
          event={currentEvent}
          loader={isLoading}
        />

        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onDelete={handleDeleteEvent}
          loader={isLoading}
        />
      </main>
    </>
  );
};

export default EventList;