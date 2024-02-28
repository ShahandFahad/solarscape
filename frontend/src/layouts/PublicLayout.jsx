import React from "react";
import Navbar from "../components/navbar/Navbar";
import PublicServiceComponents from "../pages/PublicServiceComponents";
import PublicFooter from "../components/footer/PublicFooter";

export default function PublicLayout() {
  return (
    <div className="mt-14 h-full">
      <Navbar />
      {/* All public comps*/}
      <PublicServiceComponents />
      {/*  */}
      <PublicFooter />
    </div>
  );
}
