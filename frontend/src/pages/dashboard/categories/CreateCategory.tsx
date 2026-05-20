import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

import api from "../../../services/api";
import FormInput from "../../../components/FormInput";
import { Button } from "../../../components/ui/Button";

type FormData = {
  name: string;
};

const schema = z.object({
  name: z.string().min(1, "Category harus diisi"),
});

export default function CreateCategory() {
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
      await api.post("/categories", data);

      alert("Category berhasil ditambahkan");

      navigate("/dashboard/categories");
    } catch (error) {
      console.log(error);

      alert("Gagal menambahkan category");
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
        Create New Category
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
          text="Category Name"
          type="text"
          name="name"
          register={register}
          error={errors.name?.message}
        />

        <Button
          label={isSubmitting ? "Loading..." : "Simpan"}
          variant="primary"
        />
      </form>
    </div>
  );
}
