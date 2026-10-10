import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { Shield, Key, Users, MessageSquare } from "lucide-react";
import api from "../config/Api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isLogin, setUser, setIsLogin } = useAuth();
  
  const [stats, setStats] = useState({ totalUsers: 0 });
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await api.get("/user/allUsers");
      setStats({ totalUsers: res.data.data.length });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await api.get("/auth/logout");
      toast.success(res.data.message);
      setUser("");
      setIsLogin(false);
      try {
        sessionStorage.removeItem("currentChat");
      } catch (e) {}
      navigate("/");
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
    }
  };

  useEffect(() => {
    if (!isLogin && !user) {
      navigate("/login");
    } else if (user?._id) {
      fetchStats();
    }
  }, [isLogin, user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-base-200 flex items-center justify-center p-4 sm:p-8">
      <motion.div 
        className="w-full max-w-4xl bg-base-100 rounded-3xl shadow-xl p-8 sm:p-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-b border-base-300 pb-6 mb-8 gap-4">
          <h2 className="text-3xl font-bold text-primary tracking-tight">
            User Dashboard
          </h2>
          <button
            className="btn btn-error flex items-center gap-2 px-6 rounded-xl"
            onClick={handleLogout}
          >
            <AiOutlineLogout className="text-xl" /> Logout
          </button>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start mb-12">
          <div className="avatar">
            <div className="w-32 h-32 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-4 shadow-md">
              <img
                src={user?.photo || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.fullName}`}
                alt="Profile"
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 text-center sm:text-left mt-2">
            <h3 className="text-4xl font-extrabold text-base-content">{user?.fullName}</h3>
            <p className="text-xl text-base-content/60 font-medium">{user?.email}</p>
            <div className="mt-2 inline-block bg-success/10 text-success font-semibold px-4 py-1.5 rounded-full text-sm">
              Account Active
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          <div className="bg-base-200/50 p-6 rounded-2xl border border-base-300 flex items-center gap-5 hover:shadow-md transition">
            <div className="p-4 bg-primary/10 text-primary rounded-xl">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-base-content/50 font-bold uppercase tracking-wider mb-1">Network Size</p>
              <p className="text-3xl font-extrabold text-base-content">{isLoading ? "..." : stats.totalUsers}</p>
            </div>
          </div>
          
          <div className="bg-base-200/50 p-6 rounded-2xl border border-base-300 flex items-center gap-5 hover:shadow-md transition">
            <div className="p-4 bg-secondary/10 text-secondary rounded-xl">
              <MessageSquare className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-base-content/50 font-bold uppercase tracking-wider mb-1">Chat Access</p>
              <p className="text-3xl font-extrabold text-base-content">Unlimited</p>
            </div>
          </div>
        </div>

        {/* Security / Simple Placeholder */}
        <div className="bg-base-200/30 rounded-2xl p-6 border border-base-300">
          <h4 className="text-xl font-bold mb-4 flex items-center gap-2 text-base-content">
            <Shield className="w-6 h-6 text-primary" /> Account Security
          </h4>
          <p className="text-base-content/70 mb-6">
            Your account is currently protected by standard password authentication. 
            More security features (like Two-Factor Authentication and Password Updates) will be available in future updates.
          </p>
          <div className="flex gap-4">
            <button className="btn btn-primary btn-outline" disabled>
              <Key className="w-4 h-4 mr-2" /> Change Password
            </button>
          </div>
        </div>
        
      </motion.div>
    </div>
  );
};

export default Dashboard;