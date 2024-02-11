import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import sun from "../../assets/images/sun.png";

// Import validators
import {
  validateEmail,
  validateName,
  validatePassword,
  validateConfirmPassword,
} from "./validate";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styled from "styled-components";
import axios from "axios";
import { useAuth } from "../../provider/authProvider";
// Custom loader
const Spinner = styled.div`
  width: 24px;
  height: 24px;
  border: 5px solid #fff;
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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailBorderColor, setEmailBorderColor] = useState({});
  const [passwordBorderColor, setPasswordBorderColor] = useState({});

  // Auth
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  // Toast for unsuccessful user registeration
  const notify = (errName) =>
    toast.error(`User is not logged in! ${errName}`, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  // Styles:
  // 1) Error Style
  const errorStyle = "2px solid red";
  // 2) Valid Style
  const validStyle = "2px solid green";

  // Get user email from input
  const handleOnEmailChange = (e) => {
    setEmail(e.target.value);

    // setEmailBorderColor(!validateEmail(e.target.value) ? "red" : "green");
    setEmailBorderColor({
      border: `${!validateEmail(e.target.value) ? errorStyle : validStyle}`,
    });
  };

  // Get user password
  const handleOnPasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordBorderColor({
      border: `${validatePassword(e.target.value) ? errorStyle : validStyle}`,
    });
  };

  /**
   *
   * USER LOGGIN IN
   *
   */

  const handleLogin = async (e) => {
    // Prevent the browser from reloading the page
    e.preventDefault();
    // User signup data
    const loginData = {
      email,
      password,
    };

    // Flag for validation: Validate input fileds. If every thing is ok then make request to server
    let EVERYTHING_OK = true;

    // If email is empty the display red border and toast
    if (!loginData.email || !validateEmail(loginData.email)) {
      setEmailBorderColor({
        border: errorStyle,
      });

      setEmail("");
      EVERYTHING_OK = false;
    }

    if (password.length < 8) {
      setPasswordBorderColor({
        border: errorStyle,
      });
      setPassword("");
      EVERYTHING_OK = false;
    }
    // If Everything is ok then make request to server
    if (EVERYTHING_OK) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:8001/api/v1/user/login",
          loginData
        );

        // TODO: Handle Errors properly.

        // When login successfull
        if (response.status === 200 && response.data.status === "Success") {
          console.log("User is logged In!: ", response.status);
          console.log(response.data);

          // Store user login token
          setToken(response.data.token);
          // Navigate user to home page
          navigate("/", { replace: true });
        } else {
          console.log("Error logging in!: ", response.data);

          // notify user
          notify(response.data.name);
        }
      } catch (error) {
        notify(error.name);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      {/* Error Toast Container: When login  Fails, It will notify user */}
      <ToastContainer />
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                <img className="bg-white" alt="Logo" src={sun} />
              </div>
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">Login</h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                  Enter email and password to enter your account.
                </p>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                {/* EMAIL INPUT */}
                <div className="flex flex-col">
                  <label className="leading-loose">Email Address</label>
                  <input
                    type="email"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Email address"
                    value={email}
                    onChange={handleOnEmailChange}
                    // style={{ border: `1.5px solid ${emailBorderColor}` }}
                    style={emailBorderColor}
                  />
                </div>
                {/* PASSWORD INPUT */}
                <div className="flex flex-col">
                  <label className="leading-loose">Password</label>
                  <div className="relative focus-within:text-gray-600 text-gray-400">
                    <input
                      type="password"
                      className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Password"
                      value={password}
                      onChange={handleOnPasswordChange}
                      style={passwordBorderColor}
                    />
                    <div className="absolute left-3 top-2">
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
                          d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4 flex items-center space-x-4 mb-4">
                <button
                  style={{ backgroundColor: "#f2f2f2" }}
                  className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none"
                >
                  <svg
                    className="w-6 h-6 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                  Cancel
                </button>
                <button
                  style={{ background: "#f76b1c" }}
                  className="flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                  onClick={handleLogin}
                >
                  {/* If no laading display "Register". If loading Display spinner  */}
                  {!isLoading ? "Login" : <Spinner />}
                </button>
              </div>

              <div className="pt-4 flex justify-center items-center space-x-4">
                <p className="text-sm text-gray-500 leading-relaxed">
                  New to Solar Scape?
                </p>{" "}
                {/* Navigate to /signup Page to register*/}
                <Link to="/signup">
                  <h2 className="leading-relaxed font-bold text-orange-400 hover:text-orange-600">
                    Join Now
                  </h2>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
