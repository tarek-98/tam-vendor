import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import logo1 from "../../assets/images/logo1.png";
import { fetchUserProfile, selectUserById } from "../../store/usersSlice";

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
            <span>
              {user && user.FirstName} {user && user.LastName}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default UserChatInfo;
