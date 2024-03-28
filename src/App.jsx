import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
// import Profile from "./Pages/Profile";
import ProtectedRoutes from "./Utils/ProtectedRoutes";
import GuestRoutes from "./Utils/GuestRoutes";
import NotFoundPage from "./Pages/NotFoundPage";

export default function App() {
  return (
    <div>
      <Navbar />
      <div className="mt-[80px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoutes />}>
            {/* <Route path="/profile" element={<Profile />} /> */}
          </Route>
          <Route path="/login" element={<GuestRoutes element={<Login />} />} />
          <Route path="/signup" element={<GuestRoutes element={<SignUp />} />}
          />
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
      </div>
    </div>
  );
}
