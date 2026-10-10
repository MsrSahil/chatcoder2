import React from "react";
import { motion } from "framer-motion";
import { Shield, Zap, Globe, Code } from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 p-8 overflow-hidden">
      {/* Hero Section */}
      <motion.div
        className="max-w-4xl mx-auto text-center mb-20"
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          className="text-5xl font-extrabold text-primary drop-shadow mb-4"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          About <span className="text-secondary">ChatApp</span>
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600"
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          A fast, modern, and lightweight real-time chat application built to demonstrate 
          seamless bidirectional communication. 💬
        </motion.p>
      </motion.div>

      {/* The Goal */}
      <motion.div
        className="max-w-4xl mx-auto mb-20 text-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="p-10 rounded-3xl shadow-xl bg-white/70 backdrop-blur-lg border border-gray-200">
          <h2 className="text-3xl font-bold text-primary mb-4">🚀 The Goal</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            ChatApp was developed as a clean, functional project to showcase a full-stack MERN 
            architecture integrated with WebSockets. The focus is on providing a snappy 
            user interface, reliable real-time messaging, and secure user authentication without 
            unnecessary bloat.
          </p>
        </div>
      </motion.div>

      {/* Core Features */}
      <motion.div
        className="max-w-6xl mx-auto mb-20"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-center text-secondary mb-12">
          Project Highlights 💡
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { icon: <Zap className="w-10 h-10 mx-auto text-primary mb-4" />, title: "Real-Time", desc: "Instant messaging powered by Socket.IO." },
            { icon: <Shield className="w-10 h-10 mx-auto text-secondary mb-4" />, title: "Secure", desc: "JWT-based authentication and Bcrypt hashing." },
            { icon: <Globe className="w-10 h-10 mx-auto text-accent mb-4" />, title: "Web-Based", desc: "Accessible from any browser on any device." },
            { icon: <Code className="w-10 h-10 mx-auto text-gray-700 mb-4" />, title: "Modern UI", desc: "Built with React, Tailwind v4, and Framer Motion." },
          ].map((val, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="p-6 rounded-2xl bg-white/70 shadow-lg text-center hover:scale-105 transition"
            >
              {val.icon}
              <h3 className="text-xl font-bold mb-2">{val.title}</h3>
              <p className="text-gray-600 text-sm">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tech Stack */}
      <motion.div
        className="max-w-5xl mx-auto mb-20"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-center text-primary mb-12">
          Built With 🛠️
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            "React 19",
            "Vite",
            "Node.js",
            "Express",
            "MongoDB",
            "Mongoose",
            "Socket.IO",
            "Tailwind CSS v4",
            "Framer Motion",
            "FlyonUI",
          ].map((tech, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="px-6 py-3 bg-white/80 rounded-full shadow-md font-semibold text-gray-700 border border-gray-100"
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        className="max-w-4xl mx-auto text-center p-10 rounded-3xl shadow-xl bg-gradient-to-r from-primary to-secondary text-white"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        whileHover={{ scale: 1.02 }}
      >
        <h2 className="text-3xl font-bold mb-4">
          Ready to try it out? 🚀
        </h2>
        <p className="mb-6 text-lg">
          Create an account and start experiencing real-time communication.
        </p>
        <Link to="/register">
          <motion.button
            className="btn bg-white text-primary rounded-xl font-bold shadow-lg px-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create Account
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default AboutPage;
