import React, { useState } from "react";
import "../components/login.css";
import UserProfile from "../components/user/UserProfile";

function Profile() {
  return (
    <div className="log-home">
      <UserProfile />
    </div>
  );
}

export default Profile;
