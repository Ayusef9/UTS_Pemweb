import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import api from "../../../services/api";
import FormInput from "../../../components/FormInput";
import Button from "../../../components/ui/Button";

type FormData = {
  name: string;
  categoryId: string;
  speakerId: string;
  location: string;
  dateEvent: string;
  description: string;
};

const schema = z.object({
  name: z.string().min(1, "Event Name harus diisi"),
  categoryId: z.string().min(1, "Category wajib dipilih"),
  speakerId: z.string().min(1, "Speaker wajib dipilih"),
  location: z.string().min(1, "Location harus diisi"),
  dateEvent: z.string().min(1, "Tanggal wajib diisi"),
  description: z.string().min(1, "Description wajib diisi"),
});

export default function CreateNewEvent() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<any[]>([]);
  const [speakers, setSpeakers] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    fetchCategories();
    fetchSpeakers();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");

      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSpeakers = async () => {
    try {
      const response = await api.get("/speakers");

      setSpeakers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      await api.post("/events", {
        ...data,

        categoryId: Number(data.categoryId),

        speakerId: Number(data.speakerId),
      });

      navigate("/dashboard/events");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Create New Event</h1>

      <p>Silahkan isi semua data dengan benar</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          text="Event Name"
          type="text"
          name="name"
          register={register}
          error={errors.name?.message}
        />

        <div className="mb-3">
          <label>Category</label>

          <select
            {...register("categoryId")}
            className="border p-2 w-full rounded"
          >
            <option value="">Pilih Category</option>

            {categories.map((category: any) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {errors.categoryId && (
            <p className="text-red-500 text-sm">{errors.categoryId.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label>Speaker</label>

          <select
            {...register("speakerId")}
            className="border p-2 w-full rounded"
          >
            <option value="">Pilih Speaker</option>

            {speakers.map((speaker: any) => (
              <option key={speaker.id} value={speaker.id}>
                {speaker.name}
              </option>
            ))}
          </select>

          {errors.speakerId && (
            <p className="text-red-500 text-sm">{errors.speakerId.message}</p>
          )}
        </div>

        <FormInput
          text="Location"
          type="text"
          name="location"
          register={register}
          error={errors.location?.message}
        />

        <FormInput
          text="Date Event"
          type="date"
          name="dateEvent"
          register={register}
          error={errors.dateEvent?.message}
        />

        <FormInput
          text="Description"
          type="text"
          name="description"
          register={register}
          error={errors.description?.message}
        />

        <Button label="Submit" variant="primary" />
      </form>
    </div>
  );
}
