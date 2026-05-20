import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import { Button } from "../../../components/ui/Button";

type Event = {
  id: number;
  name: string;
  location: string;
  description: string;
  dateEvent: string;
};

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);

  const fetchEvents = async () => {
    try {
      const response = await api.get("/events");

      setEvents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/events/${id}`);

      fetchEvents();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Event List</h1>

        <Link to="/dashboard/events/create">
          <Button label="Tambah Event" variant="primary" />
        </Link>
      </div>

      <table className="w-full border ">
        <thead>
          <tr className="bg-slate-200">
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {events.map((event) => (
            <tr
              key={event.id}
              className="
                        border
                        text-center
                        "
            >
              <td>{event.id}</td>
              <td>{event.name}</td>
              <td>{event.location}</td>
              <td>{new Date(event.dateEvent).toLocaleDateString()}</td>
              <td className="flex gap-2 justify-center p-2 ">
                <Link to={`/dashboard/events/edit/${event.id}`}>
                  <Button label="Edit" variant="secondary" />
                </Link>

                <Button
                  label="Delete"
                  variant="danger"
                  onClick={() => handleDelete(event.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
