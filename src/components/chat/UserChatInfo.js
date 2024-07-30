import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import logo1 from "../../assets/images/logo1.png";

function UserChatInfo({ userId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="d-flex align-items-center">
      <img src={logo1} alt="User Avatar" className="avatar ms-3" />
      <div className="d-flex flex-column flex-grow-1">
        <div className="d-flex justify-content-between mb-1">
          <span className="conversation-name">
            <span>{userId}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default UserChatInfo;
