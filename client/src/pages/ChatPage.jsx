import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Chatting from "../components/Chatting";
import api from "../config/Api";
import socketAPI from "../config/WebSocket";
import toast from "react-hot-toast";
import { Search } from "lucide-react";

const ChatPage = () => {
  const { user, isLogin } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedFriend, setSelectedFriend] = useState("");

  const fetchAllUser = async () => {
    try {
      const res = await api.get("/user/allUsers");
      setUsers(res.data.data);
    } catch (error) {
      console.error("Error during fetch users:", error);
      toast.error(
        `Error : ${error.response?.status || error.message} | ${
          error.response?.data?.message || ""
        }`
      );
    }
  };

  useEffect(() => {
    if (!user && !isLogin) {
      navigate("/login");
    } else if (user?._id) {
      fetchAllUser();
      socketAPI.emit("CreatePath", user._id);
    }

    return () => {
      if (user?._id) socketAPI.emit("DeletePath", user._id);
      try {
        sessionStorage.removeItem("currentChat");
      } catch (e) {}
    };
  }, [user, isLogin, navigate]);

  const moveUserToTop = (userId, message) => {
    setUsers((prev) => {
      if (!Array.isArray(prev)) return prev;
      const idx = prev.findIndex((u) => u._id === userId);
      if (idx === -1) return prev;
      const newArr = [...prev];
      const [item] = newArr.splice(idx, 1);
      const updated = { ...item };
      if (message) {
        const snippet = message.text ? message.text.slice(0, 80) : "";
        updated.lastMessage = snippet;
        updated.lastTimestamp = message.timestamp || new Date().toISOString();
      }
      newArr.unshift(updated);
      return newArr;
    });
  };

  const format_date = (ISO_Date) => {
    if (!ISO_Date) return "";
    const date = new Date(ISO_Date);
    const today = new Date();
    const isToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    if (isToday) {
      return date.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: '2-digit', minute:'2-digit' });
    }
    return date.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", day: '2-digit', month: 'short' });
  };

  useEffect(() => {
    const handleAlert = async (payload) => {
      if (!payload || !payload.from) return;
      const exists = Array.isArray(users) && users.find((u) => u._id === payload.from);
      if (!exists) {
        const placeholder = {
          _id: payload.from,
          fullName: "Unknown User",
          photo: "",
          lastMessage: payload.text ? payload.text.slice(0, 80) : "",
          lastTimestamp: payload.timestamp || new Date().toISOString(),
        };
        setUsers((prev) => {
          if (!Array.isArray(prev)) return [placeholder];
          const filtered = prev.filter((u) => u._id !== placeholder._id);
          return [placeholder, ...filtered];
        });
        return;
      }
      moveUserToTop(payload.from, payload);
    };

    socketAPI.on("NewMessageAlert", handleAlert);
    return () => {
      socketAPI.off("NewMessageAlert", handleAlert);
    };
  }, [socketAPI, users]);

  const filteredUsers = Array.isArray(users) ? users.filter((u) => 
    (u.fullName || "").toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  return (
    <>
      <div className="h-screen bg-base-100 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/4 border-r border-base-300 bg-base-200/50 pt-5 flex flex-col h-full shadow-lg z-10">
          {/* User Profile Area */}
          <div className="px-5 mb-4">
            <div className="flex gap-4 items-center">
              <div className="avatar">
                <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={user?.photo || "https://api.dicebear.com/7.x/avataaars/svg?seed=fallback"} alt="User profile" />
                </div>
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-lg font-bold text-base-content truncate">{user?.fullName}</span>
                <span className="text-xs text-base-content/70 truncate">{user?.email}</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="px-5 mb-2">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search friends..." 
                className="input input-sm input-bordered w-full rounded-full pl-10 bg-base-100 focus:outline-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="w-4 h-4 absolute left-4 top-2.5 text-base-content/50" />
            </div>
          </div>

          <div className="divider my-0 opacity-50"></div>

          {/* Friend List */}
          <div id="Firend_List" className="flex-1 overflow-y-auto px-3 pb-4 space-y-1 mt-2">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((element) => {
                const isSelected = selectedFriend?._id === element._id;
                return (
                  <div
                    key={element._id}
                    className={`group flex flex-col gap-1 p-3 rounded-2xl cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "bg-primary text-primary-content shadow-md"
                        : "hover:bg-base-300 text-base-content"
                    }`}
                    onClick={() => {
                      setSelectedFriend(element);
                      try {
                        sessionStorage.setItem("currentChat", element._id);
                      } catch (e) {}
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex gap-3 items-center overflow-hidden">
                        <img
                          src={element.photo || `https://api.dicebear.com/7.x/initials/svg?seed=${element.fullName}`}
                          alt=""
                          className={`w-10 h-10 rounded-full object-cover border ${isSelected ? "border-primary-content/50" : "border-base-300"}`}
                        />
                        <span className="font-semibold truncate">{element.fullName}</span>
                      </div>
                      <div className={`text-xs whitespace-nowrap ml-2 ${isSelected ? "text-primary-content/80" : "text-base-content/50"}`}>
                        {element.lastTimestamp ? format_date(element.lastTimestamp) : ""}
                      </div>
                    </div>

                    <div className={`text-sm truncate pl-14 ${isSelected ? "text-primary-content/90" : "text-base-content/60"}`}>
                      {element.lastMessage || "Say Hi! 👋"}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-base-content/50 mt-10 text-sm">
                No friends found.
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="w-3/4 h-full bg-base-100 flex flex-col relative">
          <Chatting friend={selectedFriend} onNewMessage={(userId, msg) => moveUserToTop(userId, msg)} />
        </div>
      </div>
    </>
  );
};

export default ChatPage;