import React from "react";
import Navbar from "../components/navbar/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import About from "../pages/About";

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
          {/* Moved these routes to APP.js */}
          {/* <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/contact" element={<Contact />} /> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />

          {/* Other non existent routes: Redirect to home when logged in */}
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}
