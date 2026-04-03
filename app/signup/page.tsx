"use client";
import { useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Server error");
        return;
      }

      alert(data.message);
      if (data.message === "User registered successfully") {
        window.location.href = "/login";
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
          "url('https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=1600')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white/70 backdrop-blur-md p-6 rounded-lg w-80 shadow-lg">
        <h2 className="text-center text-xl font-bold">Register</h2>

        <input
          placeholder="Name"
          className="w-full mt-4 p-2 border rounded"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="w-full mt-3 p-2 border rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mt-3 p-2 border rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full mt-4 bg-blue-600 text-white p-2 rounded"
        >
          Register
        </button>

        <p className="text-center mt-3">
          Already have account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}