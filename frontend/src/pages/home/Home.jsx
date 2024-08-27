import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";
import { FaChevronDown } from "react-icons/fa";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative flex flex-col md:flex-row w-[90%] md:w-fit h-[90vh] md:h-[550px] rounded-lg overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border-gray-600 border-[0.1px]">
      <button
        onClick={toggleSidebar}
        className="sticky flex items-center justify-center top-0 right-2 z-[50] p-2 text-white bg-black/10 backdrop-blur-lg border-b rounded md:hidden"
      >
        {isSidebarOpen ? (
          <FaChevronDown className="mr-2 rotate-180" />
        ) : (
          <FaChevronDown className="mr-2" />
        )}
        Friends
      </button>
      <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <MessageContainer />
    </div>
  );
};

export default Home;
