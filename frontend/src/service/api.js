// All Api Call to the backend services
import axios from "axios";
import AxiosInstance from "./interceptor";
const userManagementBaseUrl = "http://localhost:8001/api/v1/user";

//  User Registeration
export const userSignUp = async (data) => {
  try {
    const response = await axios.post(`${userManagementBaseUrl}/signup`, data);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// User Sign In
export const userSignIn = async (data) => {
  try {
    const response = await axios.post(`${userManagementBaseUrl}/login`, data);
    return response;
  } catch (error) {
    return error;
  }
};

// Get User Profile Details
export const getUserById = async (id) => {
  try {
    const response = AxiosInstance.get(`/api/v1/user/${id}`);
    return response;
  } catch (err) {
    console.log(`User Data Not Recied: ${err.message}`);
  }
};

// Forget password - Send OTP
export const sendOTP = async (email) => {
  try {
    const res = await axios.post(
      `${userManagementBaseUrl}/forget-password/send-otp`,
      { email }
    );
    return res.data;
  } catch (err) {
    return err?.response?.data;
  }
};

// Forget Passwor - Verify OTP
export const verifyOTP = async (email, otp) => {
  try {
    const res = await axios.post(
      `${userManagementBaseUrl}/forget-password/verify-otp`,
      { email, otp }
    );
    return res.data;
  } catch (err) {
    return err?.response?.data;
  }
};

// Forget Password - Reset | Update Password
export const resetPassword = async (email, password, confirmPassword) => {
  try {
    const res = await axios.put(
      `${userManagementBaseUrl}/forget-password/reset-password`,
      {
        email,
        password,
        confirmPassword,
      }
    );

    return res.data;
  } catch (err) {
    return err?.response?.data;
  }
};

// Update User Profile
export const updateUserProfile = async (data) => {
  try {
    const response = await AxiosInstance.patch(
      `/api/v1/user/update-profile/${localStorage.getItem("UserID")}`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

// Delete - Deactivate user Account
export const deleteUserAccount = async (id) => {
  try {
    const response = AxiosInstance.delete(
      `/api/v1/user/${localStorage.getItem("UserID")}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

// Get Solar Potentail Assessment Data
export const getSolarPOV = async (data) => {
  try {
    const res = await axios.post(
      "http://localhost:8003/api/v1/solar/pv-assessment",
      data
    );
    return res;
  } catch (error) {
    return error;
  }
};

// Send user feedback
export const sendUserFeedback = async (
  userName,
  userEmail,
  userSubject,
  userMessage
) => {
  try {
    const res = await axios.post(`${userManagementBaseUrl}/send-feedback`, {
      userName,
      userEmail,
      userSubject,
      userMessage,
    });
    return res;
  } catch (error) {
    return error;
  }
};