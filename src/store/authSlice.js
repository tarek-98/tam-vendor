import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://tager-dpsl.onrender.com";

export const sendLoginCode = createAsyncThunk(
  "auth/sendLoginCode",
  async (vendorEmail, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/vendor/send-code/${vendorEmail}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendCodePhone = createAsyncThunk(
  "auth/sendCodePhone",
  async (PhoneNumber, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/vendor/message-otp/`, {
        PhoneNumber,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/vendor/new-vendor-request`,
        userData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to verify login code
export const verifyLoginCode = createAsyncThunk(
  "auth/verifyLoginCode",
  async ({ vendorEmail, code }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/vendor/validate-code/${code}/${vendorEmail}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyRegisterCode = createAsyncThunk(
  "auth/verifyRegisterCode",
  async ({ code }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/vendor/new-vendor-validate-code/${code}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const logout = createAsyncThunk(
  "auth/logout",
  async ({ rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/vendor/logout`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    vendorEmail: "",
    vendorPhone: "",
    otp: "",
    isAuthenticated: false,
    loading: false,
    error: null,
    status: "idle",
    logoutStatus: "idle",
    vendorInfo: "",
    token: localStorage.getItem("token") || null,
  },
  reducers: {
    setPhone: (state, action) => {
      state.vendorPhone = action.payload;
    },
    setEmail: (state, action) => {
      state.vendorEmail = action.payload;
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
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
        state.status = "succeeded";
      })
      .addCase(sendLoginCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(verifyLoginCode.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(verifyLoginCode.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.status = "succeeded";
        state.vendorInfo = action.payload;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(verifyLoginCode.rejected, (state, action) => {
        state.loading = false;
        state.error = "Invalid OTP";
        state.status = "failed";
      })
      .addCase(verifyRegisterCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyRegisterCode.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.status = "succeeded";
        state.vendorInfo = action.payload;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(verifyRegisterCode.rejected, (state, action) => {
        state.loading = false;
        state.error = "Invalid OTP";
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(logout.pending, (state) => {
        state.logoutStatus = "loading";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.logoutStatus = "succeeded";
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.logoutStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const isAuthenticated = (state) => state.auth.isAuthenticated;
export const { setPhone, setOtp, setEmail, setIsAuthenticated } =
  authSlice.actions;
export default authSlice.reducer;
