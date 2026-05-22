import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import { Button } from "../../../components/ui/Button";

type Event = {
  id: number;
  name: string;
  category: {
    name: string;
  };
  speaker: {
    name: string;
  };
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
    const confirmDelete = confirm("Yakin ingin menghapus event?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/events/${id}`);
      fetchEvents();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Event List</h1>
        <Link to="/dashboard/events/create">
          <Button label="Tambah Event" variant="primary" />
        </Link>
      </div>

      {/* Table */}
      <table className="w-full border border-collapse table-fixed">
        <thead>
          <tr className="bg-[#e388a9] text-white">
            <th className="border px-4 py-2 text-center w-16">ID</th>
            <th className="border px-4 py-2 text-center">Name</th>
            <th className="border px-4 py-2 text-center">Category</th>
            <th className="border px-4 py-2 text-center">Speaker</th>
            <th className="border px-4 py-2 text-center">Location</th>
            <th className="border px-4 py-2 text-center w-32">Date</th>
            <th className="border px-4 py-2 text-center w-40">Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="border hover:bg-slate-50">
              <td className="border px-4 py-2">{event.id}</td>
              <td className="border px-4 py-2">{event.name}</td>
              <td className="border px-4 py-2">
                {event.category?.name || "N/A"}
              </td>
              <td className="border px-4 py-2">
                {event.speaker?.name || "N/A"}
              </td>
              <td className="border px-4 py-2">{event.location}</td>
              <td className="border px-4 py-2">
                {new Date(event.dateEvent).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2">
                <div className="flex gap-2 justify-center">
                  <Link to={`/dashboard/events/edit/${event.id}`}>
                    <Button label="Edit" variant="secondary" />
                  </Link>
                  <Button
                    label="Delete"
                    variant="danger"
                    onClick={() => handleDelete(event.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
