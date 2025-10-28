import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import api from "../config/Api";
import OTPModal from "../components/modals/OTPModal";
import { useAuth } from "../context/AuthContext";
import { useGoogleAuth } from "../config/GoogleAuth";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setIsLogin } = useAuth();
  const { isLoading, error, isInitialized, signInWithGoogle } = useGoogleAuth();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/sendOtpLogin", loginData);
      if (res.data.message === "OTP sent successfully") {
        setIsOTPModalOpen(true);
      } else {
        toast.success(res.data.message);
        setUser(res.data.data);
        setIsLogin(true);
        sessionStorage.setItem("ChatUser", JSON.stringify(res.data.data));
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(
        `Error : ${error.response?.status || error.message} | ${
          error.response?.data.message || ""
        }`
      );
    }
  };

  const handleGoogleSuccess = async (userData) => {
    try {
      const res = await api.post("/auth/googleLogin", userData);
      toast.success(res.data.message);
      sessionStorage.setItem("ChatUser", JSON.stringify(res.data.data));
      setUser(res.data.data);
      setIsLogin(true);
      navigate("/dashboard");
    } catch (error) {
      toast.error("Google login failed. Please try again.");
    }
  };

  const handleGoogleFailure = (error) => {
    toast.error("Google login failed. Please try again.");
  };

  const GoogleLogin = () => {
    signInWithGoogle(handleGoogleSuccess, handleGoogleFailure);
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-base-200">
        <div className="w-full max-w-md bg-base-100 rounded-xl shadow-xl p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-primary">Welcome Back</h1>
            <p className="mt-2 text-base-content/70">Sign in to your account</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-base-content/50">
                  <FaEnvelope />
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="input input-bordered w-full ps-10"
                  placeholder="you@example.com"
                  value={loginData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-base-content/50">
                  <FaLock />
                </span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="input input-bordered w-full ps-10"
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={handleChange}
                  autoComplete="false"
                />
              </div>
            </div>

            {/* Remember Me + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="checkbox checkbox-primary" />
                Remember me
              </label>
              <Link to="#" className="text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-primary w-full">
              Sign in
            </button>
          </form>

          <div className="divider">OR</div>

          {/* Google */}
          <div>
            {error ? (
              <button className="btn btn-outline btn-error w-full flex items-center gap-2" disabled>
                <FcGoogle className="text-xl" /> {error}
              </button>
            ) : (
              <button
                onClick={GoogleLogin}
                className="btn btn-outline w-full flex items-center gap-2"
                disabled={!isInitialized || isLoading}
              >
                <FcGoogle className="text-xl" />
                {isLoading
                  ? "Loading..."
                  : isInitialized
                  ? "Continue with Google"
                  : "Google Auth Error"}
              </button>
            )}
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-base-content/70">
              Don't have an account? {" "}
              <Link
                to="/register"
                className="font-medium text-primary hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <OTPModal
        isOpen={isOTPModalOpen}
        onClose={() => setIsOTPModalOpen(false)}
        callingPage="login"
        data={loginData}
      />
    </>
  );
};

export default Login;