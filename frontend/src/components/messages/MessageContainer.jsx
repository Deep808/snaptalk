import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { useAuthContext } from "../../context/AuthContext";
import { getRandomEmoji } from "../../utils/emoji";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    // CLEANUP FUNCTION WHEN COMPONENT IS NOT IN VIEW IN THE BROWSER (UNMOUNTS)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="flex flex-col h-full md:min-w-[450px] overflow-hidden">
      <div className="flex-1 overflow-y-scroll md:overflow-auto flex flex-col">
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            {/* Header */}
            <div className="bg-gray-90000 border-b border-white/10 flex items-center px-4 py-4 drop-shadow-lg">
              <img
                className="w-8 h-8"
                src={selectedConversation.profilePic}
                alt=""
              />
              <span className="text-gray-300 ml-4 font-bold">
                {selectedConversation.fullName}
              </span>
            </div>

            <Messages />
          </>
        )}
      </div>
      <MessageInput className="bg-gray-800 p-2" />
    </div>
  );
};

const NoChatSelected = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>{`Welcome 👋 ${authUser.fullName} ${getRandomEmoji()}`}</p>
        <p>Select a chat to start messaging</p>
        <BiSolidMessageSquareAdd className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
export default MessageContainer;
