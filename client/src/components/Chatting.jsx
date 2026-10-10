import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Send, MessageSquare } from "lucide-react";
import api from "../config/Api";
import toast from "react-hot-toast";
import socketAPI from "../config/WebSocket";
import { motion } from "framer-motion";

const Chatting = ({ friend, onNewMessage }) => {
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [ReceiverID, setReceiverID] = useState("");
  const [SenderID, setSenderID] = useState("");

  const bottom = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      SendNewMessage();
    }
  };

  const SendNewMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const messagePack = {
        text: newMessage.trim(),
        timestamp: new Date().toISOString(),
      };

      if (socketAPI.connected) {
        socketAPI.emit("SendMessage", {
          from: SenderID,
          to: ReceiverID,
          text: messagePack.text,
          timestamp: messagePack.timestamp,
        });
      } else {
        console.warn("Socket not connected. Message not sent via socket.");
      }

      // Optimistic update
      const tempMessage = {
        senderID: SenderID,
        receiverID: ReceiverID,
        text: messagePack.text,
        timestamp: messagePack.timestamp,
        isSending: true,
      };
      
      setMessages((prev) => [...prev, tempMessage]);
      setNewMessage("");

      const res = await api.post(`/user/sendMessage/${ReceiverID}`, {
        messagePack,
      });
      const saved = res.data.data;
      
      // Replace optimistic message with saved message
      setMessages((prev) => 
        prev.map(msg => msg === tempMessage ? saved : msg)
      );

      try {
        onNewMessage && onNewMessage(ReceiverID, saved);
      } catch (e) {}
      
    } catch (error) {
      console.error("Error sending Message:", error);
      toast.error("Failed to send message.");
      // Remove optimistic message on failure
      setMessages((prev) => prev.filter(msg => !msg.isSending));
    }
  };

  const format_time = (ISO_Date) => {
    if (!ISO_Date) return "";
    const date = new Date(ISO_Date);
    return date.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: '2-digit', minute:'2-digit' });
  };

  const fetchMessages = async () => {
    try {
      const res = await api.get(`/user/receiveMessage/${friend._id}`);
      setMessages(res.data.data);
    } catch (error) {
      console.error("Error fetching Chat:", error);
      toast.error("Could not load messages.");
    }
  };

  const handleReceiveMessage = (msgPacket) => {
    if (msgPacket.from === ReceiverID) {
      setMessages((prev) => [
        ...prev,
        {
          ...msgPacket,
          senderID: msgPacket.from,
          receiverID: msgPacket.to,
          text: msgPacket.text,
          timestamp: msgPacket.timestamp,
        },
      ]);
      try {
        onNewMessage && onNewMessage(msgPacket.from, msgPacket);
      } catch (e) {}
    }
  };

  const scrollToBottom = () => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socketAPI.on("ReceiveMessage", handleReceiveMessage);
    return () => {
      socketAPI.off("ReceiveMessage", handleReceiveMessage);
    };
  }, [ReceiverID]);

  useEffect(() => {
    if (user?._id) {
      setSenderID(user._id);
    }
    if (friend?._id) {
      setReceiverID(friend._id);
      fetchMessages();
    } else {
      setReceiverID("");
    }
  }, [user?._id, friend?._id]);

  if (!ReceiverID) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full bg-base-100/50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center text-base-content/40"
        >
          <MessageSquare className="w-24 h-24 mb-4 opacity-50" />
          <h2 className="text-2xl font-bold mb-2">Your Messages</h2>
          <p>Select a friend from the list to start chatting</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full bg-base-100 relative">
      {/* Chat Header */}
      <div className="h-16 flex items-center px-6 bg-base-100 border-b border-base-300 shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 h-10 rounded-full">
              <img src={friend.photo || `https://api.dicebear.com/7.x/initials/svg?seed=${friend.fullName}`} alt="friend" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base-content">{friend.fullName}</span>
            <span className="text-xs text-base-content/60">Online</span>
          </div>
        </div>
      </div>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-200/30">
        {messages.length > 0 ? (
          messages.map((message, index) => {
            const senderIdStr = message.senderID?._id || message.senderID;
            const isSender = senderIdStr === SenderID;
            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={index}
                className={`flex w-full ${isSender ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] md:max-w-[60%] flex flex-col ${
                    isSender ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2.5 shadow-sm text-sm whitespace-pre-wrap break-words ${
                      isSender
                        ? "bg-primary text-primary-content rounded-2xl rounded-tr-sm"
                        : "bg-base-100 text-base-content rounded-2xl rounded-tl-sm border border-base-200"
                    } ${message.isSending ? "opacity-70" : ""}`}
                  >
                    {message.text}
                  </div>
                  <div className="text-[10px] text-base-content/50 mt-1 px-1">
                    {format_time(message.timestamp)}
                    {message.isSending && " • Sending..."}
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-base-content/40 italic">
            <div className="bg-base-200 px-4 py-2 rounded-full text-sm">
              Say 👋 to start the conversation!
            </div>
          </div>
        )}
        <div ref={bottom} className="h-1"></div>
      </div>

      {/* Input Box */}
      <div className="p-4 bg-base-100 border-t border-base-300 shrink-0">
        <div className="flex items-end gap-2 max-w-4xl mx-auto relative">
          <textarea
            name="newMessage"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="textarea textarea-bordered bg-base-200 text-base-content w-full resize-none min-h-[48px] max-h-[120px] focus:outline-primary rounded-2xl py-3 pr-14"
            placeholder="Type your message..."
            autoComplete="off"
            rows={1}
          />
          <button 
            className={`btn btn-circle btn-primary absolute right-2 bottom-2 h-10 w-10 min-h-0 ${!newMessage.trim() ? "btn-disabled opacity-50" : "shadow-md"}`} 
            onClick={SendNewMessage}
            disabled={!newMessage.trim()}
          >
            <Send className="w-5 h-5 -ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatting;
