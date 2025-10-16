import React, { useContext , useEffect} from 'react'
import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import RightSidebar from '../components/RightSidebar'
import ChatContainer from '../components/ChatContainer'
import { ChatContext } from '../../context/ChatContext'

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };
  window.addEventListener("resize", handleResize);
  handleResize();
  return () => window.removeEventListener("resize", handleResize);
}, []);


  return (
    <div
      className="border w-full h-screen sm:px-[15%] sm:py-[5%]"
      style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      <div
        className={`backdrop-glass border-2 border-[var(--border)] rounded-2xl overflow-hidden h-full grid relative
          ${
            selectedUser
              ? "grid-cols-1 md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]"
              : "grid-cols-1 md:grid-cols-[1fr_2fr]"
          }`}
      >
        {/* LEFT SIDEBAR */}
        <Sidebar />

        {/* MIDDLE CHAT AREA */}
        <ChatContainer 
        setIsSidebarOpen={setIsSidebarOpen} 
        isSidebarOpen={isSidebarOpen} />

        {/* RIGHT SIDEBAR */}
        {selectedUser && 
        <RightSidebar 
        isSidebarOpen={isSidebarOpen}
         setIsSidebarOpen={setIsSidebarOpen}  />}
      </div>
    </div>
  );
};

export default HomePage;
