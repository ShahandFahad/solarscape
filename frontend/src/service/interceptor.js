/**
 * Define base url and request timeout
 * Send Token Via header
 * Useful incases, of authorized route access which requires token.
 *
 * Further Help:
 *
 * For further help read these two stackoverflow question
 * 1) https://stackoverflow.com/questions/75385429/axios-instance-bearer-token-not-updated-after-login-without-reloading-react
 * 2) https://stackoverflow.com/questions/54637071/axios-default-headers-cleared-after-page-refresh-in-react-js
 *
 * @function
 * @returns request header with token (jwt)
 */

import axios from "axios";

// create base url and request time out
let AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_USER_MANAGEMENT_SERVER_BASE_URL,
  timeout: 5000,
});

/**
 * Intercepter Working:
 * AxiosInstance get token from the loacl storage and store it in the header.
 * When certain routes requires token, AxiosInstance is used to make the request to the protected route.
 */

AxiosInstance.interceptors.request.use((config) => {
  let token = window.localStorage.getItem("token");
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

// export moudle
export default AxiosInstance;
