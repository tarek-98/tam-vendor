import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://tager.onrender.com";

const sendMessage = async ({ senderId, receiverId, message }) => {
  const response = await axios.post(
    `${API_URL}/message/send/${receiverId}`,
    { message },
    {
      params: { senderId },
    }
  );
  return response.data;
};
const fetchMessages = async (senderId, receiverId) => {
  const response = await axios.get(`${API_URL}/message/${receiverId}`, {
    params: { senderId },
  });
  return response.data;
};

export const sendMessageAsync = createAsyncThunk(
  "chat/sendMessage",
  async ({ senderId, receiverId, message }) => {
    const response = await sendMessage({ senderId, receiverId, message });
    return response;
  }
);

export const fetchMessagesAsync = createAsyncThunk(
  "chat/fetchMessages",
  async ({ senderId, receiverId }) => {
    const response = await fetchMessages(senderId, receiverId);
    return response;
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageAsync.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      })
      .addCase(fetchMessagesAsync.fulfilled, (state, action) => {
        state.messages = action.payload;
      });
  },
});

export const selectMessages = (state) => state.chat.messages;

export default chatSlice.reducer;
