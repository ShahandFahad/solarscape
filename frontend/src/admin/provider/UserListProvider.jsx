import React from "react";
import { useAuth } from "../../provider/authProvider";
import { GET_ALL_USERS } from "../utils/apiCalls";
import { useNavigate } from "react-router-dom";
import { UserListContext } from "../context/Context";

export default function UserListProvider({ children }) {
  const [users, setAllUsers] = React.useState([]);
  const { setToken } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    GET_ALL_USERS().then((data) => {
      // If user token is expired then remove token and logout user
      if (data.name === "TokenExpiredError") {
        setToken();
        navigate("/logout", { replace: true });
      } else {
        setAllUsers(data.data);
      }
    });
  }, []);

  return (
    <UserListContext.Provider value={users}>
      {children}
    </UserListContext.Provider>
  );
}
