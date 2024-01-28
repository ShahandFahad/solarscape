import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Dashboard from "../pages/Dashboard";
import Analytics from "../pages/Analytics";
import Users from "../pages/Users";
import Settings from "../pages/Settings";

// Setting basic routes
export default function MainLayout() {
  return (
    <>
      {/* Navbar: Contains: Top Navbar and Sidebar */}
      <Navbar />
      {/* Basic Routes need to authorized */}
      <div className="mt-14">
        {/* 

           All Admin Panel Routes

           /admin -> Admin Home Route
           /admin/analytics -> Admin Analytics Route
           /admin/users -> Admin Users Route
           /admin/settings -> Admin Users Route

        */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="dashboard/" element={<Dashboard />} /> */}
          <Route path="analytics" element={<Analytics />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </div>
    </>
  );
}
