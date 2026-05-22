import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardIndex from "./pages/dashboard/DashboardIndex";
import CreateCategory from "./pages/dashboard/categories/CreateCategory";
import CategoryList from "./pages/dashboard/categories/CategoryList";
import EditCategory from "./pages/dashboard/categories/EditCategory";
import EventList from "./pages/dashboard/events/EventList";
import CreateEvent from "./pages/dashboard/events/CreateEvent";
import EditEvent from "./pages/dashboard/events/EditEvent";
import EditSpeaker from "./pages/dashboard/speakers/EditSpeaker";
import CreateNewSpeaker from "./pages/dashboard/speakers/CreateSpeaker";
import SpeakerList from "./pages/dashboard/speakers/SpeakerList";
import Biodata from "./pages/dashboard/biodata/Biodata";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardIndex />} />
            <Route path="/dashboard/categories" element={<CategoryList />} />
            <Route
              path="/dashboard/categories/create"
              element={<CreateCategory />}
            />
            <Route
              path="/dashboard/categories/edit/:id"
              element={<EditCategory />}
            />
            <Route path="/dashboard/events" element={<EventList />} />
            <Route path="/dashboard/events/create" element={<CreateEvent />} />
            <Route path="/dashboard/events/edit/:id" element={<EditEvent />} />
            <Route path="/dashboard/speakers" element={<SpeakerList />} />
            <Route
              path="/dashboard/speakers/create"
              element={<CreateNewSpeaker />}
            />
            <Route
              path="/dashboard/speakers/edit/:id"
              element={<EditSpeaker />}
            />
            <Route path="/dashboard/biodata" element={<Biodata />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
