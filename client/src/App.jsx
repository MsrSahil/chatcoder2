import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/ContactUs";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import ChatPage from "./pages/ChatPage";
import ServicesPage from "./pages/Services";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/services" element={<ServicesPage />} />

        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;