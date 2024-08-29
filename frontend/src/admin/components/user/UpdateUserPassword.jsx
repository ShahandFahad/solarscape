import React from "react";
import { useState } from "react";
import { validatePassword } from "../../../components/Auth/validate";
import { UPDATE_USER_PASSWORD_BY_ID } from "../../service/apiCalls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateUserPassword({
  setShowUpdatePassword,
  clickedUserId,
}) {
  const [password, setPassword] = useState("");
  const [passwordBorderColor, setPasswordBorderColor] = useState({});

  // Toast for unsuccessful user registeration
  const notify = (errName) =>
    toast.error(`User is not Updated! ${errName}`, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  // Toast for unsuccessful user registeration
  const notifyPasswordUpdate = () =>
    toast.success(`User Password Updated. Send Email to user`, {
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
  // Get user password
  const handleOnPasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordBorderColor({
      border: `${validatePassword(e.target.value) ? errorStyle : validStyle}`,
    });
  };

  /**
   *
   * Update User Password
   *
   */

  const handleUserPasswordUpdate = (e) => {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Flag for validation: Validate input fileds. If every thing is ok then make request to server
    let EVERYTHING_OK = true;

    if (password.length < 8) {
      setPasswordBorderColor({
        border: errorStyle,
      });
      setPassword("");
      EVERYTHING_OK = false;
    }
    // If Everything is ok then make request to server
    if (EVERYTHING_OK) {
      // Request to server for user passwrod Update by Id
      UPDATE_USER_PASSWORD_BY_ID(clickedUserId, password)
        .then((response) => {
          // Password update is successful
          if (response.status === 200 && response.data.status === "Success") {
            //Notify Success
            notifyPasswordUpdate();
          } else {
            console.log("Error Updating Pass!: ", response.data);
            // Notify Error
            notify(response.data.name);
          }
        })
        .catch((error) => {
          notify(error.name);
        });
    }
  };
  return (
    <div className="flex justify-center h-full items-center space-x-4 bg-gray-100 backdrop-blur-sm bg-white/10">
      {/* Toast Notifier */}
      <ToastContainer />
      {/* PASSWORD INPUT */}

      <div className="flex flex-col bg-white p-10 rounded-md shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2>Reset Password</h2>
          {/* Cancel box */}
          <button
            className="flex justify-end cursor-pointer"
            onClick={(e) => setShowUpdatePassword(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* <label className="leading-loose">Password</label> */}
        <div className="flex gap-2 relative focus-within:text-gray-600 text-gray-400">
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
          {/* Update Pass BTN */}
          <button
            onClick={handleUserPasswordUpdate}
            className="flex items-center bg-green-500 hover:bg-green-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100"
          >
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
        </div>
      </div>
    </div>
  );
}
