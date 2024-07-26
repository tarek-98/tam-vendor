import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";
import axios from "axios";

const API_URL = "https://tager.onrender.com";
const Authorization = localStorage.getItem("token");

// for getting the products list with limited numbers
export const fetchAsyncProductsByVendors = createAsyncThunk(
  "products/fetchAsyncProductsByVendors",
  async (id) => {
    const response = await axios.get(`${API_URL}/products/products/${id}`, {
      headers: {
        authorization: `${Authorization}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    return response.data;
  }
);

// getting the single product data also
export const fetchAsyncProductSingle = createAsyncThunk(
  "product-single/fetch",
  async (id) => {
    // const response = await fetch(`${API_URL}/products/product/${id}`);
    const response = await fetch(
      `${API_URL}/client/view-productByProductId/${id}`
    );
    const data = await response.json();
    return data;
  }
);
const initialState = {
  productSingle: [],
  productSingleStatus: STATUS.IDLE,
  vendorProducts: [],
  vendorProductsStatus: STATUS.IDLE,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncProductSingle.pending, (state, action) => {
        state.productSingleStatus = STATUS.LOADING;
      })

      .addCase(fetchAsyncProductSingle.fulfilled, (state, action) => {
        state.productSingle = action.payload;
        state.productSingleStatus = STATUS.SUCCEEDED;
      })

      .addCase(fetchAsyncProductSingle.rejected, (state, action) => {
        state.productSingleStatus = STATUS.FAILED;
      })

      .addCase(fetchAsyncProductsByVendors.pending, (state, action) => {
        state.vendorProductsStatus = STATUS.LOADING;
      })

      .addCase(fetchAsyncProductsByVendors.fulfilled, (state, action) => {
        state.vendorProducts = action.payload.data;
        state.vendorProductsStatus = STATUS.SUCCEEDED;
      })

      .addCase(fetchAsyncProductsByVendors.rejected, (state, action) => {
        state.vendorProductsStatus = STATUS.FAILED;
      });
  },
});

export const getAllVendorProducts = (state) => state.product.vendorProducts;
export const getAllVendorProductsStatus = (state) =>
  state.product.vendorProductsStatus;
export const getProductSingle = (state) => state.product.productSingle;
export const getSingleProductStatus = (state) =>
  state.product.productSingleStatus;
export default productSlice.reducer;
