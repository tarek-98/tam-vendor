import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversations, selectConversations } from "../../store/chatSlice";
import "./inbox.css";
import ConversationItem from "./ConversationItem";

const ConversationsPage = () => {
  const dispatch = useDispatch();

  const conversations = useSelector(selectConversations);
  const { vendorInfo } = useSelector((state) => state.auth);
  const vendorId = vendorInfo && vendorInfo.data._id;

  useEffect(() => {
    dispatch(fetchConversations(vendorId));
    console.log(conversations);
  }, []);

  return (
    <div className="conversations-page">
      <h2 className="mb-5">المحادثات</h2>
      <ul className="conversation-list">
        {conversations.map((conversation, index) => (
          <ConversationItem
            index={index}
            conversation={conversation}
            userId={conversation && conversation.participants[0]}
            vendorId={vendorId}
          />
        ))}
      </ul>
    </div>
  );
};

export default ConversationsPage;
