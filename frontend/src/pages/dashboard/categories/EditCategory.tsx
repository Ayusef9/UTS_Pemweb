import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import { Button } from "../../../components/ui/Button";

export default function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await api.get(`/categories/${id}`);

      setName(response.data.name);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/categories/${id}`, {
        name,
      });
      navigate("/dashboard/categories");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-6">
      <h1 className=" text-2xl font-bold mb-6">Edit Category</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <Button label="Update" variant="primary" />
      </form>
    </div>
  );
}
