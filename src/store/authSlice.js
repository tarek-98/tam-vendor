import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  registerUser as registerUserApi,
} from "../utils/authApi";

const API_URL = "https://tager.onrender.com";

export const sendLoginCode = createAsyncThunk(
  "auth/sendLoginCode",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/vendor/send-code/${email}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData) => {
    const response = await registerUserApi(userData);
    return response.data;
  }
);


// Async thunk to verify login code
export const verifyLoginCode = createAsyncThunk(
  "auth/verifyLoginCode",
  async ({ email, code }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/vendor/validate-code/${code}/${email}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (userId) => {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: "",
    isAuthenticated: false,
    loading: false,
    error: null,
    status: "idle",
  },
  reducers: {
    logout: (state) => {
      state.email = "";
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendLoginCode.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendLoginCode.fulfilled, (state, action) => {
        state.loading = false;
        state.email = action.payload.email;
      })
      .addCase(sendLoginCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyLoginCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyLoginCode.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(verifyLoginCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.email = action.payload.email;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
