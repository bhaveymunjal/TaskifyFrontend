import { useContext, useState } from "react";
import axios from "axios";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/Components/ui/use-toast";
import { UserContext } from "@/Utils/UserProvider";
import Cookies from "js-cookie";

export default function Login() {
  document.title = "Taskify | Login";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { updateToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/users/login`, formData);

      // Check if the response is successful (status code 2xx)
      if (response.status === 200 || response.status === 201) {
        toast({
          variant: "success",
          title: "Success!",
          description: "Login successful",
        });
        setFormData({
          email: "",
          password: "",
        });
        updateToken(response.data.token);
        Cookies.set("token", response.data.token);
        navigate("/");
      } else {
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description: response.data.error,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: error.response.data.error,
      });
    }
  };

  return (
    <Card className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your email and password to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="m@example.com"
                autoComplete="email"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* <Link
                  href="/forgot"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link> */}
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                placeholder="********"
                required
              />
            </div>

            <Button className="w-full" type="submit">
              Login
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm text-nowrap">
          Don&apos;t have an account?
          <Link to="/signup" className="underline">
            Sign Up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
