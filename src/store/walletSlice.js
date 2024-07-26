import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  balance: 0,
  transactions: [],
  status: "idle",
  error: null,
};

// Fetch wallet data from API
export const fetchWalletData = createAsyncThunk(
  "wallet/fetchWalletData",
  async () => {
    const response = await axios.get("http://localhost:9000/wallet");
    return response.data;
  }
);

// Simulate transaction API call and update balance
export const makeTransaction = createAsyncThunk(
  "wallet/makeTransaction",
  async (transactionData) => {
    // Simulate transaction API call (replace with actual API endpoint)
    const response = await axios.post(
      "http://localhost:9000/transactions",
      transactionData
    );
    return response.data;
  }
);

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWalletData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWalletData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.balance = action.payload.balance;
        state.transactions = action.payload.transactions;
      })
      .addCase(fetchWalletData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(makeTransaction.fulfilled, (state, action) => {
        state.balance += action.payload.amount; // Update balance based on transaction amount
        state.transactions.push(action.payload); // Add new transaction to transactions array
      });
  },
});

export default walletSlice.reducer;
