"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "../../context/CartContext";
import Navbar from "@/components/Navbar";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSearch() {
      if (query) {
        setLoading(true);
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } else {
        setProducts([]);
        setLoading(false);
      }
    }
    fetchSearch();
  }, [query]);

  return (
    <div className="p-10 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Search Results for "{query}"
      </h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-400">No products found matching your search.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item: any) => (
            <div
              key={item.id}
              className="border border-gray-700 p-4 rounded-xl bg-gray-900"
            >
              <div className="h-48 w-full bg-white flex items-center justify-center rounded">
                <img
                  src={`/images/${item.image}`}
                  alt={item.name}
                  className="h-full object-contain p-3"
                />
              </div>
              <h2 className="text-lg mt-4">{item.name}</h2>
              <p className="text-gray-400">₹{item.price}</p>
              <button
                onClick={() => {
                  addToCart({ ...item, image: `/images/${item.image}` });
                  alert("✅ Added to Cart!");
                }}
                className="bg-blue-600 mt-4 w-full py-2 rounded"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div>
      <Navbar />
      <Suspense fallback={<div className="p-10 bg-black min-h-screen text-white text-center">Loading search...</div>}>
         <SearchResults />
      </Suspense>
    </div>
  );
}
