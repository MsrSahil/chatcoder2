import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

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
          We’d love to hear from you! Whether you have a question, feedback, or
          just want to say hello, drop us a message and we’ll get back to you.
        </p>
      </motion.div>

      {/* Contact Info */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
        {[
          { icon: <Phone className="w-10 h-10 text-primary" />, title: "Phone", value: "+91 98765 43210" },
          { icon: <Mail className="w-10 h-10 text-secondary" />, title: "Email", value: "support@chatapp.com" },
          { icon: <MapPin className="w-10 h-10 text-accent" />, title: "Address", value: "Indore, Madhya Pradesh, India" },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            className="p-8 rounded-3xl bg-white/70 backdrop-blur-lg shadow-lg text-center border hover:shadow-xl transition"
          >
            {item.icon}
            <h3 className="text-xl font-bold mt-4">{item.title}</h3>
            <p className="text-gray-600">{item.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Contact Form */}
      <motion.div
        className="max-w-3xl mx-auto bg-white/70 backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-gray-200"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-primary text-center mb-8">
          Send us a Message 💬
        </h2>
        <form className="space-y-6">
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
            placeholder="Your Message"
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

      {/* Map Section */}
      <div className="max-w-5xl mx-auto mt-20 rounded-3xl overflow-hidden shadow-lg">
        <iframe
          title="ChatApp Location"
          src="https://maps.google.com/maps?q=Bhopal,%20Madhya%20Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* CTA */}
      <motion.div
        className="max-w-4xl mx-auto text-center p-10 mt-20 rounded-3xl shadow-xl bg-gradient-to-r from-primary to-secondary text-white"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.03 }}
      >
        <h2 className="text-3xl font-bold mb-4">
          Let’s Build Something Great Together 🤝
        </h2>
        <p className="mb-6 text-lg">
          Drop us a message and we’ll get back to you within 24 hours.
        </p>
        <motion.button
          className="btn bg-white text-primary rounded-xl font-bold shadow-lg"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Us Now
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ContactPage;