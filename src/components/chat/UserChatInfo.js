import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import logo1 from "../../assets/images/logo1.png";
import { fetchUserProfile, selectUserById } from "../../store/usersSlice";
import ChatIcon from "@mui/icons-material/Chat";

function UserChatInfo({ userId }) {
  // const { singleUser } = useSelector((state) => state.users);
  const user = useSelector((state) => selectUserById(state, userId));
  useEffect(() => {
    dispatch(fetchUserProfile(userId));
    console.log(user);
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="d-flex align-items-center">
      <img src={logo1} alt="User Avatar" className="avatar ms-3" />
      <div className="d-flex flex-column flex-grow-1">
        <div className="d-flex justify-content-between mb-1">
          <span className="conversation-name">
            {user && user.FirstName} {user && user.LastName}
          </span>
          <ChatIcon className="ms-2" />
        </div>
      </div>
    </div>
  );
}

export default UserChatInfo;
