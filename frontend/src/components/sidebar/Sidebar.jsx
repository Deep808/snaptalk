import React from "react";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = ({ isOpen, setIsSidebarOpen }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full my-10 md:my-0 h-screen md:w-auto md:h-full z-40 bg-black border-b border-gray-600 p-4 flex flex-col 
        transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "-translate-y-[110%]"
        }
        md:relative md:translate-y-0 md:w-64 md:border-none`}
    >
      <SearchInput setIsSidebarOpen={setIsSidebarOpen} />
      <div className="divider px-3"></div>
      <Conversations setIsSidebarOpen={setIsSidebarOpen} />
      <div className="absolute right-6 z-[60] bg-white/10 backdrop-blur-lg p-4 w-auto h-auto rounded-full bottom-[10em] md:bottom-6 md:right-10">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;
