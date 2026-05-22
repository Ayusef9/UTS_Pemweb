import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import { Button } from "../../../components/ui/Button";

type Speaker = {
  id: number;
  name: string;
  role: string;
  image: string;
};

export default function SpeakerList() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);

  const fetchSpeakers = async () => {
    try {
      const response = await api.get("/speakers");
      setSpeakers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSpeakers();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Yakin ingin menghapus speaker?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/speakers/${id}`);
      fetchSpeakers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Speaker List</h1>
        <Link to="/dashboard/speakers/create">
          <Button label="Tambah Speaker" variant="primary" />
        </Link>
      </div>

      {/* Table */}
      <table className="w-full border border-collapse">
        <thead>
          <tr className="bg-[#e388a9] text-white">
            <th className="border px-4 py-2 text-center w-16">ID</th>
            <th className="border px-4 py-2 text-center">Name</th>
            <th className="border px-4 py-2 text-center">Role</th>
            <th className="border px-4 py-2 text-center w-24">Image</th>
            <th className="border px-4 py-2 text-center w-40">Action</th>
          </tr>
        </thead>
        <tbody>
          {speakers.map((speaker) => (
            <tr key={speaker.id} className="border hover:bg-slate-50">
              <td className="border px-4 py-2">{speaker.id}</td>
              <td className="border px-4 py-2">{speaker.name}</td>
              <td className="border px-4 py-2">{speaker.role}</td>
              <td className="border px-4 py-2">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-16 h-16 object-cover mx-auto rounded"
                />
              </td>
              <td className="border px-4 py-2">
                <div className="flex gap-2 justify-center">
                  <Link to={`/dashboard/speakers/edit/${speaker.id}`}>
                    <Button label="Edit" variant="secondary" />
                  </Link>
                  <Button
                    label="Delete"
                    variant="danger"
                    onClick={() => handleDelete(speaker.id)}
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
