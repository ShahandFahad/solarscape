import React, { useEffect, useState } from "react";
import { GET_ALL_USERS } from "../utils/apiCalls";
import { useAuth } from "../../provider/authProvider";
import { useNavigate } from "react-router-dom";
import AdminTable from "../components/settingscomp/AdminTable";
import RegisterNewAdmin from "../components/settingscomp/RegisterNewAdmin";

export default function Settings() {
  const [users, setAllUsers] = useState([]);
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [showAdminRegisterForm, setShowAdminRegisterForm] = useState(false);

  useEffect(() => {
    GET_ALL_USERS().then((data) => {
      // If user token is expired then remove token and logout user
      if (data.name === "TokenExpiredError") {
        setToken();
        navigate("/explore", { replace: true });
      } else {
        // Filter User List and only send user with admin role to the settings
        let onlyAdmins = data.data;
        onlyAdmins = onlyAdmins?.filter((user) => user.role !== "user");
        setAllUsers(onlyAdmins);
      }
    });
  }, []);

  return (
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
      {/* When all users are fetched then display user table */}
      {users && !showAdminRegisterForm && <AdminTable users={users} />}
      {showAdminRegisterForm && (
        <RegisterNewAdmin setShowAdminRegisterForm={setShowAdminRegisterForm} />
      )}
    </div>
  );
}
