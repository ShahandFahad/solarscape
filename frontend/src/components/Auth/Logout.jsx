import React from "react";
import axios from "axios";
import { useAuth } from "../../provider/authProvider";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// Custom loader
const Spinner = styled.div`
  width: 80px;
  height: 80px;
  border: 10px solid #f76b1c;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LogOut = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Logout = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  //   Just remove the token from local storage and navigate back to login page
  const handleLogout = () => {
    setToken();
    localStorage.removeItem("UserID");
    navigate("/login", { replace: true });
  };

  //   Wait for 5 sec
  setTimeout(() => {
    handleLogout();
    console.log("User Logged Out.");
  }, 1500);

  return (
    <LogOut>
      <Spinner />
      <h1>LOGGING OUT...</h1>
    </LogOut>
  );
};

export default Logout;
