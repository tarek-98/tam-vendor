// src/features/product/productSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://tager.onrender.com";

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async ({ id, productData }) => {
    try {
      const response = await axios.post(
        `${API_URL}/products/add/${id}`,
        productData
      );
      console.log(productData);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return error.response.data;
    }
  }
);

export const addChoose = createAsyncThunk(
  "product/addChoose",
  async ({ productId, productChooseData }) => {
    try {
      const response = await axios.patch(
        `${API_URL}/products/choose/${productId}`,
        productChooseData
      );
      console.log(productChooseData);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return error.response.data;
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    newProduct: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.newProduct = action.payload;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addChoose.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addChoose.fulfilled, (state, action) => {
        state.status = "chooseAdded";
      })
      .addCase(addChoose.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
