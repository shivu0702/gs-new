"use client";

import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  const handleCheckout = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      alert("Login required");
      return;
    }

    window.location.href = "/payment";
  };

  return (
    <div className="p-10 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center">Cart is empty</p>
      ) : (
        <>
          {/* CART ITEMS */}
          <div className="space-y-6">
            {cart.map((item: any, index: number) => (
              <div
                key={index}
                className="flex items-center gap-6 bg-gray-900 p-4 rounded"
              >
                <img
                  src={item.image}
                  className="w-24 h-24 object-contain bg-white rounded"
                />

                <div>
                  <h2 className="text-lg">{item.name}</h2>
                  <p className="text-gray-400">₹{item.price}</p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-auto bg-red-600 px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* 💳 CHECKOUT BUTTON */}
          <button
            onClick={handleCheckout}
            className="bg-green-600 px-6 py-3 rounded mt-8 w-full text-lg font-semibold hover:bg-green-700"
          >
            Checkout 💳
          </button>
        </>
      )}
    </div>
  );
}