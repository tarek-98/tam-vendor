import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAddress = createAsyncThunk("user/fetchAddress", async () => {
  const response = await axios.get("http://localhost:9000/address");
  return response.data;
});
export const fetchSingleAddress = createAsyncThunk(
  "user/fetchSingleAddress",
  async (id) => {
    const response = await axios.get(`http://localhost:9000/address/${id}`);
    return response.data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [],
    singleAddress: [],
    defaultAddress: [],
  },
  reducers: {
    DefaultAddress: (state, action) => {
      state.defaultAddress = action.payload;
    },
    clearDefaultAddress: (state, action) => {
      state.defaultAddress = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
      })
      .addCase(fetchSingleAddress.fulfilled, (state, action) => {
        state.singleAddress = action.payload;
      });
  },
});

export const { DefaultAddress, clearDefaultAddress } = addressSlice.actions;
export const getAllAddress = (state) => state.address.addresses;
export const getSingleAddress = (state) => state.address.singleAddress;
export default addressSlice.reducer;
