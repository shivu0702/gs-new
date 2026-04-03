"use client";

import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import Navbar from "@/components/Navbar";

export default function WishlistPage() {
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const email = localStorage.getItem("user");
    setUserEmail(email);
    loadWishlist(email);
  }, []);

  const loadWishlist = async (email: string | null) => {
    if (!email) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/wishlist?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      if (res.ok) setWishlist(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const removeFromWishlist = async (productId: number) => {
    const userEmail = localStorage.getItem("user");
    if (!userEmail) return;

    try {
      const res = await fetch("/api/wishlist", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, product_id: productId })
      });
      if (res.ok) {
        setWishlist(prev => prev.filter((item: any) => item.id !== productId));
      }
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div>
      <Navbar />
      <div className="p-10 bg-black min-h-screen text-white">
        <h1 className="text-3xl font-bold mb-8 text-center">My Wishlist</h1>

        {!userEmail ? (
          <p className="text-center text-red-500 bg-red-100/10 p-4 rounded-lg inline-block w-full">
            Please log in to view your wishlist. <a href="/login" className="underline text-blue-400">Login here</a>.
          </p>
        ) : loading ? (
          <p className="text-center">Loading...</p>
        ) : wishlist.length === 0 ? (
          <p className="text-center text-gray-400">Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((item: any) => (
              <div
                key={item.id}
                className="border border-gray-700 p-4 rounded-xl bg-gray-900 relative group"
              >
                <div className="h-48 w-full bg-white flex items-center justify-center rounded">
                  <img
                    src={`/images/${item.image}`}
                    alt={item.name}
                    className="h-full object-contain p-3"
                  />
                </div>

                <button 
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-6 right-6 bg-red-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-700 text-white font-bold"
                  title="Remove from Wishlist"
                >
                  X
                </button>

                <h2 className="text-lg mt-4">{item.name}</h2>
                <p className="text-gray-400">₹{item.price}</p>
                <button
                  onClick={() => {
                    addToCart({ ...item, image: `/images/${item.image}` });
                    alert("✅ Added to Cart!");
                  }}
                  className="bg-blue-600 mt-4 w-full py-2 rounded hover:bg-blue-700"
                >
                  Move to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
