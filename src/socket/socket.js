import { io } from "socket.io-client";

const socket = io("https://tager-dpsl.onrender.com"); // Your backend server URL

export default socket;
