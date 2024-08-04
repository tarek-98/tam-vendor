import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://tager-dpsl.onrender.com";
const Authorization = localStorage.getItem("token");

export const getUsers = createAsyncThunk("users/getUsers", async (id) => {
  const response = await axios.get(`${API_URL}/admin/all-clients/${id}`, {
    headers: {
      Authorization: `${Authorization}`,
      // "Content-Type": "application/json",
    },
  });
  console.log(response.data);
  return response.data;
});

export const fetchUserProfile = createAsyncThunk(
  "users/fetchUserProfile",
  async (id) => {
    const response = await axios.get(`${API_URL}/client/client-profile/${id}`, {
      headers: {
        Authorization: `${Authorization}`,
        // "Content-Type": "application/json",
      },
    });
    return response.data;
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    singleUser: [],
    users: [],
    loading: false,
    error: null,
    status: "idle",
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.singleUser = action.payload;
        const user = action.payload.data;
        state[user && user._id] = user;
        state.status = "succeded";
      })
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload.data;
        state.loading = false;
      })
      .addCase(getUsers.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {} = usersSlice.actions;
export const selectUserById = (state, userId) => state.users[userId];
export const getUserSingle = (state) => state.userSingle;
export default usersSlice.reducer;
