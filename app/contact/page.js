"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("FORM SUBMITTED"); // debug

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (data.message === "Message Saved") {
      alert("✅ Message Sent Successfully!");
      setForm({ name: "", email: "", message: "" });
    } else {
      alert("❌ Error sending message");
    }

  } catch (error) {
    console.log(error);
    alert("❌ Server error");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-3xl p-8 rounded shadow">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
          CONTACT US
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* ✅ NAME */}
          <input
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full bg-gray-100 border border-gray-300 text-black p-3 rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          />

          {/* ✅ EMAIL */}
          <input
            type="email"
            placeholder="Your email address"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full bg-gray-100 border border-gray-300 text-black p-3 rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          />

          {/* ✅ MESSAGE */}
          <textarea
            placeholder="Your message"
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            className="w-full bg-gray-100 border border-gray-300 text-black p-3 rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            rows="5"
          />

          {/* BUTTON */}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
