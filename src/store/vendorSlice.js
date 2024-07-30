import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://tager-dpsl.onrender.com";
const authorization = localStorage.getItem("token");
const Authorization = localStorage.getItem("token");

export const editLogo = createAsyncThunk(
  "vendor/editLogo",
  async ({ id, img }) => {
    fetch(`${API_URL}/vendor/logo/${id}`, {
      method: "PUT",
      body: img,
      headers: {
        authorization: `${authorization}`,
        // "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, img);
        return data;
      })
      .catch((error) => console.error("Error logging in:", error, img));
  }
);

export const deleteLogo = createAsyncThunk("vendor/deleteLogo", async (id) => {
  fetch(`${API_URL}/vendor/logo/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `${authorization}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.error("Error logging in:", error));
});

export const fetchVendors = createAsyncThunk(
  "vendors/fetchVendors",
  async (userId) => {
    const res = await fetch(`${API_URL}/client/all-followers/${userId}`, {
      headers: {
        Authorization: `${Authorization}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  }
);
export const fetchFollowers = createAsyncThunk(
  "vendors/fetchFollowers",
  async (userId) => {
    const res = await fetch(`${API_URL}/client/all-followers/${userId}`, {
      headers: {
        Authorization: `${Authorization}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  }
);

export const fetchSingleVendor = createAsyncThunk(
  "vendors/fetchSingleVendor",
  async (id) => {
    const res = await fetch(`${API_URL}/admin/vendor/${id}`);
    const data = await res.json();
    return data;
  }
);

export const delVendor = createAsyncThunk("users/delVendor", async (id) => {
  const response = await axios.get(`${API_URL}/vendor/vendor/${id}`, {
    headers: {
      Authorization: `${Authorization}`,
      // "Content-Type": "application/json",
    },
  });
  console.log(response.data);
  return response.data;
});

export const vendorSlice = createSlice({
  name: "vendorSlice",
  initialState: {
    singleVendor: [],
    vendors: [],
    followers: [],
    loading: false,
    error: null,
    status: "idle",
  },

  extraReducers: (builder) => {
    builder.addCase(editLogo.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(editLogo.fulfilled, (state, action) => {
      state.loading = false;
      state.status = action.payload;
    });
    builder.addCase(editLogo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.status = "failed";
    });
    builder.addCase(deleteLogo.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteLogo.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "succeeded";
    });
    builder.addCase(deleteLogo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.status = "failed";
    });
    builder
      .addCase(fetchSingleVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.singleVendor = "action.payload";
      })

      .addCase(delVendor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(delVendor.fulfilled, (state, action) => {
        state.status = "vendor deleted";
      })
      .addCase(delVendor.rejected, (state) => {
        state.status = "failed";
        state.error = "failed";
      });
  },
});

export const {} = vendorSlice.actions;
export const getSingleVendor = (state) => state.vendors.singleVendor;
export default vendorSlice.reducer;
