import React, { useState } from "react";
import { FaUserEdit, FaPhoneAlt, FaExchangeAlt, FaTrash, FaEllipsisV } from "react-icons/fa";

const UserActionMenu = ({ user, handleChangeRole, openEdit, handleDeleteUser }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Three-dot button */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <FaEllipsisV />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 z-50">
          <button
            onClick={() => handleChangeRole(user.email, user.role === "student" ? "tutor" : "student")}
            className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaExchangeAlt /> Change Role
          </button>

          <button
            onClick={() => openEdit("name", user)}
            className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaUserEdit /> Edit Name
          </button>

          <button
            onClick={() => openEdit("phoneNumber", user)}
            className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaPhoneAlt /> Edit Phone
          </button>

          <button
            onClick={() => handleDeleteUser(user.email)}
            className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-700"
          >
            <FaTrash /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default UserActionMenu;
