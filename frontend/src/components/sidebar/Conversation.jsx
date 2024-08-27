import React from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const Conversation = ({ con, emoji, lastIndex }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === con._id;

  const { onlineUsers } = useSocketContext();

  const isOnline = onlineUsers.includes(con._id);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-slate-900 rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-slate-900" : ""
        }`}
        onClick={() => setSelectedConversation(con)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={con.profilePic} alt="user avatar" className="invert" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{con.fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIndex && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};
export default Conversation;
