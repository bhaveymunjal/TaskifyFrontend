/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { DataTable } from "./DataTable";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { UserContext } from "@/Utils/UserProvider";
import TaskForm from "./TaskForm";

export default function UserTasks({ tasks, getUserTasks }) {
  const[taskId, setTaskId] = useState("")
  const [taskData, setTaskData] = useState({
    description: "",
    status: "",
    priority: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { token } = useContext(UserContext);

  const handleDelete = (id) => {
    axios
      .delete(`${backendUrl}/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        getUserTasks();
        toast({
          variant: "success",
          title: "Success!",
          description: "Task deleted successfully!",
        });
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Error!",
          description: err.response.data.error,
        });
      });
  };

  const handleSubmit = (id) =>{
    // console.log(id)
    // console.log(taskData)
    axios.patch(`${backendUrl}/tasks/${id}`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      getUserTasks();
      setDialogOpen(false);
      toast({
        variant: "success",
        title: "Success!",
        description: "Task added successfully!",
      });
    }).catch((err) => {
      toast({
        variant: "destructive",
        title: "Error!",
        description: err.response.data.error,
      });
    });
  }

  const handleEdit = (task) => {
    setTaskId(task._id)
    setTaskData({
      description: task.description,
      status: task.status,
      priority: task.priority,
    });
    setDialogOpen(true);
  };

  const columns = [
    {
      accessorKey: "description",
      header: <span className="cursor-pointer">Description</span>,
      cell: ({ row }) => {
        const description = row.original.description;
        return <span>{description}</span>;
      },
    },
    {
      accessorKey: "status",
      header: <span className="cursor-pointer">Status</span>,
      cell: ({ row }) => {
        const status = row.original.status;
        return <span className="capitalize">{status}</span>;
      },
    },
    {
      accessorKey: "priority",
      header: <span className="cursor-pointer">Priority</span>,
      cell: ({ row }) => {
        const priority = row.original.priority;
        return <span className="capitalize">{priority}</span>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const task = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleDelete(task._id)}>
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEdit(task)}>
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      header: "Actions",
    },
  ];

  if(tasks.length===0)
    return <div className="text-center text-2xl">No tasks found! Add a new Task now</div>
  return (
    <>
      <h1 className="text-3xl my-4">Tasks</h1>
      <DataTable columns={columns} data={tasks}  />
      {dialogOpen && <TaskForm dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} taskData={taskData} setTaskData={setTaskData} handleChange={handleChange} handleSubmit={handleSubmit} taskId={taskId} />}
    </>
  );
}

UserTasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  getUserTasks: PropTypes.func.isRequired,
};
