import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://tager.onrender.com";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/vendor/new-vendor-request`,
        userData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const verifyEmailCode = createAsyncThunk(
  "user/verifyEmailCode",
  async ({ email, code }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/vendor/validate-code/${code}/${email}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchUsers = createAsyncThunk("product/fetchUser", async (id) => {
  const response = await axios.get(`http://localhost:9000/users/${id}`);
  return response.data;
});

export const usersSlice = createSlice({
  initialState: [],
  name: "usersSlice",

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        return (state = action.payload);
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(verifyEmailCode.pending, (state) => {
        state.verificationStatus = "loading";
      })
      .addCase(verifyEmailCode.fulfilled, (state, action) => {
        state.verificationStatus = "succeeded";
      })
      .addCase(verifyEmailCode.rejected, (state, action) => {
        state.verificationStatus = "failed";
        state.verificationError = action.payload;
      });
  },
});

export const {} = usersSlice.actions;
export const getUserSingle = (state) => state.userSingle;
export default usersSlice.reducer;
