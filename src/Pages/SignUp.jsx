import { useContext, useState } from "react";
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
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "@/Utils/UserProvider";
import Cookies from "js-cookie";
import { useToast } from "@/Components/ui/use-toast";

export default function SignUp() {
  document.title = "Taskify | SignUp";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { toast } = useToast();
  const { updateToken } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.password.length < 7) return;
    axios
      .post(`${backendUrl}/users/`, formData)
      .then((response) => {
        setFormData({
          name: "",
          email: "",
          password: "",
        });
        toast({
          variant: "success",
          title: "Success!",
          description:'Account created successfully. Manage your tasks now.'
        });
        updateToken(response.data.token);
        Cookies.set("token", response.data.token);
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description: error.response.data.error,
        });
      });
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update corresponding form field in state
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Card className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account and manage your tasks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                autoComplete="name"
                onChange={handleInputChange}
                placeholder="Max"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                autoComplete="email"
                onChange={handleInputChange}
                placeholder="m@example.com"
                required
              />
            </div>

            {/* Password Field */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              {formData.password && formData.password.length < 7 && (
                <p className="text-red-500 text-sm">Password must be at least 7 characters long.</p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Create an account
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm text-nowrap">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
