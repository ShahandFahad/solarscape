import React, { useState } from "react";

// Import validators
import {
  validateEmail,
  validateName,
  validatePassword,
  validateConfirmPassword,
} from "../../../components/Auth/validate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { REGISTER_NEW_ADMIN } from "../../service/apiCalls";
import { useAuth } from "../../../provider/authProvider";
import { useNavigate } from "react-router-dom";

export default function RegisterNewAdmin({ setShowAdminRegisterForm }) {
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
  // const [isLoading, setIsLoading] = useState(false);
  const { setToken } = useAuth();
  const navigate = useNavigate();

  // Toast for unsuccessful user registeration
  const notifyError = (errName) =>
    toast.error(`Registeration Failed (Check Existing Admin)`, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const notifyAdminRegister = () =>
    toast.success(`New Admin Registered!`, {
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
   * Register New Admin
   *
   */

  // Handle data: Validate and send to server
  const handleUserProfileUpdate = async (e) => {
    // Prevent the browser from reloading the page
    e.preventDefault();
    // User signup data
    const newAdminData = {
      email,
      firstName,
      lastName,
      password,
      confirmPassword,
    };

    // Flag for validation: Validate input fileds. If every thing is ok then make request to server
    let EVERYTHING_OK = true;

    // If email is empty the display red border and toast
    if (!newAdminData.email || !validateEmail(newAdminData.email)) {
      setEmailBorderColor({
        border: errorStyle,
      });

      setEmail("");
      EVERYTHING_OK = false;
    }

    // If first name is empty then display red border
    if (!newAdminData.firstName || newAdminData.firstName.length < 4) {
      setFirstNameBorderColor({
        border: errorStyle,
      });

      setFirstName("");
      EVERYTHING_OK = false;
    }
    // If last name is empty then display red border
    if (!newAdminData.lastName || newAdminData.lastName.length < 4) {
      setLastNameBorderColor({
        border: errorStyle,
      });

      setLastName("");
      EVERYTHING_OK = false;
    }
    // Compare both password and set border color Check for empty
    // Also display toast message: Password doesnot match
    if (
      !validateConfirmPassword(
        newAdminData.password,
        newAdminData.confirmPassword
      )
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
    // Register
    if (EVERYTHING_OK) {
      // setIsLoading(true);
      REGISTER_NEW_ADMIN(newAdminData)
        .then((response) => {
          if (response.data.name === "TokenExpiredError") {
            setToken();
            navigate("/explore", { replace: true });
          }
          if (response.status === 200) {
            notifyAdminRegister();
            // Set Fields to empty
            setEmail("");
            setFirstName("");
            setLastName("");
            setPassword("");
            setConfirmPassword("");
          } else {
            notifyError();
          }
        })
        .catch((error) => {
          notifyError(error.name);
        });
    } else {
      console.log("Fields are not validated properly");
    }
  };

  return (
    <div className="h-full border">
      <div className="flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
        {/*  Admin INFO */}
        <div className="flex flex-col w-full 2xl:w-3/3">
          <div className="flex-1 bg-white rounded-lg p-8">
            <h4 className="text-xl text-gray-900 font-bold">
              Register New Admin
            </h4>
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
            {/* UPDATE TOAST */}
            <ToastContainer />
            {/*  */}
            <div className="flex-1 flex flex-col items-center lg:items-end justify-end mt-2">
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={() => setShowAdminRegisterForm(false)}
                  className="flex items-center bg-green-500 hover:bg-green-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
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
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>

                  <span>Cancel</span>
                </button>
                <button
                  onClick={handleUserProfileUpdate}
                  className="flex items-center bg-red-500 hover:bg-red-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
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
                      d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
                    />
                  </svg>

                  <span>Register</span>
                </button>
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
