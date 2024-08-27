import React from "react";
import { IoLogOutOutline } from "react-icons/io5";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="mt-auto">
      {loading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <IoLogOutOutline
          onClick={logout}
          className="w-6 h-6 text-white cursor-pointer"
        />
      )}
    </div>
  );
};

export default LogoutButton;
