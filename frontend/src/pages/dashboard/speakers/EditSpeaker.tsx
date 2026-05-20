import {
useEffect,
useState
} from "react";

import {
useNavigate,
useParams
} from "react-router-dom";

import api from "../../../services/api";

import {
Button
} from "../../../components/ui/Button";

export default function EditSpeaker(){

    const { id } =
    useParams();

    const navigate =
    useNavigate();

    const [form,setForm] =
    useState({

        name:"",

        role:"",

        image:""

    });

    useEffect(()=>{

        fetchSpeaker();

    },[]);

    const fetchSpeaker =
    async()=>{

        const response =
        await api.get(
            `/speakers/${id}`
        );

        setForm(
            response.data
        );

    };

    const handleChange =
    (e:any)=>{

        setForm({

            ...form,

            [e.target.name]:
            e.target.value

        });

    };

    const handleSubmit =
    async(
    e:React.FormEvent
    )=>{

        e.preventDefault();

        try{

            await api.put(

                `/speakers/${id}`,

                form

            );

            navigate(
                "/dashboard/speakers"
            );

        }catch(error){

            console.log(error);

        }

    };

    return(

        <div className="p-6">

            <h1 className="
            text-2xl
            font-bold
            mb-6
            ">

                Edit Speaker

            </h1>

            <form
            onSubmit={handleSubmit}
            className="
            space-y-4
            "
            >

                <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="
                border
                p-2
                rounded
                w-full
                "
                />

                <input
                name="role"
                value={form.role}
                onChange={handleChange}
                className="
                border
                p-2
                rounded
                w-full
                "
                />

                <input
                name="image"
                value={form.image}
                onChange={handleChange}
                className="
                border
                p-2
                rounded
                w-full
                "
                />

                <Button
                label="Update Speaker"
                variant="primary"
                />

            </form>

        </div>

    );

}