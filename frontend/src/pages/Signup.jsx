import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Signup() {
  const [form, setForm] = useState({});
  const nav = useNavigate();

  // 🎨 Background animation
  const colors = ["#0f172a", "#020617", "#111827"];
  const [bg, setBg] = useState(colors[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBg(colors[Math.floor(Math.random() * colors.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 🖼️ Image slider
  const images = [
    "/login/login2.jpg",
    "/login/login3.jpg",
    "/login/login4.jpg"
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const imgInterval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(imgInterval);
  }, []);

  // 🔐 Signup
  const signup = async () => {
    try {
      await axios.post("https://community-page-mern.vercel.app/api/auth/signup", form);
      nav("/login");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center transition-all duration-1000"
      style={{
        backgroundColor: bg,
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }}
    >
      {/* MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-[900px] h-[520px] bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 flex overflow-hidden"
      >
        {/* LEFT - SIGNUP FORM */}
        <div className="w-1/2 p-10 flex flex-col justify-center text-white">
          <h1 className="text-3xl font-semibold mb-6">
            Create Account 🚀
          </h1>

          <input
            placeholder="Name"
            className="mb-4 p-3 rounded-lg bg-white/10 border border-white/20 outline-none"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="Email"
            className="mb-4 p-3 rounded-lg bg-white/10 border border-white/20 outline-none"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            placeholder="Password"
            type="password"
            className="mb-6 p-3 rounded-lg bg-white/10 border border-white/20 outline-none"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            onClick={signup}
            className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg"
          >
            Signup
          </button>
        </div>

        {/* RIGHT - IMAGE SLIDER */}
        <div className="w-1/2 h-full relative overflow-hidden">

          <motion.img
            key={index}
            src={images[index]}
            alt="community"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full object-cover"
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/20"></div>

          {/* TEXT OVERLAY */}
          <div className="absolute bottom-10 left-6 text-white">
            <h2 className="text-2xl font-semibold">Join the Community</h2>
            <p className="text-sm text-white/70">
              Start your language journey today
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
