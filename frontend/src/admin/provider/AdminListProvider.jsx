import React from "react";
import { useAuth } from "../../provider/authProvider";
import { useNavigate } from "react-router-dom";
import { GET_ALL_USERS } from "../utils/apiCalls";
import { AdminListContext } from "../context/Context";

export default function AdminListProvider({ children }) {
  const [users, setAllUsers] = React.useState([]);
  const { setToken } = useAuth();
  const navigate = useNavigate();

  // Fetch all user and filter out only amdin from it
  // NOTE THIS SHOULD BE DONE VIA QUERY - UPDATE THIS IN FUTURE
  React.useEffect(() => {
    GET_ALL_USERS().then((data) => {
      // If user token is expired then remove token and logout user
      if (data.name === "TokenExpiredError") {
        setToken();
        navigate("/logout", { replace: true });
      } else {
        // Filter User List and only send user with admin role to the settings
        let onlyAdmins = data.data;
        onlyAdmins = onlyAdmins?.filter((user) => user.role !== "user");
        setAllUsers(onlyAdmins);
      }
    });
  }, []);

  return (
    <AdminListContext.Provider value={users}>
      {children}
    </AdminListContext.Provider>
  );
}
