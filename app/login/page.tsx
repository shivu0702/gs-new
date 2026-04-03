"use client";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Server error");
        return;
      }

      alert(data.message);

      if (data.message === "Login Success") {
        localStorage.setItem("user", email);
        window.location.href = "/products";
      }
    } catch (error) {
      console.log(error);
      alert("❌ Network error, server se connect nahi ho paa raha");
    }
  };

  return (
    <div
      className="h-screen flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1581092918056-0c4c3acd3789')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white/70 backdrop-blur-md p-6 rounded-lg w-80 shadow-lg">
        <h2 className="text-center text-xl font-bold">Log In</h2>

        <input
          placeholder="Email"
          className="w-full mt-4 p-2 border rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mt-3 p-2 border rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full mt-4 bg-blue-600 text-white p-2 rounded"
        >
          Log In
        </button>

        <p className="text-center mt-3 text-sm">
          <a href="/forgot-password" className="text-blue-500 hover:underline">Forgot password?</a>
        </p>
        <p className="text-center mt-3">
          Don&apos;t have account? <a href="/signup" className="text-blue-600 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
}