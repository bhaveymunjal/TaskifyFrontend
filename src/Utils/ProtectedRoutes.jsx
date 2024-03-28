import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserProvider";

export default function ProtectedRoutes() {
    const { token } = useContext(UserContext);
    if (!token) {
        return <Navigate to="/login" />;
    }
    return <Outlet />;
    }