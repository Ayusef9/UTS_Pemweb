import { useEffect, useState } from "react";
import api from "../../services/api";

export default function DashboardIndex() {
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalSpeakers, setTotalSpeakers] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [categoriesResponse, speakersResponse, eventsResponse] =
        await Promise.all([
          api.get("/categories"),
          api.get("/speakers"),
          api.get("/events"),
        ]);

      setTotalCategories(categoriesResponse.data.length);
      setTotalSpeakers(speakersResponse.data.length);
      setTotalEvents(eventsResponse.data.length);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-lg ">Loading dashboard...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">Dashboard Admin</h1>

      <p className=" text-slate-500 mb-8">Selamat Datang</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className=" bg-white rounded-xl shadow-md border p-6">
          <h2 className=" text-slate-500 font-medium">Total Categories</h2>

          <p className="text-4xl font-bold text-[#852e4e] mt-4">
            {totalCategories}
          </p>
        </div>

        <div className=" bg-white rounded-xl shadow-md border p-6">
          <h2 className=" text-slate-500 font-medium">Total Speakers</h2>

          <p className="text-4xl font-bold text-[#852e4e] mt-4">
            {totalSpeakers}
          </p>
        </div>

        <div className=" bg-white rounded-xl shadow-md border p-6">
          <h2 className=" text-slate-500 font-medium">Total Events</h2>

          <p className=" text-4xl font-bold text-[#852e4e] mt-4">
            {totalEvents}
          </p>
        </div>
      </div>
    </div>
  );
}
