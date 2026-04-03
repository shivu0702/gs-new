"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/forgot-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword })
      });
      const data = await res.json();
      
      if (!res.ok) alert(`❌ Error: ${data.message}`);
      else {
        alert("✅ Password Reset Successfully!");
        window.location.href = "/login";
      }
    } catch (err) {
      console.error(err);
      alert("Network Error");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581092918056-0c4c3acd3789')" }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="relative bg-white/10 backdrop-blur-md p-8 rounded-2xl w-[400px] text-white shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-6">Reset Password</h2>

        <form onSubmit={handleReset} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Account Email Address"
            required
            className="w-full bg-black/50 border border-white/30 p-3 rounded outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter New Password"
            required
            className="w-full bg-black/50 border border-white/30 p-3 rounded outline-none"
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded font-bold mt-2">
            Reset Password
          </button>
        </form>

        <div className="text-center mt-6">
          <Link href="/login" className="text-blue-300 hover:underline">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}
