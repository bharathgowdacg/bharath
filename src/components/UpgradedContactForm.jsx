import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";

export default function UpgradedContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ show: false, type: "", msg: "" });
  const [loading, setLoading] = useState(false);

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      showStatus("error", "Please fill in all fields.");
      return false;
    }
    const emailCheck = /\S+@\S+\.\S+/;
    if (!emailCheck.test(form.email)) {
      showStatus("error", "Enter a valid email address.");
      return false;
    }
    return true;
  };

  const showStatus = (type, msg) => {
    setStatus({ show: true, type, msg });
    setTimeout(() => setStatus({ show: false, type: "", msg: "" }), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.name,
          reply_to: form.email,
          message: form.message,
        },
        PUBLIC_KEY
      );

      showStatus("success", "Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      showStatus("error", "Failed to send. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-slate-900/60 backdrop-blur-lg rounded-xl border border-white/10 shadow-xl">
      <h2 className="text-3xl font-bold text-center mb-6">Send a Message</h2>

      {/* Toast Notification */}
      <AnimatePresence>
        {status.show && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mb-4 p-3 text-center rounded-lg ${
              status.type === "success"
                ? "bg-green-500/20 text-green-300"
                : "bg-red-500/20 text-red-300"
            }`}
          >
            {status.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Floating Label Input */}
        <div className="relative">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="peer w-full px-4 py-3 bg-slate-800/50 border border-white/20 rounded-lg text-white placeholder-transparent focus:outline-none"
            placeholder="Name"
          />
          <label
            className="absolute left-4 top-3 text-slate-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-indigo-300"
          >
            Name
          </label>
        </div>

        <div className="relative">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="peer w-full px-4 py-3 bg-slate-800/50 border border-white/20 rounded-lg text-white placeholder-transparent focus:outline-none"
            placeholder="Email"
          />
          <label className="absolute left-4 top-3 text-slate-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-indigo-300">
            Email
          </label>
        </div>

        <div className="relative">
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows="5"
            className="peer w-full px-4 py-3 bg-slate-800/50 border border-white/20 rounded-lg text-white placeholder-transparent focus:outline-none"
            placeholder="Message"
          ></textarea>
          <label className="absolute left-4 top-3 text-slate-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-indigo-300">
            Message
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-semibold transition flex items-center justify-center"
        >
          {loading ? (
            <div className="animate-spin h-5 w-5 border-t-2 border-white rounded-full"></div>
          ) : (
            "Send Message"
          )}
        </button>
      </form>
    </div>
  );
}
