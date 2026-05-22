import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { HomeIcon, FolderIcon, CalendarIcon, UsersIcon } from "lucide-react";

export default function DashboardLayout() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      <div className="min-h-screen bg-[#852e4e] w-64 flex flex-col justify-between p-4">
        <div className="border-b border-gray-100 py-4">
          <h1 className="text-white text-2xl font-bold">Invofest Dashboard</h1>
        </div>
        <div>
          <nav className="flex flex-col gap-2">
            <Link
              to="/dashboard"
              className="p-4 text-white text-lg hover:bg-black transition ease-in-out duration-150"
            >
              <span>
                <HomeIcon size={18} />
              </span>
              Dashboard
            </Link>
            <Link
              to="/dashboard/categories"
              className="p-4 text-white text-lg hover:bg-black transition ease-in-out duration-150"
            >
              <span>
                <FolderIcon size={18} />
              </span>
              Categories
            </Link>
            <Link
              to="/dashboard/speakers"
              className="p-4 text-white text-lg hover:bg-black transition ease-in-out duration-150"
            >
              <span>
                <CalendarIcon size={18} />
              </span>
              Speakers
            </Link>
            <Link
              to="/dashboard/events"
              className="p-4 text-white text-lg hover:bg-black transition ease-in-out duration-150"
            >
              <span>
                <UsersIcon size={18} />
              </span>
              Events
            </Link>
            <Link
              to="/dashboard/biodata"
              className="p-4 text-white text-lg hover:bg-black transition ease-in-out duration-150"
            >
              <span>
                <UsersIcon size={18} />
              </span>
              Biodata
            </Link>
          </nav>
        </div>
        <div>
          <button
            className="bg-red-300 text-white p-4 rounded w-full hover:bg-red-600 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex-1 p-6 min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
