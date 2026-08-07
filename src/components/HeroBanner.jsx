import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaRobot,
  FaShieldAlt,
  FaChartLine,
  FaLightbulb,
} from "react-icons/fa";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&q=80",
    title: "AI Complaint Management",
    subtitle: "Smarter Complaint Analysis with Artificial Intelligence",
  },
  {
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80",
    title: "Quality Assurance",
    subtitle: "Improve customer satisfaction through intelligent automation",
  },
  {
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=80",
    title: "Business Insights",
    subtitle: "Transform complaints into valuable business intelligence",
  },
  {
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1600&q=80",
    title: "Enterprise Dashboard",
    subtitle: "Modern analytics for modern businesses",
  },
];

const quotes = [
  "Quality means doing it right when no one is looking. — Henry Ford",
  "Customer complaints are opportunities in disguise.",
  "Artificial Intelligence turns feedback into business growth.",
  "Every complaint contains a lesson for improvement.",
  "Continuous improvement begins with listening to customers.",
  "Data driven decisions create exceptional customer experiences.",
];

export default function HeroBanner() {
  const [slide, setSlide] = useState(0);

  const quote =
    quotes[
      Math.floor(Date.now() / (1000 * 60 * 60 * 24)) %
        quotes.length
    ];

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative h-[360px] rounded-3xl overflow-hidden shadow-2xl mb-10"
    >
      <img
        src={slides[slide].image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover transition-all duration-1000"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/70 to-cyan-700/40" />

      <div className="relative z-10 h-full flex justify-between items-center px-12">

        <div className="max-w-2xl">

          <motion.h1
            key={slides[slide].title}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl font-extrabold text-white mb-5"
          >
            {slides[slide].title}
          </motion.h1>

          <motion.p
            key={slides[slide].subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl text-gray-200 mb-8"
          >
            {slides[slide].subtitle}
          </motion.p>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">

            <div className="flex items-center gap-3 mb-3">

              <FaRobot
                size={24}
                className="text-cyan-300"
              />

              <span className="text-white font-semibold text-lg">
                AI Quote of the Day
              </span>

            </div>

            <p className="text-gray-200 italic leading-7">
              {quote}
            </p>

          </div>

        </div>

        <div className="hidden lg:flex flex-col gap-6">

          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 w-72 border border-white/20">
            <FaShieldAlt
              className="text-green-400 mb-3"
              size={28}
            />
            <h3 className="text-white font-bold">
              Secure Complaint Handling
            </h3>
            <p className="text-gray-300 text-sm mt-2">
              Enterprise-grade security for customer information.
            </p>
          </div>

          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/20">
            <FaChartLine
              className="text-yellow-400 mb-3"
              size={28}
            />
            <h3 className="text-white font-bold">
              Live Analytics
            </h3>
            <p className="text-gray-300 text-sm mt-2">
              Visualize complaint trends and business insights instantly.
            </p>
          </div>

          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/20">
            <FaLightbulb
              className="text-cyan-300 mb-3"
              size={28}
            />
            <h3 className="text-white font-bold">
              AI Suggestions
            </h3>
            <p className="text-gray-300 text-sm mt-2">
              Automated root-cause analysis and CAPA recommendations.
            </p>
          </div>

        </div>

      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3">

        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            className={`h-3 rounded-full transition-all ${
              slide === i
                ? "bg-white w-10"
                : "bg-white/50 w-3"
            }`}
          />
        ))}

      </div>

    </motion.div>
  );
}