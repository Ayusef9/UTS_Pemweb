import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";
import { Button } from "../../../components/ui/Button";

type Category = {
  id:number;
  name:string;
};

export default function CategoryList(){

    const [categories,setCategories] =
    useState<Category[]>([]);

    const fetchCategories = async()=>{

        try{
            const response =
            await api.get("/categories");
            setCategories(response.data);
        }catch(error){
            console.log(error);
        }
    };
    useEffect(()=>{
        fetchCategories();
    },[]);
    const handleDelete = async(
        id:number
    )=>{
        const confirmDelete =
        confirm(
            "Yakin ingin menghapus category?"
        );
        if(!confirmDelete) return;
        try{
            await api.delete(
                `/categories/${id}`
            );
            fetchCategories();
        }catch(error){
            console.log(error);
        }
    };
    return(
        <div className="p-6">

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                    Category List
                </h1>
                <Link
                to="/dashboard/categories/create">
                    <Button label="Tambah Category" variant="primary"/>
                </Link>
            </div>
            <table className="w-full border">
                <thead>
                    <tr className="bg-slate-200">
                        <th>ID</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(
                    (category)=>(
                        <tr
                        key={category.id}
                        className="text-center border">
                            <td>
                                {category.id}
                            </td>
                            <td>
                                {category.name}
                            </td>
                            <td className="flex gap-2 justify-center p-2">

                                <Link
                                to={`/dashboard/categories/edit/${category.id}`} >
                                    <Button label="Edit" variant="secondary"/>
                                </Link>
                                <Button label="Delete" variant="danger"onClick={()=>handleDelete(category.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}