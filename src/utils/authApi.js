// authApi.js
import axios from "axios";

const BASE_URL = "https://tager.onrender.com";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/vendor/new-vendor-request`,
      userData
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to register user");
  }
};

export const verifyEmail = async ({ code, email }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/vendor/validate-code/${code}/${email}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to verify email");
  }
};
