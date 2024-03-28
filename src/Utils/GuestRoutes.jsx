import { useContext } from "react";
import { UserContext } from "./UserProvider";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function GuestRoutes({ element }) {
    const { token } = useContext(UserContext);
    return token ? <Navigate to="/" replace /> : element;
  }
  GuestRoutes.propTypes = {
    element: PropTypes.element.isRequired,
  };