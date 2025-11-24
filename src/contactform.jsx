import React, { useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ loading: false, success: null, msg: "" });

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ loading: false, success: false, msg: "Please fill all fields." });
      return false;
    }
    const emailCheck = /\S+@\S+\.\S+/;
    if (!emailCheck.test(form.email)) {
      setStatus({ loading: false, success: false, msg: "Please enter a valid email address." });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, msg: "" });

    if (!validate()) return;

    try {
      const params = {
        from_name: form.name,
        reply_to: form.email,
        message: form.message,
      };

      const res = await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, PUBLIC_KEY);

      if (res.status === 200) {
        setStatus({ loading: false, success: true, msg: "Message sent successfully!" });
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus({ loading: false, success: false, msg: "Unexpected server response." });
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus({ loading: false, success: false, msg: "Failed to send. Try again later." });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
      <div>
        <label className="block mb-1 text-sm font-medium">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none"
          placeholder="Your Name"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Email</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Message</label>
        <textarea
          name="message"
          rows="5"
          value={form.message}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none"
          placeholder="Type your message..."
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={status.loading}
        className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition"
      >
        {status.loading ? "Sending..." : "Send Message"}
      </button>

      {status.success === true && (
        <p className="text-green-400 text-sm pt-2">{status.msg}</p>
      )}
      {status.success === false && (
        <p className="text-red-400 text-sm pt-2">{status.msg}</p>
      )}
    </form>
  );
}
