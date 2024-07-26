import React, { useState } from "react";
import "../components/login.css";
import UserProfile from "../components/user/UserProfile";

function Profile({ socket }) {
  return (
    <div className="log-home">
      <UserProfile socket={socket} />
    </div>
  );
}

export default Profile;
