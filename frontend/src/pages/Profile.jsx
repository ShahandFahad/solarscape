import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Import validators
import {
  validateEmail,
  validateName,
  validatePassword,
  validateConfirmPassword,
} from "../components/Auth/validate";

import { toast } from "react-toastify";
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
import { useAuth } from "../provider/authProvider";
import PersonalInfo from "../components/profile/PersonalInfo";
import ActivityLog from "../components/profile/ActivityLog";
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

export default function Profile() {
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

  const [currentUser, setCurrentUser] = useState(null);

  // Auth
  const { setToken } = useAuth();
  const navigate = useNavigate();

  // Data
  const [responseData, setResponseData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //   Const Get Current User
  useEffect(() => {
    const currentUserID = localStorage.getItem("UserID");
    axios
      .get(`http://localhost:8001/api/v1/user/${currentUserID}`)
      .then((res) => {
        setCurrentUser(res.data.user);
      })
      .catch((err) => console.log(`User Data Not Recied: ${err.message}`));
  }, []);

  //

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
        const response = await axios.put(
          `http://localhost:8001/api/v1/user/1234`,
          signUpData
        );

        // When user is successfully registered
        if (response.status === 201) {
          console.log("User signed up successfully!");
          console.log(response.data);
          setResponseData(response.data);

          // redirect to success page
          // Set token to local storage and naviage
          setToken(response.data.token);
          navigate("/", { replace: true }); // load home screen client side
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
    <div className="h-full bg-gray-200 p-8">
      <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
        {/* CARD 1 */}
        <div className="w-full flex flex-col 2xl:w-1/3">
          {/* PERSONAL INFO */}
          {currentUser && <PersonalInfo currentUser={currentUser} />}
          {!currentUser && <Spinner />}

          {/* ACTIVITY LOG: RECENT */}
          <ActivityLog />
        </div>

        {/* UPDATE PERSONAL INFO */}
        <div className="flex flex-col w-full 2xl:w-2/3">
          <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
            <h4 className="text-xl text-gray-900 font-bold">Update Profile</h4>
            {/* <p className="mt-2 text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              voluptates obcaecati numquam error et ut fugiat asperiores. Sunt
              nulla ad incidunt laboriosam, laudantium est unde natus cum
              numquam, neque facere. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Ut, magni odio magnam commodi sunt ipsum eum!
              Voluptas eveniet aperiam at maxime, iste id dicta autem odio
              laudantium eligendi commodi distinctio!
            </p> */}

            {/* PROFILE INPUTS */}
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
            {/*  */}

            <hr />
            <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
              <div className="flex items-center space-x-4 mt-2">
                <button className="flex items-center bg-green-500 hover:bg-green-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>

                  <span>Update</span>
                </button>
                <button className="flex items-center bg-red-500 hover:bg-red-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
