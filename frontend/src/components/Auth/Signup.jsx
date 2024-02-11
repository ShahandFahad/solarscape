import React, { useState } from "react";
import { Link } from "react-router-dom";
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

/**
 * Steps:
 *  1) Validate Input Fields
 *  2) On invlaid red placeholder
 *  3) On register navigate to home page (user is logged int)
 *  4) On register display toast (green : Registeration is successful)
 *
 *  5) When user already exists: Display red toast: User is already present
 *  6) Incase of any other error: Display red toast: Register unsuccessful
 */
import styled from "styled-components";
import axios from "axios";
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

export default function Signup() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailBorderColor, setEmailBorderColor] = useState({});
  const [firstNameBorderColor, setFirstNameBorderColor] = useState({});
  const [lastNameBorderColor, setLastNameBorderColor] = useState({});
  const [passwordBorderColor, setPasswordBorderColor] = useState({});
  const [confirmPasswordBorderColor, setConfirmPasswordBorderColor] = useState(
    {}
  );

  //
  const [responseData, setResponseData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Toast for unsuccessful user registeration
  const notify = (errName) =>
    toast.error(`Registeration Failed! ${errName}`, {
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

  // Get user firstname
  const handleOnFirstNameChange = (e) => {
    setFirstName(e.target.value);
    setFirstNameBorderColor({
      border: `${validateName(e.target.value) ? errorStyle : validStyle}`,
    });
  };

  /**
   * All these handlers functions,
   * Validate these inputs, during input: Red for invalid, Green for valid input
   */
  // Get user lastname
  const handleOnLastNameChange = (e) => {
    setLastName(e.target.value);
    setLastNameBorderColor({
      border: `${validateName(e.target.value) ? errorStyle : validStyle}`,
    });
  };

  // Get user password
  const handleOnPasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordBorderColor({
      border: `${validatePassword(e.target.value) ? errorStyle : validStyle}`,
    });
  };

  // Get user confirm password
  const handleOnConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordBorderColor({
      border: `${validatePassword(e.target.value) ? errorStyle : validStyle}`,
    });
  };

  /**
   *
   * USER REGISTERATION
   *
   */

  // Handle signup data: Validate and send to server
  const handleSignup = async (e) => {
    // Prevent the browser from reloading the page
    e.preventDefault();
    // User signup data
    const signUpData = {
      email,
      firstName,
      lastName,
      password,
      confirmPassword,
    };

    // Flag for validation: Validate input fileds. If every thing is ok then make request to server
    let EVERYTHING_OK = true;

    // If email is empty the display red border and toast
    if (!signUpData.email || !validateEmail(signUpData.email)) {
      setEmailBorderColor({
        border: errorStyle,
      });

      setEmail("");
      EVERYTHING_OK = false;
    }

    // If first name is empty then display red border
    if (!signUpData.firstName || signUpData.firstName.length < 4) {
      setFirstNameBorderColor({
        border: errorStyle,
      });

      setFirstName("");
      EVERYTHING_OK = false;
    }
    // If last name is empty then display red border
    if (!signUpData.lastName || signUpData.lastName.length < 4) {
      setLastNameBorderColor({
        border: errorStyle,
      });

      setLastName("");
      EVERYTHING_OK = false;
    }
    // Compare both password and set border color Check for empty
    // Also display toast message: Password doesnot match
    if (
      !validateConfirmPassword(signUpData.password, signUpData.confirmPassword)
    ) {
      setPasswordBorderColor({
        border: errorStyle,
      });
      setConfirmPasswordBorderColor({
        border: errorStyle,
      });

      setPassword("");
      setConfirmPassword("");
      EVERYTHING_OK = false;
    }

    // If Everything is ok then make request to server
    // Register | Signup User
    if (EVERYTHING_OK) {
      // console.log(signUpData);
      // console.log(JSON.stringify(signUpData));
      setIsLoading(true);
      try {
        const response = await axios.post(
          `http://localhost:8001/api/v1/user/signup`,
          signUpData
        );

        // When user is successfully registered
        if (response.status === 201) {
          console.log("User signed up successfully!");
          console.log(response.data);
          // Handle successful signup, e.g., redirect to success page
          //   axios.defaults.headers.common[
          //     "Authorization"
          //   ] = `Bearer ${response.data.token}`;

          setResponseData(response.data);
        } else {
          console.error("Error signing up user:", response.data);
          // Handle API error gracefully, e.g., display user-friendly message

          // Notify user if fails
          notify(response.data.name);
        }
      } catch (error) {
        console.error("Error calling API:", error);

        // Handle network or other errors gracefully
        setError(error);
        notify(error.name);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("Fields are not validated properly");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      {/* Error Toast Container: When Registeration Fails, It will notify user */}
      <ToastContainer />
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                <img className="bg-white" alt="Logo" src={sun} />
              </div>
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">Register Account</h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                  Get started, please register for a free user account.
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
                    placeholder="example@email.com"
                    value={email}
                    onChange={handleOnEmailChange}
                    // style={{ border: `1.5px solid ${emailBorderColor}` }}
                    style={emailBorderColor}
                  />
                </div>
                {/* FIRST NAME INPUT */}
                <div className="flex flex-col">
                  <label className="leading-loose">First Name</label>
                  <input
                    type="text"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="First name"
                    value={firstName}
                    onChange={handleOnFirstNameChange}
                    style={firstNameBorderColor}
                  />
                </div>
                {/* LAST NAME INPUT */}
                <div className="flex flex-col">
                  <label className="leading-loose">Last Name</label>
                  <input
                    type="text"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Optional"
                    value={lastName}
                    onChange={handleOnLastNameChange}
                    style={lastNameBorderColor}
                  />
                </div>
                <div className="flex items-center space-x-4">
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
                  {/* CONFIRM PASSWORD */}
                  <div className="flex flex-col">
                    <label className="leading-loose">Confirm</label>
                    <div className="relative focus-within:text-gray-600 text-gray-400">
                      <input
                        type="password"
                        className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        placeholder="Confirm"
                        value={confirmPassword}
                        onChange={handleOnConfirmPasswordChange}
                        style={confirmPasswordBorderColor}
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
                  onClick={handleSignup}
                >
                  {/* If no laading display "Register". If loading Display spinner  */}
                  {!isLoading ? "Register" : <Spinner />}
                </button>
              </div>
              <div className="pt-4 flex justify-center items-center space-x-4">
                <p className="text-sm text-gray-500 leading-relaxed">
                  Already have an account?
                </p>{" "}
                {/* Navigate to /login Page to register*/}
                <Link to="/login">
                  <h2 className="leading-relaxed font-bold text-orange-400 hover:text-orange-600">
                    Login
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
