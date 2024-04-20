import React, { useEffect, useState } from "react";
import { GET_ALL_USERS } from "../utils/apiCalls";
import { useAuth } from "../../provider/authProvider";
import { useNavigate } from "react-router-dom";
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
    <div className="p-4">
      {/* When all users are fetched then display user table */}
      {users && <UserTable users={users} />}
    </div>
  );
}
