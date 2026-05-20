import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import api from "../../../services/api";
import FormInput from "../../../components/FormInput";
import { Button } from "../../../components/ui/Button";

type FormData = {
  name: string;
  role: string;
  image: string;
};

const schema = z.object({
  name: z.string().min(1, "Nama speaker harus diisi"),
  role: z.string().min(1, "Role harus diisi"),
  image: z.string().min(1, "Image wajib diisi"),
});

export default function CreateNewSpeaker() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await api.post("/speakers", data);
      alert("Speaker berhasil ditambahkan");
      navigate("/dashboard/speakers");
    } catch (error) {
      console.log(error);
      alert("Gagal menambahkan speaker");
    }
  };

  return (
    <div className="p-6">
      <h1
        className="
      text-2xl
      font-bold
      mb-2
      "
      >
        Create Speaker
      </h1>

      <p
        className="
      text-slate-500
      mb-6
      "
      >
        Silahkan isi semua data dengan benar
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
        bg-white
        p-6
        rounded-lg
        shadow-md
        space-y-4
        "
      >
        <FormInput
          text="Speaker Name"
          type="text"
          name="name"
          register={register}
          error={errors.name?.message}
        />

        <FormInput
          text="Speaker Role"
          type="text"
          name="role"
          register={register}
          error={errors.role?.message}
        />

        <FormInput
          text="Image URL"
          type="text"
          name="image"
          register={register}
          error={errors.image?.message}
        />

        <Button
          label={isSubmitting ? "Loading..." : "Simpan"}
          variant="primary"
        />
      </form>
    </div>
  );
}
