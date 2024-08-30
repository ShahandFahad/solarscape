import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import sun from "../../assets/images/sun.png";
import { sendOTP, verifyOTP, resetPassword } from "../../service/api";

// Import validators
import { validateEmail, validatePassword } from "./validate";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../provider/authProvider";
import Spinner from "../../components/spinner/Spinner";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(null);
  const [emailError, setEmailError] = useState(true);
  const [otp, setOTP] = useState("");
  const [otpError, setOtpError] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailBorderColor, setEmailBorderColor] = useState({});
  const [passwordBorderColor, setPasswordBorderColor] = useState({});
  const [confirmPasswordBorderColor, setConfirmPasswordBorderColor] = useState(
    {}
  );
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Toast for unsuccessful user registeration
  const notify = (message) =>
    toast.info(message, {
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

  // Get user confirm password
  const handleOnConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordBorderColor({
      border: `${validatePassword(e.target.value) ? errorStyle : validStyle}`,
    });
  };

  // OTP Handler
  const handleOTP = () => {
    if (!email) notify("Please provide email");
    else
      sendOTP(email).then((res) => {
        if (res?.status === "Success") setEmailError(false);
        setResponse(res);
        notify(res?.message);
      });
  };

  // OTP Verfication Handler
  const handleOTPVerification = () => {
    if (!otp) notify("Please provide otp");
    else
      verifyOTP(email, parseInt(otp)).then((res) => {
        if (res?.status === "Success") setOtpError(false);
        setResponse(res);
        notify(res?.message);
      });
  };

  // Password Update Handler
  const handleResetPassword = () => {
    if (!password || !confirmPassword || password !== confirmPassword)
      notify("Either fields are empty or password doesnot match");
    else
      resetPassword(email, password, confirmPassword).then((res) => {
        setResponse(res);
        notify(res?.message);
        setPassword("");
        setConfirmPassword("");
        setEmail("");
        setOTP("");
      });
  };
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      {/* Error Notfier */}
      <ToastContainer />
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        {" "}
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                <img className="bg-white" alt="Logo" src={sun} />
              </div>
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">Reset Password</h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                  Forget Password? Enter your email to recieve OTP.
                </p>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                {/* EMAIL INPUT */}
                {/* Send OTP */}
                {emailError && (
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
                )}
                {/* OTP Verification */}
                {otpError && !emailError && (
                  <div className="flex flex-col">
                    <label className="leading-loose">Enter 4 Digit OTP</label>
                    <input
                      type="number"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="1234"
                      value={otp}
                      onChange={(e) => setOTP(e.target.value)}
                      // style={{ border: `1.5px solid ${emailBorderColor}` }}
                      style={emailBorderColor}
                    />
                  </div>
                )}
                {/*UPDATE PASSWORD INPUT */}

                {!emailError && !otpError && (
                  <div className="flex flex-col">
                    <label className="leading-loose">Password</label>
                    <div className="relative focus-within:text-gray-600 text-gray-400">
                      <input
                        type="password"
                        className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        placeholder="Password"
                        value={password}
                        // onChange={handleOnPasswordChange}

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
                    {/* Confirm Password */}

                    <label className="leading-loose">Confirm Password</label>
                    <div className="relative focus-within:text-gray-600 text-gray-400">
                      <input
                        type="password"
                        className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        // onChange={handleOnPasswordChange}

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
                )}
              </div>
              <div className="pt-4 flex items-center space-x-4 mb-4">
                <Link
                  to="/service"
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
                </Link>
                {/* Send OTP */}
                {emailError && (
                  <button
                    style={{ background: "#f76b1c" }}
                    className="flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                    onClick={handleOTP}
                  >
                    {/* If no laading display "Register". If loading Display spinner  */}
                    {!isLoading ? "Send OTP" : <Spinner />}
                  </button>
                )}

                {/*  OTP Verification*/}
                {otpError && !emailError && (
                  <button
                    style={{ background: "#f76b1c" }}
                    className="flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                    onClick={handleOTPVerification}
                  >
                    {/* If no laading display "Register". If loading Display spinner  */}
                    {!isLoading ? "Verify OTP" : <Spinner />}
                  </button>
                )}

                {!emailError && !otpError && (
                  <button
                    style={{ background: "#f76b1c" }}
                    className="flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                    onClick={handleResetPassword}
                  >
                    {/* If no laading display "Register". If loading Display spinner  */}
                    {!isLoading ? "Update Password" : <Spinner />}
                  </button>
                )}
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
