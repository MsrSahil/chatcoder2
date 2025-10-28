import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(() => {
    const raw = sessionStorage.getItem("ChatUser");
    if (!raw) return "";
    try {
      return JSON.parse(raw);
    } catch (e) {
      // Malformed session entry — clear it and start fresh
      sessionStorage.removeItem("ChatUser");
      return "";
    }
  });
  const [isLogin, setIsLogin] = useState(!!user);

  useEffect(() => {
    setIsLogin(!!user);
  }, [user]);

  const value = { user, setUser, isLogin, setIsLogin };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};