import React from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 p-8 overflow-hidden">
      {/* Hero Section */}
      <motion.div
        className="text-center max-w-3xl mx-auto mb-16"
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          className="text-5xl font-extrabold text-primary drop-shadow mb-4"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Get in <span className="text-secondary">Touch</span> 📩
        </motion.h1>
        <p className="text-lg text-gray-600">
          Have a question about the code, want to report a bug, or just want to say hi? 
          Feel free to reach out or check out the project repository.
        </p>
      </motion.div>

      {/* Contact Info Links */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
        {[
          { icon: <Mail className="w-10 h-10 mx-auto text-primary mb-4" />, title: "Email", value: "hello@example.com", link: "mailto:hello@example.com" },
          { icon: <Github className="w-10 h-10 mx-auto text-secondary mb-4" />, title: "GitHub", value: "github.com/MsrSahil", link: "https://github.com/MsrSahil" },
          { icon: <Linkedin className="w-10 h-10 mx-auto text-accent mb-4" />, title: "LinkedIn", value: "Connect with me", link: "#" },
        ].map((item, idx) => (
          <motion.a
            key={idx}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="p-8 rounded-3xl bg-white/70 backdrop-blur-lg shadow-lg text-center border border-gray-100 hover:shadow-xl transition block"
          >
            {item.icon}
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="text-gray-600">{item.value}</p>
          </motion.a>
        ))}
      </div>

      {/* Contact Form UI */}
      <motion.div
        className="max-w-3xl mx-auto bg-white/70 backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-gray-200"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-primary text-center mb-8">
          Send a Message 💬
        </h2>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full bg-base-100 focus:ring-2 focus:ring-primary"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full bg-base-100 focus:ring-2 focus:ring-secondary"
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            className="input input-bordered w-full bg-base-100 focus:ring-2 focus:ring-accent"
          />
          <textarea
            placeholder="Your Message..."
            className="textarea textarea-bordered w-full h-32 bg-base-100 focus:ring-2 focus:ring-primary"
          ></textarea>
          <motion.button
            type="submit"
            className="btn btn-primary w-full flex items-center gap-2 text-lg font-bold rounded-xl"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send className="w-5 h-5" /> Send Message
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactPage;