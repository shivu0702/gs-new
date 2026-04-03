"use client";

import { useState } from "react";
import { useCart } from "../../context/CartContext";

export default function PaymentPage() {
  const { cart } = useCart();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("cod"); // ✅ NEW

  const handleOrder = async () => {
    if (!name || !address) {
      alert("Please fill all fields");
      return;
    }

    const user = localStorage.getItem("user");
    if (!user) {
      alert("Not logged in");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: user,
          cart
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`❌ Error: ${data.message || "Server error"}`);
        return;
      }

      if (data.message === "Order Placed") {
        alert(`✅ Order placed successfully using ${payment.toUpperCase()}`);
        localStorage.removeItem("cart");
        window.location.href = "/success";
      } else {
        alert(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Card */}
      <div className="relative bg-white/10 backdrop-blur-md p-8 rounded-2xl w-[400px] text-white shadow-lg">
        <h1 className="text-2xl font-bold mb-5 text-center">Payment</h1>

        {/* Name */}
        <input
          placeholder="Full Name"
          className="block border border-white/30 bg-black p-2 mb-3 w-full rounded outline-none"
          onChange={(e) => setName(e.target.value)}
        />

        {/* Address */}
        <textarea
          placeholder="Address"
          className="block border border-white/30 bg-black p-2 mb-3 w-full rounded outline-none"
          onChange={(e) => setAddress(e.target.value)}
        />

        {/* ✅ Payment Method */}
        <div className="mb-4">
          <p className="mb-2 font-semibold">Payment Method</p>

          <div className="flex flex-col gap-2">
            <label>
              <input
                type="radio"
                value="cod"
                checked={payment === "cod"}
                onChange={(e) => setPayment(e.target.value)}
              />{" "}
              Cash on Delivery
            </label>

            <label>
              <input
                type="radio"
                value="upi"
                checked={payment === "upi"}
                onChange={(e) => setPayment(e.target.value)}
              />{" "}
              UPI
            </label>

            <label>
              <input
                type="radio"
                value="card"
                checked={payment === "card"}
                onChange={(e) => setPayment(e.target.value)}
              />{" "}
              Card
            </label>
          </div>
        </div>

        {/* ✅ Conditional Fields */}
        {payment === "upi" && (
          <input
            placeholder="Enter UPI ID"
            className="block border border-white/30 bg-black p-2 mb-3 w-full rounded"
          />
        )}

        {payment === "card" && (
          <input
            placeholder="Enter Card Number"
            className="block border border-white/30 bg-black p-2 mb-3 w-full rounded"
          />
        )}

        {/* Button */}
        <button
          onClick={handleOrder}
          className="bg-blue-600 hover:bg-blue-700 w-full py-2 rounded"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}