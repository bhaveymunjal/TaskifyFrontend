/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useContext } from "react";
import { UserContext } from "../Utils/UserProvider";
import axios from "axios";
import { toast } from "./ui/use-toast";
import Cookies from "js-cookie";

export default function Navbar() {
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const {token, updateToken} = useContext(UserContext);

    // Function to handle login
    const handleLogin = () => {
        navigate('login');
    }

    // Function to handle sign up
    const handleSignUp = () => {
        navigate('signup');
    }

    // Function to handle logout
    const handleLogout = () => {
        axios.post(`${backendUrl}/users/logout`,{},{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((response)=>{
            updateToken("");
            Cookies.remove("token");
            toast({
                variant: "success",
                title: "Success!",
                description:response.data.message
              });
        }).catch((error)=>{
            console.error(error)
        })
        
    }

    const handleProfile = () => {
        navigate('profile');
    }
  return (
    <div className="bg-slate-100 p-3 shadow-md flex justify-between items-center h-[80px] fixed w-full top-0 z-10">
        <div className="">
            <Link to="/" className="text-xl font-bold">Taskify</Link>
        </div>
        <div className="flex gap-2">
        <Button onClick = {token===""?handleLogin:handleLogout}>{token===""?"Login":"Logout"}</Button>
        {/* <Button onClick = {token===""?handleSignUp:handleProfile}>{token===""?"Sign Up":"Profile"}</Button> */}
        {token==="" && <Button onClick = {handleSignUp}>Sign Up</Button>}
        </div>
    </div>
  )
}
