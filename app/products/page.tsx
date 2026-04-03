"use client";

import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";

export default function ProductsPage() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="p-10 bg-black min-h-screen text-white">
     <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((item: any) => (
        <div 
          key={item.id}
          className="border border-gray-700 p-4 rounded-xl bg-gray-900">
          <div className = "h-48 w-full bg-white flex items-center justify-center rounded">
            <img
               src={`/images/${item.image}`}
               alt={item.name}
               className="h-full object-contain p-3"
               />
               </div>

        <h2 className="text-lg mt-4">{item.name}</h2>

        <p className="text-gray-400">₹{item.price}</p>
        
        <a href={`/products/${item.id}`} className="block text-center border border-blue-600 text-blue-500 hover:bg-blue-600 hover:text-white mt-4 w-full py-2 rounded transition-all">
          View Details
        </a>

        <button 
        onClick={() => {
          addToCart({
            ...item,
            image: `/images/${item.image}`
          });
          alert("✅ Added to Cart!");
        }}
        className="bg-blue-600 mt-4 w-full py-2 rounded">
        Add to Cart
        </button>

        <button 
        onClick={async () => {
          const userEmail = localStorage.getItem("user");
          if (!userEmail) { alert("Please login to save to wishlist."); return; }
          const res = await fetch("/api/wishlist", {
             method: "POST", headers: {"Content-Type":"application/json"},
             body: JSON.stringify({ email: userEmail, product_id: item.id })
          });
          if (res.ok) alert("💖 Added to Wishlist!");
        }}
        className="border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition-all mt-2 w-full py-2 rounded">
        Save to Wishlist 💖
        </button>
        </div>
        ))}
      </div>
      </div>
    );
}