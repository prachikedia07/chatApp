import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import toast from "react-hot-toast";
import {connect, io} from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({ children })=>{

const [token, setToken] = useState(localStorage.getItem("token"));
const [authUser, setAuthUser] = useState(null)
const [onlineUsers, setOnlineUsers] = useState([]);
const [socket, setSocket] = useState(null);

//check if user is authenticated and if so, set the user data and connect the socket
const checkAuth = async()=>{
    try {
        const {data} = await axios.get("/api/auth/check");
        if(data.success){
            setAuthUser(data.user)
            connectSocket(data.user)
        }
    } catch (error) {
        toast.error(error.message)
    }
}

//login function to handle user authentication and socket connection

const login = async (state, credentials)=>{
    try {
        const {data} = await axios.post(`/api/auth/${state}`, credentials);
        if(data.success){
            setAuthUser(data.userData);
            connectSocket(data.userData);
            axios.defaults.headers.common["token"] = data.token;
            setToken(data.token);
            localStorage.setItem("token", data.token)
            toast.success(data.message)
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
    }
}

//logout function to handle user logout and socket disconnection

// const logout = async ()=>{
//     localStorage.removeItem("token");
//     setToken(null);
//     setAuthUser(null);
//     setOnlineUsers([]);
//     axios.defaults.headers.common["token"] = null;
//     toast.success("Logged out successfully")
//     socket.disconnect();
// }

const logout = async () => {
  if (socket) {
    socket.emit("manualLogout"); // 👈 tell backend immediately
    socket.disconnect();
    setSocket(null);
  }
  localStorage.removeItem("token");
  setToken(null);
  setAuthUser(null);
  setOnlineUsers([]);
  axios.defaults.headers.common["token"] = null;
  toast.success("Logged out successfully");
};


//update profile fucntion to handle user profile updates
const updateProfile = async (body)=>{
    console.log("Sending update-profile request:", body); // 🧩 add this
    try {
        const {data} = await axios.put("/api/auth/update-profile", body)
         console.log("update-profile response:", data); // 🧩 add this
           if(data.success){
            setAuthUser(data.user);
            toast.success("Profile updated successfully")
           } 
    } catch (error) {
        toast.error(error.message)
    }
}

// //connect socket function to handle socket connection and online users updates  
// const connectSocket = (userData)=>{
//     if(!userData) return;
//     const newSocket = io(backendUrl,{
//         query: {
//             userId: userData._id,
//         }
//     });
//     newSocket.connect();
//     setSocket(newSocket);

//     newSocket.on("getOnlineUsers", (userIds)=>{
//         setOnlineUsers(userIds);
//     })
// }

// connect socket function to handle socket connection and online users updates  
const connectSocket = (userData) => {
  if (!userData) return;

  // avoid duplicate sockets
  if (socket?.connected) return;

  const newSocket = io(backendUrl, {
    query: { userId: userData._id },
    transports: ["websocket"], // ensures stable connection
    reconnection: true,
  });

  setSocket(newSocket);

  newSocket.on("connect", () => {
    console.log("✅ Socket connected:", newSocket.id);
  });

  newSocket.on("disconnect", (reason) => {
    console.log("⚠️ Socket disconnected:", reason);
  });

  newSocket.on("getOnlineUsers", (userIds) => {
    setOnlineUsers(userIds);
  });
};


useEffect(()=>{
if(token){
    axios.defaults.headers.common["token"] = token;
    checkAuth();
}
},[])

    const value = {
        axios,
        authUser,
        onlineUsers,
        socket,
        login,
        logout,
        updateProfile
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}