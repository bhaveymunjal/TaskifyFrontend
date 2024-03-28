import  { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import axios from "axios";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  async function validateToken(token) {
    try {
      const response = await axios.get(`${backendUrl}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // If the request is successful and returns data, the token is valid
      if (response.data) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      // If there's an error (e.g., network error, server error), the token is invalid
      // console.error('Error validating token:', error);
      return false;
    }
  }
  const [token, setToken] = useState("");
  useEffect(()=>{
    const token = Cookies.get("token");

    if(token){
      validateToken(token).then((isValid) => {
        if (isValid) {
          setToken(token);
        } else {
          Cookies.remove("token");
        }
      });
    }
  },[token]);
  const updateToken = (newToken) => {
    setToken(newToken);
  };
  return (
    <UserContext.Provider value={{token, updateToken}}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired
};
