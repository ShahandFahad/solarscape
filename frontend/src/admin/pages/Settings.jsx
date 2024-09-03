import React, { useState } from "react";
import RegisterNewAdmin from "../components/settingscomp/RegisterNewAdmin";
import AdminListProvider from "../provider/AdminListProvider";
import AdminTable from "../components/settingscomp/AdminTable";
// import CustomAdminTable from "../components/settingscomp/CustomAdminTable";

export default function Settings() {
  const [showAdminRegisterForm, setShowAdminRegisterForm] = useState(false);

  return (
    <AdminListProvider>
      <div className="p-4">
        <div className="flex items-center justify-between m-2">
          <h1 className="text-2xl">Application Admins</h1>
          <button
            onClick={() =>
              !showAdminRegisterForm
                ? setShowAdminRegisterForm(true)
                : setShowAdminRegisterForm(false)
            }
            className="flex gap-2 flex-wrap bg-orange-500 p-4 rounded-md text-white hover:bg-orange-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Add New Admin
          </button>
        </div>

        {/* This is MUI Table  */}
        {!showAdminRegisterForm && <AdminTable />}

        {/* When all users are fetched then display user table */}
        {/* This is custom table but not responsive  - no search and filters - requires prop driling*/}
        {/* {users && !showAdminRegisterForm && <CustomAdminTable users={users} />} */}
        {showAdminRegisterForm && (
          <RegisterNewAdmin
            setShowAdminRegisterForm={setShowAdminRegisterForm}
          />
        )}
      </div>
    </AdminListProvider>
  );
}
