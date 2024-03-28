/* eslint-disable no-unused-vars */
import { UserContext } from "@/Utils/UserProvider";
import { Button } from "@/Components/ui/button";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "@/Components/ui/use-toast";
import GuestHome from "@/Components/Home/GuestHome";
import TaskForm from "@/Components/Home/TaskForm";
import UserTasks from "@/Components/Home/UserTasks";

export default function Home() {
  
  document.title = "Taskify | Home";
  const [userInfo, setUserInfo] = useState({});
  const [tasks, setTasks] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { token } = useContext(UserContext);
  const [taskData, setTaskData] = useState({
    description: "",
    status: "todo",
    priority: "medium",
  });

  // Function to handle Add Task form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${backendUrl}/tasks`, taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        getUserTasks();
        toast({
          variant: "success",
          title: "Success!",
          description: "Task added successfully.",
        });
        setTaskData({
          description: "",
          status: "todo",
          priority: "medium",
        });
      });
    setDialogOpen(false);
  };

  // Function to get user info
  const getUserInfo = () => {
    axios
      .get(`${backendUrl}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserInfo(response.data);
      });
  };

  // Function to get user tasks
  const getUserTasks = (page, limit) => {
    axios
      .get(`${backendUrl}/tasks?page=${page}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTasks(response.data);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevTaskData) => ({
      ...prevTaskData,
      [name]: value,
    }));
  };

  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (token) {
      getUserInfo();
      getUserTasks(1,100000);
    }
  }, [token]);
  if (!token) {
    return <GuestHome />;
  }
  return (
    <div className=" mx-auto p-4">
      <h1 className="text-5xl font-bold mb-4">Welcome, {userInfo.name}!</h1>
      <Button variant="outline" onClick={() => setDialogOpen(!dialogOpen)}>Add New Task</Button>
      <TaskForm dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} taskData={taskData} setTaskData={setTaskData} handleChange={handleChange} handleSubmit={handleSubmit} taskId="" />
      <UserTasks tasks={tasks} getUserTasks={getUserTasks}  />
    </div>
  );
}
