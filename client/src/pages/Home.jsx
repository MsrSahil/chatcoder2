import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// FAQ Data
const faqData = [
  { q: "Is App free?", a: "Yes! ChatApp is 100% free to use with no hidden charges." },
  { q: "Can I use it on multiple devices?", a: "Absolutely, your messages sync across all devices instantly." },
  { q: "Is my data safe?", a: "Yes, we use end-to-end encryption to keep your data private." },
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
    { icon: "💬", title: "Real-Time Chat", desc: "Send & receive messages instantly." },
    { icon: "👥", title: "Group Chats", desc: "Create groups for friends or work." },
    { icon: "📁", title: "File Sharing", desc: "Share images, videos, and docs securely." },
    { icon: "📞", title: "Voice Calls", desc: "Crystal-clear voice calls powered by Raju AudioWala." },
    { icon: "🎥", title: "Video Calls", desc: "High-quality video with screen sharing." },
    { icon: "🔒", title: "Secure & Private", desc: "End-to-end encryption keeps data safe." },
  ];

  const steps = [
    { num: "1", title: "Sign Up", desc: "Create your free ChatApp account in seconds." },
    { num: "2", title: "Find Friends", desc: "Add contacts or join groups to start chatting." },
    { num: "3", title: "Start Chatting", desc: "Enjoy messages, calls, and file sharing." },
  ];

  const testimonials = [
    { name: "Ayush", text: "🔥 ChatApp is super smooth and fast! Love the design." },
    { name: "Lalit", text: "💯 Finally a chat app that feels modern and easy to use." },
    { name: "Swahil", text: "🚀 Secure, fast, and I can use it on all my devices." },
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
              ChatApp brings you closer to friends, family, and your community with real-time conversations 🚀
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  className="p-6 bg-base-100 rounded-2xl shadow-lg border border-gray-100"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                >
                  <div className="text-4xl">{f.icon}</div>
                  <h3 className="text-xl font-semibold mt-4">{f.title}</h3>
                  <p className="text-gray-600 mt-2">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* STATS */}
          <section className="px-10 py-20 bg-gradient-to-r from-secondary/5 to-primary/5 text-center">
            <motion.h2
              className="text-4xl font-bold text-primary mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Trusted by Thousands 🌍
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                { num: "1M+", text: "Downloads" },
                { num: "500K+", text: "Daily Users" },
                { num: "99.9%", text: "Uptime" },
                { num: "120+", text: "Countries" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="p-6 bg-white/70 backdrop-blur-lg rounded-xl shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: i * 0.2 }}
                >
                  <h3 className="text-3xl font-bold text-primary">{stat.num}</h3>
                  <p className="text-gray-600">{stat.text}</p>
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
          <section className="px-10 py-20 bg-base-200/60">
            <motion.h2
              className="text-4xl font-bold text-center text-secondary mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Experience the Magic ✨
            </motion.h2>
            <motion.div
              className="max-w-4xl mx-auto bg-white/70 shadow-xl rounded-3xl p-8 backdrop-blur-lg"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              <div className="chat chat-start">
                <div className="chat-bubble bg-gray-200 animate-bounce">Hi there! 👋</div>
              </div>
              <div className="chat chat-end mt-4">
                <div className="chat-bubble bg-primary text-white animate-pulse">
                  Welcome to ChatApp 🚀
                </div>
              </div>
            </motion.div>
          </section>

          {/* TESTIMONIALS */}
          <section className="px-10 py-20 bg-white">
            <motion.h2
              className="text-4xl font-bold text-center text-primary mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Loved by Our Users ❤️
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  className="p-6 bg-base-100 rounded-2xl shadow-lg border border-gray-100"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                >
                  <p className="text-gray-600 italic">“{t.text}”</p>
                  <h3 className="mt-4 font-semibold text-primary">- {t.name}</h3>
                </motion.div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="px-10 py-20 bg-white">
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
                  className="p-6 border rounded-xl bg-base-100 shadow-md cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{item.q}</h3>
                    <span>{openFAQ === i ? "🔼" : "🔽"}</span>
                  </div>
                  {openFAQ === i && (
                    <motion.p
                      className="text-gray-600 mt-2"
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