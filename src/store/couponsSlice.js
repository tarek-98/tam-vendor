// src/features/coupons/couponsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCoupons = createAsyncThunk(
  "coupons/fetchCoupons",
  async () => {
    const response = await axios.get("http://localhost:9000/coupons");
    return response.data;
  }
);

export const addCoupon = createAsyncThunk(
  "coupons/addCoupon",
  async (newCoupon) => {
    const response = await axios.post(
      "http://localhost:9000/coupons",
      newCoupon
    );
    return response.data;
  }
);

export const updateCoupon = createAsyncThunk(
  "coupons/updateCoupon",
  async (updatedCoupon) => {
    const response = await axios.put(
      `http://localhost:9000/coupons/${updatedCoupon.id}`,
      updatedCoupon
    );
    return response.data;
  }
);

export const deleteCoupon = createAsyncThunk(
  "coupons/deleteCoupon",
  async (couponId) => {
    await axios.delete(`http://localhost:9000/coupons/${couponId}`);
    return couponId;
  }
);

const couponsSlice = createSlice({
  name: "coupons",
  initialState: {
    coupons: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoupons.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coupons = action.payload;
      })
      .addCase(fetchCoupons.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addCoupon.fulfilled, (state, action) => {
        state.coupons.push(action.payload);
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        const index = state.coupons.findIndex(
          (coupon) => coupon.id === action.payload.id
        );
        state.coupons[index] = action.payload;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.coupons = state.coupons.filter(
          (coupon) => coupon.id !== action.payload
        );
      });
  },
});

export default couponsSlice.reducer;
