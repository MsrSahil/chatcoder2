import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle, ShieldCheck, Zap, Users, Cloud, Smartphone } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.16, delayChildren: 0.12 },
  },
};

// Keep service data outside the component so it's not recreated on each render
const services = [
  {
    icon: <MessageCircle className="w-10 h-10 text-primary" aria-hidden="true" />,
    title: "Instant Messaging",
    desc: "Fast, reliable, and secure messaging with friends and teams.",
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-secondary" aria-hidden="true" />,
    title: "End-to-End Security",
    desc: "Your chats are protected with top-level encryption.",
  },
  {
    icon: <Zap className="w-10 h-10 text-accent" aria-hidden="true" />,
    title: "Lightning Performance",
    desc: "Experience ultra-fast performance with zero lags.",
  },
  {
    icon: <Users className="w-10 h-10 text-info" aria-hidden="true" />,
    title: "Group Chats",
    desc: "Create groups and stay connected with your community.",
  },
  {
    icon: <Cloud className="w-10 h-10 text-warning" aria-hidden="true" />,
    title: "Cloud Backup",
    desc: "Never lose your chats with automatic cloud sync.",
  },
  {
    icon: <Smartphone className="w-10 h-10 text-success" aria-hidden="true" />,
    title: "Cross-Platform",
    desc: "Use ChatApp anywhere – mobile, tablet, or desktop.",
  },
];

const ServicesPage = () => {
  const reduceMotion = useReducedMotion();

  // Small helper to make cards keyboard-accessible (no action yet)
  const handleKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      // currently no navigation; keep for future enhancement
      e.currentTarget.click?.();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 p-6 md:p-12">
      <header className="text-center max-w-3xl mx-auto mb-16">
        <motion.h1
          className="text-5xl font-extrabold text-primary drop-shadow mb-4"
          {...(!reduceMotion
            ? { animate: { y: [0, -8, 0] }, transition: { duration: 3, repeat: Infinity } }
            : {})}
        >
          Our <span className="text-secondary">Services</span> 🚀
        </motion.h1>
        <p className="text-lg text-gray-600">
          Explore the features that make ChatApp the best way to connect with
          friends and teams.
        </p>
      </header>

      <section aria-labelledby="services-heading" className="max-w-6xl mx-auto">
        <h2 id="services-heading" className="sr-only">
          ChatApp services
        </h2>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={!reduceMotion ? staggerContainer : {}}
          initial="hidden"
          whileInView={!reduceMotion ? "show" : undefined}
          viewport={{ once: true }}
        >
          {services.map((service) => (
            <motion.article
              key={service.title}
              variants={!reduceMotion ? fadeUp : {}}
              whileHover={!reduceMotion ? { scale: 1.03, rotate: 0.5 } : {}}
              className="p-8 rounded-3xl bg-white/80 backdrop-blur-lg shadow-lg border hover:shadow-xl transition focus:outline-none focus:ring-4 focus:ring-primary/30"
              role="group"
              tabIndex={0}
              onKeyDown={handleKey}
              aria-labelledby={`${service.title.replace(/\s+/g, "-").toLowerCase()}-title`}
            >
              <div className="flex items-center justify-center mb-6">
                <motion.div
                  {...(!reduceMotion
                    ? { animate: { scale: [1, 1.15, 1] }, transition: { repeat: Infinity, duration: 2 } }
                    : {})}
                  className="p-4 rounded-full bg-base-200"
                >
                  <span role="img" aria-hidden="true">
                    {service.icon}
                  </span>
                </motion.div>
              </div>
              <h3 id={`${service.title.replace(/\s+/g, "-").toLowerCase()}-title`} className="text-2xl font-bold mb-2 text-primary text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center">{service.desc}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="max-w-4xl mx-auto text-center p-10 mt-20 rounded-3xl shadow-xl bg-gradient-to-r from-primary to-secondary text-white border-4 border-transparent hover:border-white/40 transition" aria-labelledby="cta-heading">
        <h2 id="cta-heading" className="text-3xl font-bold mb-4">
          Ready to Experience ChatApp? 🎉
        </h2>
        <p className="mb-6 text-lg">
          Join thousands of users who enjoy seamless communication every day.
        </p>
        <motion.button
          type="button"
          className="btn bg-white text-primary rounded-xl font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition"
          whileHover={!reduceMotion ? { scale: 1.05 } : {}}
          whileTap={!reduceMotion ? { scale: 0.97 } : {}}
          aria-label="Get started with ChatApp"
        >
          Get Started
        </motion.button>
      </section>
    </main>
  );
};

export default ServicesPage;
