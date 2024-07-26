import React from "react";
import { Link } from "react-router-dom";
import "./inbox.css";

function Inbox() {
  return (
    <div className="main-inbox">
      <div className="container">
        <div className="notification">
          <Link to="/inbox/notifications">الاشعارات</Link>
          <span className="float"></span>
        </div>
        <div className="chat">
          <Link to="/profile/chat">الرسائل</Link>
          <span className="float"></span>
        </div>
      </div>
    </div>
  );
}

export default Inbox;
