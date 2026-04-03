"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="flex justify-between items-center p-5 bg-blue-100">
      <h1 className="text-xl font-bold text-blue-700">GS</h1>

      <form onSubmit={handleSearch} className="flex flex-1 max-w-sm mx-10">
        <input 
          type="text" 
          placeholder="Search products..." 
          className="w-full px-4 py-2 border rounded-l focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700">
          Search
        </button>
      </form>

      <div className="flex gap-5 items-center text-black">
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/wishlist">Wishlist</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
}