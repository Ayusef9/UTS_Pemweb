import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import { Button } from "../../../components/ui/Button";

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    categoryId: "",
    speakerId: "",
    location: "",
    dateEvent: "",
    description: "",
  });

  useEffect(() => {
    fetchEvent();
    fetchCategories();
    fetchSpeakers();
  }, []);

  const fetchEvent = async () => {
    try {
      const response = await api.get(`/events/${id}`);
      const data = response.data;

      setForm({
        name: data.name,
        categoryId: String(data.categoryId),
        speakerId: String(data.speakerId),
        location: data.location,
        dateEvent: data.dateEvent?.split("T")[0],
        description: data.description,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    const response = await api.get("/categories");
    setCategories(response.data);
  };

  const fetchSpeakers = async () => {
    const response = await api.get("/speakers");

    setSpeakers(response.data);
  };

  const handleChange = (e: any) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.put(
        `/events/${id}`,

        {
          ...form,

          categoryId: Number(form.categoryId),

          speakerId: Number(form.speakerId),
        },
      );

      navigate("/dashboard/events");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <h1
        className="
            text-2xl
            font-bold
            mb-6
            "
      >
        Edit Event
      </h1>

      <form
        onSubmit={handleSubmit}
        className="
            space-y-4
            "
      >
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Event Name"
          className="
                w-full
                border
                p-2
                rounded
                "
        />

        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          className="
                w-full
                border
                p-2
                rounded
                "
        >
          <option>Pilih Category</option>

          {categories.map((category: any) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          name="speakerId"
          value={form.speakerId}
          onChange={handleChange}
          className="
                w-full
                border
                p-2
                rounded
                "
        >
          <option>Pilih Speaker</option>

          {speakers.map((speaker: any) => (
            <option key={speaker.id} value={speaker.id}>
              {speaker.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="
                w-full
                border
                p-2
                rounded
                "
        />

        <input
          type="date"
          name="dateEvent"
          value={form.dateEvent}
          onChange={handleChange}
          className="
                w-full
                border
                p-2
                rounded
                "
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="
                w-full
                border
                p-2
                rounded
                "
        />
        <Button label="Update Event" variant="primary" />
      </form>
    </div>
  );
}
