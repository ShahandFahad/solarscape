import React, { useEffect, useState } from "react";
import { GET_ALL_USERS } from "../utils/apiCalls";
import { useAuth } from "../../provider/authProvider";
import { useNavigate } from "react-router-dom";
import CustomUserTable from "../components/user/CustomUserTable";
import UserListProvider from "../provider/UserListProvider";
import UserTable from "../components/user/UserTable";

export default function Users() {
  const [users, setAllUsers] = useState([]);
  const { setToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    GET_ALL_USERS().then((data) => {
      // If user token is expired then remove token and logout user
      if (data.name === "TokenExpiredError") {
        setToken();
        navigate("/explore", { replace: true });
      } else {
        setAllUsers(data.data);
      }
    });
  }, []);

  return (
    <UserListProvider>
      <div className="p-4 mt-16">
        {/* This MUI table - Which is enhanced - With custom search and filters */}
        <UserTable />
        {/* This is custom user table - requires its dat via prop drilling - and has not search filter */}
        {/* {users && <CustomUserTable users={users} />} */}
      </div>
    </UserListProvider>
  );
}
