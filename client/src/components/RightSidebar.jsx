// import React, { useContext, useEffect, useState } from "react";
// import assets from "../assets/assets";
// import { ChatContext } from "../../context/ChatContext";
// import { AuthContext } from "../../context/AuthContext";

// const RightSidebar = ({ isSidebarOpen }) => {
//   const { selectedUser, messages } = useContext(ChatContext);
//   const { logout, onlineUsers } = useContext(AuthContext);
//   const [msgImages, setMsgImages] = useState([]);

//   // Extract image messages only
//   useEffect(() => {
//     setMsgImages(messages.filter((msg) => msg.image).map((msg) => msg.image));
//   }, [messages]);

//   return (
//     selectedUser && (
//       <div
//         className={`relative overflow-y-scroll w-full rounded-2xl transition-all duration-300 ${
//           selectedUser ? "max-md:hidden" : ""
//         }
//         ${isSidebarOpen ? "block" : "hidden md:block"}
//         `}
//         style={{
//           background: "var(--bg-secondary)",
//           color: "var(--text-primary)",
//           border: "1px solid var(--border)",
//           backdropFilter: "blur(16px)",
//         }}
//       >
//         {/* Profile Section */}
//         <div className="pt-6 flex flex-col items-center gap-2 text-xs font-light mx-auto">
//           <div className="relative group">
//             <img
//               src={selectedUser?.profilePic || assets.avatar_icon}
//               alt="Profile"
//               className="w-20 aspect-square rounded-full border-2 border-[var(--accent-primary)] shadow-md transition-transform duration-300 group-hover:scale-105"
//             />
//             {onlineUsers.includes(selectedUser._id) && (
//               <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-[var(--bg-secondary)]"></span>
//             )}
//           </div>

//           <h2 className="px-10 text-lg font-semibold mx-auto flex items-center gap-2 text-[var(--text-primary)]">
//             {selectedUser.fullName}
//           </h2>

//           <p className="px-8 text-center text-[var(--text-secondary)] text-sm">
//             {selectedUser.bio || "Hey there 👋"}
//           </p>
//         </div>

//         <hr className="border-t my-4 border-[var(--divider)]" />

//         {/* Media Section */}
//         <div className="px-6 text-xs">
//           <p className="uppercase tracking-wide text-[var(--text-secondary)] font-medium mb-2">
//             Media
//           </p>
//           <div className="mt-2 max-h-[200px] overflow-y-auto grid grid-cols-2 gap-3">
//             {msgImages.length > 0 ? (
//               msgImages.map((url, index) => (
//                 <div
//                   key={index}
//                   onClick={() => window.open(url)}
//                   className="cursor-pointer rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
//                 >
//                   <img
//                     src={url}
//                     alt=""
//                     className="h-full w-full object-cover rounded-lg border border-[var(--border)]"
//                   />
//                 </div>
//               ))
//             ) : (
//               <p className="text-[var(--text-secondary)] text-center col-span-2 py-6">
//                 No media yet 📁
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Logout Button */}
//         <button
//           onClick={() => logout()}
//           className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 text-white font-light cursor-pointer px-6 py-2 rounded-full text-sm transition-all duration-300 shadow-lg hover:shadow-[0_0_10px_var(--accent-primary)]"
//         >
//           Logout
//         </button>
//       </div>
//     )
//   );
// };

// export default RightSidebar;


import React, { useContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { ChevronLeft } from "lucide-react";

const RightSidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { selectedUser, messages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const [msgImages, setMsgImages] = useState([]);

  useEffect(() => {
    setMsgImages(messages.filter((msg) => msg.image).map((msg) => msg.image));
  }, [messages]);

  if (!selectedUser) return null;

  return (
    <div
      className={`absolute md:static top-0 right-0 h-full w-full md:w-auto rounded-2xl overflow-y-scroll
        border border-[var(--border)] transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
      `}
      style={{
        background: "var(--bg-secondary)",
        color: "var(--text-primary)",
        backdropFilter: "blur(16px)",
      }}
    >
      {/* 🔙 Mobile Back Button */}
      <div className="flex items-center gap-2 p-3 md:hidden border-b border-[var(--border)]">
        <ChevronLeft
          onClick={() => setIsSidebarOpen(false)}
          className="cursor-pointer text-[var(--text-primary)]"
          size={24}
        />
        <p className="text-lg font-medium">User Info</p>
      </div>

      {/* Profile Section */}
      <div className="pt-6 flex flex-col items-center gap-2 text-xs font-light mx-auto">
        <div className="relative group">
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            alt="Profile"
            className="w-20 aspect-square rounded-full border-2 border-[var(--accent-primary)] shadow-md transition-transform duration-300 group-hover:scale-105"
          />
          {onlineUsers.includes(selectedUser._id) && (
            <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-[var(--bg-secondary)]"></span>
          )}
        </div>

        <h2 className="px-10 text-lg font-semibold mx-auto flex items-center gap-2 text-[var(--text-primary)]">
          {selectedUser.fullName}
        </h2>

        <p className="px-8 text-center text-[var(--text-secondary)] text-sm">
          {selectedUser.bio || "Hey there 👋"}
        </p>
      </div>

      <hr className="border-t my-4 border-[var(--divider)]" />

      {/* Media Section */}
      <div className="px-6 text-xs">
        <p className="uppercase tracking-wide text-[var(--text-secondary)] font-medium mb-2">
          Media
        </p>
        <div className="mt-2 max-h-[200px] overflow-y-auto grid grid-cols-2 gap-3">
          {msgImages.length > 0 ? (
            msgImages.map((url, index) => (
              <div
                key={index}
                onClick={() => window.open(url)}
                className="cursor-pointer rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={url}
                  alt=""
                  className="h-full w-full object-cover rounded-lg border border-[var(--border)]"
                />
              </div>
            ))
          ) : (
            <p className="text-[var(--text-secondary)] text-center col-span-2 py-6">
              No media yet 📁
            </p>
          )}
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={() => logout()}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 text-white font-light cursor-pointer px-6 py-2 rounded-full text-sm transition-all duration-300 shadow-lg hover:shadow-[0_0_10px_var(--accent-primary)]"
      >
        Logout
      </button>
    </div>
  );
};

export default RightSidebar;

