import React from "react";
import Navbar from "../components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";
import Contact from "../pages/Contact";

// Setting basic routes
export default function MainLayout() {
  return (
    <>
      {/* Navbar: Contains: Top Navbar and Sidebar */}
      <Navbar />
      {/* Basic Routes need to authorized */}
      <div className="mt-14">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </>
  );
}
