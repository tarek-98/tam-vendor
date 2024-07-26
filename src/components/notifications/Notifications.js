import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearNotifications,
  fetchNotifications,
} from "../../store/notificationSlice";

function NotificationContent() {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );
  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  return (
    <div>
      <button onClick={() => dispatch(clearNotifications())}>
        Clear Notifications
      </button>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationContent;
