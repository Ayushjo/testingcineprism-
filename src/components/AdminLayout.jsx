"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom"; // 1. Import Outlet and useNavigate

export default function AdminLayout() {
  const navigate = useNavigate();

  // 2. This state now controls which child route is shown
  const [activeView, setActiveView] = useState("all-posts");

  const handleNavigate = (viewId) => {
    setActiveView(viewId);
    if (viewId === "logout") {
      // Handle logout logic
      console.log("Logging out");
      navigate("/");
    } else {
      navigate(`/admin/${viewId}`); // 3. Navigate to the child route
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex ">
      <div className="w-16 hover:w-60 transition-all duration-300 ease-in-out">
        <Sidebar activeView={activeView} onViewChange={handleNavigate} />
      </div>
      <div className="flex-1 bg-slate-950 pt-12">
        <div className="h-full p-4">
          <Outlet /> {/* 4. Render the active child route here */}
        </div>
      </div>
    </div>
  );
}
