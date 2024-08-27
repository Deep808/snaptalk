import React from "react";
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emoji";

const Conversations = ({ setIsSidebarOpen }) => {
  const { conversations, loading } = useGetConversations();

  return (
    <div
      onClick={() => setIsSidebarOpen(false)}
      className="pb-[10em] md:py-2 text-[0.8em] md:text-base flex-1 overflow-y-auto"
    >
      {conversations.map((con, index) => (
        <Conversation
          key={con._id}
          con={con}
          emoji={getRandomEmoji()}
          lastIndex={index === conversations.length - 1}
        />
      ))}

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  );
};

export default Conversations;
