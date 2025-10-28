import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Rocket, Shield, Users } from "lucide-react";

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
          ChatApp is built to make communication seamless, fun, and secure.  
          Our mission is to **connect people** with simplicity and speed 💬.
        </motion.p>
      </motion.div>

      {/* Mission & Vision */}
      <motion.div
        className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto mb-20"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.div
          variants={fadeUp}
          className="p-8 rounded-3xl shadow-xl bg-white/70 backdrop-blur-lg border border-gray-200 hover:scale-105 transition"
        >
          <h2 className="text-2xl font-bold text-primary mb-3">🚀 Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            To create a **seamless chat experience** where people connect instantly,
            share ideas, and build meaningful relationships without barriers.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="p-8 rounded-3xl shadow-xl bg-white/70 backdrop-blur-lg border border-gray-200 hover:scale-105 transition"
        >
          <h2 className="text-2xl font-bold text-secondary mb-3">🌍 Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            To become the **world’s most trusted chat platform**, empowering millions
            of users to communicate securely anytime, anywhere.
          </p>
        </motion.div>
      </motion.div>

      {/* Journey Timeline */}
      <motion.div
        className="max-w-5xl mx-auto mb-20"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <h2 className="text-4xl font-bold text-center text-primary mb-12">
          Our Journey 📈
        </h2>
        <div className="timeline timeline-vertical">
          {[
            { year: "2022", text: "Founded with the vision of simplifying communication." },
            { year: "2023", text: "Launched first version & reached 10k+ users." },
            { year: "2024", text: "Expanded features & added end-to-end encryption." },
          ].map((item, idx) => (
            <motion.div key={idx} variants={fadeUp}>
              <div
                className={`timeline-${
                  idx % 2 === 0 ? "start" : "end"
                } timeline-box bg-white/70 backdrop-blur-lg hover:scale-105 transition`}
              >
                <h3 className="font-bold">{item.year}</h3>
                <p>{item.text}</p>
              </div>
              <div className="timeline-middle text-secondary">✨</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Core Values */}
      <motion.div
        className="max-w-6xl mx-auto mb-20"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-center text-secondary mb-12">
          Our Core Values 💡
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { icon: <Shield className="w-12 h-12 mx-auto text-primary mb-4" />, title: "Security", desc: "Your privacy is our top priority." },
            { icon: <Rocket className="w-12 h-12 mx-auto text-secondary mb-4" />, title: "Innovation", desc: "Bringing the latest technology to you." },
            { icon: <Users className="w-12 h-12 mx-auto text-accent mb-4" />, title: "Community", desc: "We believe in lasting connections." },
          ].map((val, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="p-6 rounded-2xl bg-white/70 shadow-lg text-center hover:scale-110 transition"
            >
              {val.icon}
              <h3 className="text-xl font-bold mb-2">{val.title}</h3>
              <p className="text-gray-600">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Why Choose Us */}
      <motion.div
        className="max-w-6xl mx-auto mb-20"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-center text-primary mb-12">
          Why Choose ChatApp? 🤔
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            "End-to-End Encryption",
            "Ultra Fast Servers",
            "24/7 Customer Support",
            "Cross-Platform Access",
            "Free & Premium Options",
            "Modern UI & Themes",
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="flex items-center gap-3 p-4 bg-white/70 rounded-xl shadow hover:scale-105 transition"
            >
              <CheckCircle className="text-secondary w-6 h-6" />
              <p className="text-gray-700">{feature}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div
        className="max-w-6xl mx-auto mb-20"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-center text-primary mb-12">
          Meet Our Team 👨‍💻👩‍💻
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[1, 2, 3].map((id) => (
            <motion.div
              key={id}
              variants={fadeUp}
              whileHover={{ rotateY: 10, scale: 1.05 }}
              className="p-6 rounded-2xl shadow-lg bg-white/70 backdrop-blur-lg text-center cursor-pointer"
            >
              <img
                src={`https://i.pravatar.cc/150?img=${id}`}
                alt="Team Member"
                className="w-24 h-24 mx-auto rounded-full border-4 border-primary mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800">
                {id === 1 ? "Sahil" : id === 2 ? "Aarav" : "Neha"}
              </h3>
              <p className="text-gray-600">
                {id === 1
                  ? "Founder & Developer"
                  : id === 2
                  ? "UI/UX Designer"
                  : "Marketing Lead"}
              </p>
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
        whileHover={{ scale: 1.05 }}
      >
        <h2 className="text-3xl font-bold mb-4">
          Ready to Experience the Future of Chat? 🚀
        </h2>
        <p className="mb-6 text-lg">
          Join thousands of users already connecting on ChatApp today.
        </p>
        <motion.button
          className="btn bg-white text-primary rounded-xl font-bold shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started Now
        </motion.button>
      </motion.div>
    </div>
  );
};

export default AboutPage;
