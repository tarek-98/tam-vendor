import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import VendorChatInfo from "./UserChatInfo";
import UserChatInfo from "./UserChatInfo";

function ConversationItem({ conversation, index, userId, vendorId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleConversationClick = (conversationId) => {
    navigate(
      `/profile/inbox/conversations/chat/?senderId=${vendorId}&receiverId=${userId}`
    );
  };

  return (
    <li
      onClick={() => handleConversationClick(conversation._id)}
      key={conversation._id}
      className="list-group-item conversation-item mb-3"
    >
      <UserChatInfo userId={userId} conversation={conversation} />
    </li>
  );
}

export default ConversationItem;
