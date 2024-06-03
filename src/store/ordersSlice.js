import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchOrders = createAsyncThunk("userSlice/fetchUser", async () => {
  const res = await fetch("http://localhost:9000/orders");
  const data = await res.json();
  return data;
});

export const ordersSlice = createSlice({
  initialState: [],
  name: "ordersSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      return (state = action.payload);
    });
  },
});

export const {} = ordersSlice.actions;
export default ordersSlice.reducer;
