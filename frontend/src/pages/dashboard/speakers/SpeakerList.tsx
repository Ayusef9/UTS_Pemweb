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
    try {
      await api.delete(`/speakers/${id}`);

      fetchSpeakers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <div
        className="
            flex
            justify-between
            mb-6
            "
      >
        <h1
          className="
                text-2xl
                font-bold
                "
        >
          Speaker List
        </h1>

        <Link to="/dashboard/speakers/create">
          <Button label="Tambah Speaker" variant="primary" />
        </Link>
      </div>

      <table
        className="
            w-full
            border
            "
      >
        <thead>
          <tr className="bg-slate-200">
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {speakers.map((speaker) => (
            <tr
              key={speaker.id}
              className="
                        border
                        text-center
                        "
            >
              <td>{speaker.id}</td>

              <td>{speaker.name}</td>

              <td>{speaker.role}</td>

              <td>
                <img
                  src={speaker.image}
                  alt=""
                  className="
                                w-16
                                h-16
                                object-cover
                                mx-auto
                                "
                />
              </td>

              <td
                className="
                            flex
                            gap-2
                            justify-center
                            p-2
                            "
              >
                <Link to={`/dashboard/speakers/edit/${speaker.id}`}>
                  <Button label="Edit" variant="secondary" />
                </Link>

                <Button
                  label="Delete"
                  variant="danger"
                  onClick={() => handleDelete(speaker.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
