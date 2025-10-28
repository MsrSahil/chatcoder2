import React, { useState } from "react";
import toast from "react-hot-toast";
import API from "../../config/Api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const OTPModal = ({ isOpen, onClose, callingPage, data }) => {
  const navigate = useNavigate();
  const { setUser, setIsLogin } = useAuth();

  const [otp, setOtp] = useState("");

  const handleOTPSubmit = async () => {
    // Handle OTP submission logic here
    data.otp = otp; // Attach OTP to data
    console.log("OTP data:", data);

    console.log("OTP submitted:", otp);

    try {
      let res;
      if (callingPage === "register") {
        res = await API.post("/auth/register", data);
      } else {
        res = await API.post("/auth/login", data);
        setUser(res.data.data);
        setIsLogin(true);
        sessionStorage.setItem("ChatUser", JSON.stringify(res.data.data));
      }

      toast.success(res.data.message);
      onClose();
      callingPage === "register" ? navigate("/login") : navigate("/dashboard");
    } catch (error) {
      toast.error(
        `Error : ${error.response?.status || error.message} | ${
          error.response?.data.message || ""
        }`
      );
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-20">
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-lg font-semibold mb-4">Enter OTP</h2>
          <input
            type="text"
            placeholder="One Time Password"
            className="border border-gray-300 p-2 rounded w-full mb-4"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={handleOTPSubmit}
          >
            {callingPage === "register"
              ? "Verify & Register"
              : "Verify & Login"}
          </button>
        </div>
      </div>
    </>
  );
};

export default OTPModal;