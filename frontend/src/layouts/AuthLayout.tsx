import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="min-h-screen w-full grid grid-cols-2 items-center">
            <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center">
                <img
              src="https://www.invofest-harkatnegeri.com/assets/text-image.png"
              alt=""
              className="w-96" />
            <p> Invofest (Informatics Vocational Festival) </p>
            </div>

            <div className="p-6">
                <Outlet />
            </div>
            
        </div>
    );
}