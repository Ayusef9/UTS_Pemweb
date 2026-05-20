import {Mail,User,BookOpen,GraduationCap} from "lucide-react";

export default function Biodata(){
    return(

        <div className="p-6 flex justify-center">

            <div className=" bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl">
                <h1 className="text-3xl font-bold mb-8 text-center">
                     Biodata Mahasiswa
                </h1>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <img
                    src="https://i.pravatar.cc/300"
                    alt="profile"
                    className="w-52 h-52 rounded-full object-cover border-4 border-blue-500"/>

                    <div className="flex flex-col gap-4 text-lg">

                        <div className="flex items-center gap-3">

                            <User/>
                            <p>
                                <b>Nama:</b>
                                Ayu Seftiani
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <GraduationCap/>
                            <p>
                                <b>NIM:</b>
                                24090116
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <BookOpen/>
                            <p>
                                <b>Kelas:</b>
                                4D
                            </p>
                        </div>
                        <div className="flex items-center gap-3">

                            <Mail/>
                            <p>
                                <b>Program Studi</b>
                                D4 Teknik Informatika
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}