import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// FAQ Data
const faqData = [
  { q: "Is ChatApp free?", a: "Yes! ChatApp is 100% free to use." },
  { q: "Can I use it on multiple devices?", a: "Absolutely, your active sessions receive messages instantly across all your connected devices." },
  { q: "Can I share images or make video calls?", a: "Currently, ChatApp focuses entirely on delivering a lightning-fast, lightweight text messaging experience." },
];

// Splash Screen
const SplashScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 1.5 }}
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-primary to-secondary z-50"
    >
      <motion.img
        src="/logo.png"
        alt="App Logo"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-32 h-32 drop-shadow-2xl"
      />
    </motion.div>
  );
};

const HomePage = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [openFAQ, setOpenFAQ] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    { icon: "💬", title: "Real-Time Chat", desc: "Send & receive text messages instantly without reloading." },
    { icon: "🔄", title: "Multi-Device Sync", desc: "Receive your messages simultaneously on all active devices." },
    { icon: "🔔", title: "Instant Alerts", desc: "Get notified immediately when friends send you a message." },
    { icon: "🔒", title: "Secure Access", desc: "Your account is protected by encrypted authentication." },
  ];

  const steps = [
    { num: "1", title: "Sign Up", desc: "Create your free ChatApp account in seconds." },
    { num: "2", title: "Find Friends", desc: "Select a contact from your list to start chatting." },
    { num: "3", title: "Start Chatting", desc: "Enjoy instant messaging with real-time updates." },
  ];

  return (
    <>
      {showSplash && <SplashScreen />}
      {!showSplash && (
        <div className="min-h-screen bg-gradient-to-br from-base-100 via-primary/5 to-secondary/10 flex flex-col">

          {/* HERO */}
          <section className="px-10 py-20 flex flex-col items-center text-center">
            <motion.h1
              className="text-5xl md:text-6xl font-extrabold text-primary drop-shadow mb-6"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Connect. Chat. Celebrate 🎉
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-gray-700 max-w-2xl mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              ChatApp brings you closer to friends with lightning-fast, real-time text conversations 🚀
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex gap-4"
            >
              <Link to="/login" className="btn btn-primary text-lg px-6">
                🔑 Login
              </Link>
              <Link to="/register" className="btn btn-secondary text-lg px-6">
                ✨ Sign Up
              </Link>
            </motion.div>
          </section>

          {/* FEATURES */}
          <section className="px-10 py-20 bg-white">
            <motion.h2
              className="text-4xl font-bold text-center text-primary mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Features You’ll Love 💖
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  className="p-6 bg-base-100 rounded-2xl shadow-lg border border-gray-100 text-center flex flex-col items-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <div className="text-5xl mb-4">{f.icon}</div>
                  <h3 className="text-xl font-semibold">{f.title}</h3>
                  <p className="text-gray-600 mt-2">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* STEPS */}
          <section className="px-10 py-20 bg-base-200/60">
            <motion.h2
              className="text-4xl font-bold text-center text-secondary mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              How It Works ⚡
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {steps.map((s, i) => (
                <motion.div
                  key={i}
                  className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100 text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                >
                  <div className="text-5xl font-bold text-primary">{s.num}</div>
                  <h3 className="text-xl font-semibold mt-4">{s.title}</h3>
                  <p className="text-gray-600 mt-2">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* DEMO */}
          <section className="px-10 py-20 bg-white">
            <motion.h2
              className="text-4xl font-bold text-center text-secondary mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Experience the Magic ✨
            </motion.h2>
            <motion.div
              className="max-w-4xl mx-auto bg-base-200/50 shadow-xl rounded-3xl p-8 backdrop-blur-lg border border-gray-100"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              <div className="chat chat-start">
                <div className="chat-bubble bg-gray-200 text-gray-800 animate-bounce">Hi there! 👋</div>
              </div>
              <div className="chat chat-end mt-4">
                <div className="chat-bubble bg-primary text-white animate-pulse">
                  Welcome to ChatApp 🚀
                </div>
              </div>
            </motion.div>
          </section>

          {/* FAQ */}
          <section className="px-10 py-20 bg-base-200/60">
            <motion.h2
              className="text-4xl font-bold text-center text-primary mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Frequently Asked Questions ❓
            </motion.h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqData.map((item, i) => (
                <motion.div
                  key={i}
                  className="p-6 border rounded-xl bg-white shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                >
                  <div className="flex justify-between items-center">
                     <h3 className="text-lg font-semibold text-gray-800">{item.q}</h3>
                    <span className="text-primary">{openFAQ === i ? "🔼" : "🔽"}</span>
                  </div>
                  {openFAQ === i && (
                    <motion.p
                      className="text-gray-600 mt-3"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      {item.a}
                    </motion.p>
                  )}
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="px-10 py-20 text-center bg-gradient-to-r from-primary/10 to-secondary/10">
            <motion.h2
              className="text-4xl font-bold text-primary mb-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Ready to Start Chatting? 🚀
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/register" className="btn btn-primary px-8 py-3 text-lg">
                Join Now ✨
              </Link>
            </motion.div>
          </section>
        </div>
      )}
    </>
  );
};

export default HomePage;