import React, { useContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import logo_new from "../assets/logo_new.svg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { EllipsisVertical, UserRoundSearch } from 'lucide-react';

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
  } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const filteredUsers = input
    ? users.filter((user) =>
        user.fullName.toLowerCase().includes(input.toLowerCase())
      )
    : users;

  useEffect(() => {
    getUsers();
  }, [onlineUsers]);

  return (
    <div
      className={`h-full p-5 overflow-y-scroll text-[var(--text-primary)]
                  bg-[var(--bg-secondary)] border-r border-[var(--border)]
                  ${selectedUser ? "max-md:hidden" : "md:rounded-l-xl"} transition-all`}
    >
      <div className="pb-2">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex">
            <img src={logo_new} alt="logo" className="max-w-12" />
          <div className="px-0.5 pt-3">QuickChat</div>
          </div>
          <div className="icon-button relative py-2 group">
            <EllipsisVertical className="text-button dark:text-gray-100" />
            <div className="absolute hidden group-hover:block right-0 
                            bg-[var(--bg-glass)] border border-[var(--border)]
                            text-[var(--text-primary)] p-4 rounded-md z-20 top-full w-32 backdrop-blur-md">
              <p
                onClick={() => navigate("/profile")}
                className="cursor-pointer text-sm hover:text-[var(--accent-primary)]"
              >
                Edit Profile
              </p>
              <hr className="my-2 border-t border-[var(--divider)]" />
              <p
                onClick={() => logout()}
                className="cursor-pointer text-sm hover:text-[var(--accent-primary)]"
              >
                Logout
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div
          className="rounded-full flex items-center gap-2 px-4 py-3 mt-3
                     bg-[var(--bg-glass)] backdrop-blur-md border border-[var(--border)]"
        >
          <UserRoundSearch />
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="bg-transparent border-none outline-none text-[var(--text-primary)]
                       text-xs placeholder-[var(--text-secondary)] flex-1"
            placeholder="Search User..."
          />
        </div>
      </div>

      {/* User List */}
      <div className="flex flex-col mt-2">
        {filteredUsers.map((user, index) => (
          <div
            onClick={() => {
              setSelectedUser(user);
              setUnseenMessages((prev) => ({ ...prev, [user._id]: 0 }));
            }}
            key={index}
            className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer
                        hover:bg-[var(--bubble-recv)] transition-all duration-200
                        ${
                          selectedUser?._id === user._id
                            ? "bg-[var(--bubble-sent)]"
                            : ""
                        }`}
          >
            <img
              src={user?.profilePic || assets.avatar_icon}
              alt=""
              className="w-[35px] aspect-[1/1] rounded-full object-cover"
            />
            <div className="flex flex-col leading-5">
              <p className="font-medium">{user.fullName}</p>
              {onlineUsers.includes(user._id) ? (
                <span className="text-green-400 text-xs">Online</span>
              ) : (
                <span className="text-[var(--text-secondary)] text-xs">
                  Offline
                </span>
              )}
            </div>
            {unseenMessages[user._id] > 0 && (
              <p className="absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-[var(--accent-primary)]/60 text-white">
                {unseenMessages[user._id]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
