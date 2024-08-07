import React, { useEffect, useState } from "react";
import { getAllEvents } from "../../services/api";
import Spinner from "../Spinner";
import { formatDate } from "../../services/formatDate";

function DisplayEvents() {

  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    try {
      const response = await getAllEvents();
      const data = response.data;
      setEventData(data);
    } catch (e) {
      throw new Error(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Spinner />;

  return (
    <section>
      <div className="w-full h-[50vh] bg-green-500 mb-8 flex justify-center items-center text-center bg-img text-white">
        <div>
          <h2 className="text-5xl my-4 font-semibold capitalize">Events</h2>
          <p className="text-sm font-semibold px-8">
            Welcome to the OSAAGOS Alumni Association.
          </p>
        </div>
      </div>
      <div className="sm:p-10 py-10 px-4 max-w-screen-xl w-[100%] mx-auto">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Upcoming Events
        </h1>
        <div className=" grid lg:grid-cols-3 md:grid-cols-2 gap-6">
          {eventData.map((event, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden p-6 flex flex-col justify-between gap-2"
            >
              <h2 className="text-2xl font-semibold mb-2">{event.title}</h2>
              <p className="text-gray-700 mb-2">{event.description}</p>
              <div>
                <p className="text-gray-500">Date: {formatDate(event.date)}</p>
                <p className="text-gray-500">Location: {event.location}</p>
                <p className="text-gray-500">Organizer: {event.organizer}</p>
                <p className="text-gray-500">
                  Attendees: {event.attendees.join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DisplayEvents;
