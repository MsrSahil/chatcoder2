import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Chatting from "../components/Chatting";
import api from "../config/Api";
import socketAPI from "../config/WebSocket";
import toast from "react-hot-toast";

const ChatPage = () => {
  const { user, isLogin } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const [selectedFriend, setSelectedFriend] = useState("");

  const fetchAllUser = async () => {
    try {
      const res = await api.get("/user/allUsers");
      setUsers(res.data.data);
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error(
        `Error : ${error.response?.status || error.message} | ${
          error.response?.data.message || ""
        }`
      );
    }
  };

  useEffect(() => {
    if (!user && !isLogin) {
      navigate("/login");
    } else {
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

  // Move a user to the top of the users list and optionally update last message/timestamp
  const moveUserToTop = (userId, message) => {
    setUsers((prev) => {
      if (!Array.isArray(prev)) return prev;
      const idx = prev.findIndex((u) => u._id === userId);
      // If user not found, don't change order. (Could insert if desired.)
      if (idx === -1) return prev;
      const newArr = [...prev];
      const [item] = newArr.splice(idx, 1);
      // create a shallow copy to avoid mutating original state objects
      const updated = { ...item };
      // Update last message snippet and timestamp if provided
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
    return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  };

  // Listen for lightweight socket alerts for messages (so non-open chats can be reordered)
  useEffect(() => {
    const handleAlert = async (payload) => {
      // payload: { from, text, timestamp }
      if (!payload || !payload.from) return;

      // If the user isn't in our current list, request that single user from server
      const exists = Array.isArray(users) && users.find((u) => u._id === payload.from);
      if (!exists) {
        try {
          const res = await api.get(`/user/get/${payload.from}`);
          const single = res.data.data;
          // insert at top with last message/timestamp
          setUsers((prev) => {
            if (!Array.isArray(prev)) return [single];
            // avoid duplicate if another fetch/populate happened
            const filtered = prev.filter((u) => u._id !== single._id);
            const snippet = payload.text ? payload.text.slice(0, 80) : "";
            single.lastMessage = snippet;
            single.lastTimestamp = payload.timestamp || new Date().toISOString();
            return [single, ...filtered];
          });
          return; // already moved/inserted
        } catch (e) {
          // If fetching single user failed, fall back to no-op move
        }
      }

      moveUserToTop(payload.from, payload);
    };

    socketAPI.on("NewMessageAlert", handleAlert);
    return () => {
      socketAPI.off("NewMessageAlert", handleAlert);
    };
  }, [socketAPI, users]);

  return (
    <>
      <div className="min-h-screen bg-base-100 flex">
        <div className="w-3/14 border px-5 pt-5">
          <div className="flex gap-3 items-center">
            <img src={user.photo} alt="" className="w-14 h-14 rounded" />
            <div className="flex flex-col">
              <span className="text-2xl text-primary">{user.fullName}</span>
              <span className="text-sm text-secondary">{user.email}</span>
            </div>
          </div>
          <div className="divider divider-primary pt-5"></div>
          <div id="Firend_List">
            {users &&
              users.map((element) => (
                <div
                  key={element._id}
                  className="group flex flex-col gap-1 m-3 bg-secondary p-2 text-secondary-content rounded hover:bg-primary hover:text-primary-content cursor-pointer"
                  onClick={() => {
                    setSelectedFriend(element);
                    // mark the currently open chat so notification code can suppress alerts
                    try {
                      sessionStorage.setItem("currentChat", element._id);
                    } catch (e) {}
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-3 items-center">
                      <img
                        src={element.photo}
                        alt=""
                        className="w-12 h-12 rounded-full border border-primary group-hover:border-error"
                      />
                      <span className="text-lg">{element.fullName}</span>
                    </div>
                    <div className="text-xs opacity-60">
                      {element.lastTimestamp ? format_date(element.lastTimestamp) : ""}
                    </div>
                  </div>

                  <div className="text-sm text-gray-400 truncate pl-16">
                    {element.lastMessage || "Say Hi!"}
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="w-11/14 border">
          <Chatting friend={selectedFriend} onNewMessage={(userId, msg) => moveUserToTop(userId, msg)} />
        </div>
      </div>
    </>
  );
};

export default ChatPage;