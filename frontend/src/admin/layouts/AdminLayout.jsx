import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Settings from "../pages/Settings";

// Setting basic routes
export default function MainLayout() {
  return (
    <>
      {/* Navbar: Contains: Top Navbar and Sidebar */}
      <Navbar />
      {/* Basic Routes need to authorized */}
      <div className="mt-12">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </div>
    </>
  );
}
