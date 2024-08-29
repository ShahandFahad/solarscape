// All Api Call to the backend services
import axios from "axios";
import AxiosInstance from "../../service/interceptor";
const userManagementBaseUrl = "http://localhost:8001";

// Sign Up User: User signup is performed in /components/Auth/Signup.jsx

export const GET_ALL_USERS = async () => {
  try {
    const response = await AxiosInstance.get(`/api/v1/user`);
    // const data_1 = console.log(response);
    return response.data;
  } catch (error) {
    console.error("ERROR:", error);
  }
};

// Update User Password From Admin Side
export const UPDATE_USER_PASSWORD_BY_ID = async (userID, newPassword) => {
  try {
    const response = await AxiosInstance.patch(`/api/v1/user/${userID}`, {
      id: userID,
      password: newPassword,
    });

    return response;
  } catch (error) {
    console.error(`User Password Not Updated(ADMIN): ${error}`);
  }
};

// DELETE User by ID From Admin Side
export const DELETE_USER_BY_ID = async (userID) => {
  try {
    const response = await AxiosInstance.delete(`/api/v1/user/${userID}`);
    return response;
  } catch (error) {
    console.error(`User Deletion Failed (ADMIN): ${error}`);
  }
};

// Register New Admin
export const REGISTER_NEW_ADMIN = async (newAdmin) => {
  console.log(newAdmin);
  try {
    const response = await AxiosInstance.post(`/api/v1/user`, newAdmin);
    return response;
  } catch (error) {
    console.error(`New Admin Regiter Failed (ADMIN): ${error}`);
  }
};

// Get User Register Timeline Stats
export const GET_USER_TIMELINE = async () => {
  try {
    const response = await AxiosInstance.get(
      `/api/v1/user/dashboard-stats/users-timeline`
    );
    return response.data; // Return only the data part of the response
  } catch (error) {
    console.error("USER TIMELINE ERROR: ", error); // Log the error
    throw error; // Rethrow the error so it can be caught by the caller
  }
};
