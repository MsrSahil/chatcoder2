import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import api from "../config/Api";
import toast from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isLogin, setUser, setIsLogin } = useAuth();
  const [isTwoStepEnable, setIsTwoStepEnable] = useState(
    JSON.parse(user?.TwoFactorAuth) || false
  );
  const [isLoading, setIsLoading] = useState(true);

  const Toggle2StepVerification = () => {
    // add Backend API Call on route PATCH /user/toggleVerification
  };

  const handleLogout = async () => {
    try {
      const res = await api.get("/auth/logout");
      toast.success(res.data.message);
      setUser("");
      setIsLogin(false);
      sessionStorage.removeItem("ChatUser");
      navigate("/");
    } catch (error) {
      toast.error(
        `Error : ${error.response?.status || error.message} | ${
          error.response?.data.message || ""
        }`
      );
    }
  };

  useEffect(() => {
    // Simulate data fetch delay for skeleton
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    Toggle2StepVerification();
  }, [isTwoStepEnable]);

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-base-200 via-base-100 to-base-200 flex items-center justify-center p-4 animate-fadeIn">
      <div className="w-full max-w-5xl bg-base-100 rounded-xl shadow-xl p-6 flex flex-col gap-6 transition-all duration-300">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-2xl font-bold text-primary tracking-wide">
            User Dashboard
          </h2>
          <button
            className="btn btn-error btn-sm sm:btn-md flex items-center gap-2"
            onClick={handleLogout}
          >
            <AiOutlineLogout className="text-lg" /> Logout
          </button>
        </div>

        {/* Profile Section */}
        {isLoading ? (
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start animate-pulse">
            <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-base-300" />
            <div className="flex flex-col gap-2 w-full max-w-xs">
              <div className="h-5 bg-base-300 rounded w-3/4"></div>
              <div className="h-4 bg-base-200 rounded w-1/2"></div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            <img
              src={user.photo}
              alt="profile"
              className="h-24 w-24 sm:h-28 sm:w-28 rounded-full object-cover shadow-md ring-2 ring-primary"
            />
            <div className="flex flex-col gap-1 text-center sm:text-left">
              <span className="text-2xl font-semibold text-primary-content">
                {user.fullName}
              </span>
              <span className="text-lg text-base-content/70">{user.email}</span>
            </div>
          </div>
        )}

        {/* Security Settings */}
        {isLoading ? (
          <div className="h-12 bg-base-200 rounded-lg animate-pulse"></div>
        ) : (
          <div className="flex justify-between items-center bg-base-200/80 p-4 rounded-lg hover:shadow-md transition-all">
            <span className="text-base font-medium">Two-Step Verification</span>
            <input
              type="checkbox"
              checked={isTwoStepEnable}
              onChange={(e) => setIsTwoStepEnable(e.target.checked)}
              className="switch switch-success"
            />
          </div>
        )}

        {/* Extra Section (Stats/Info) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-24 bg-base-200 rounded-lg animate-pulse"
              ></div>
            ))
          ) : (
            <>
              <div className="bg-primary text-primary-content rounded-lg p-5 shadow-md flex flex-col items-center hover:scale-105 transition-transform">
                <span className="text-2xl sm:text-3xl font-bold">12</span>
                <span className="text-xs sm:text-sm mt-1">Active Chats</span>
              </div>
              <div className="bg-secondary text-secondary-content rounded-lg p-5 shadow-md flex flex-col items-center hover:scale-105 transition-transform">
                <span className="text-2xl sm:text-3xl font-bold">5</span>
                <span className="text-xs sm:text-sm mt-1">Groups Joined</span>
              </div>
              <div className="bg-accent text-accent-content rounded-lg p-5 shadow-md flex flex-col items-center hover:scale-105 transition-transform col-span-2 sm:col-span-1">
                <span className="text-2xl sm:text-3xl font-bold">2</span>
                <span className="text-xs sm:text-sm mt-1">Devices Logged In</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;