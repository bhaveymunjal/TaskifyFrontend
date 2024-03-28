import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./Utils/UserProvider.jsx";
import { Toaster } from "./Components/ui/toaster.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <UserProvider>
      <Toaster />
        <App />
      </UserProvider>
    </Router>
  </React.StrictMode>
);
