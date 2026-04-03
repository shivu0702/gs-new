"use client";

import { use, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      // In a real app we'd fetch `/api/products/[id]`. 
      // Since `setup-db.js` only provides list endpoints currently, 
      // we'll filter from the main list or fetch from a dedicated API.
      try {
        const res = await fetch("/api/products");
        const allProducts = await res.json();
        const found = allProducts.find((p: any) => p.id.toString() === resolvedParams.id);
        setProduct(found);
      } catch(err) {}
      setLoading(false);
    }
    loadProduct();
  }, [resolvedParams.id]);

  if (loading) return <div className="min-h-screen bg-black text-white p-10 text-center"><Navbar/><p className="mt-10">Loading...</p></div>;
  if (!product) return <div className="min-h-screen bg-black text-white p-10 text-center"><Navbar/><p className="mt-10 text-red-500">Product not found.</p></div>;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="max-w-6xl mx-auto p-10 mt-10">
        <div className="flex flex-col md:flex-row gap-12 items-center">
           <div className="flex-1 bg-white p-10 rounded-2xl flex items-center justify-center">
              <img src={`/images/${product.image}`} alt={product.name} className="w-full max-w-sm object-contain" />
           </div>

           <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-3xl text-blue-400 font-semibold mb-6">₹{product.price}</p>
              
              <div className="text-gray-400 mb-8 space-y-4">
                 <p>Experience the ultimate quality with our {product.name}. Designed with precision to meet all your needs.</p>
                 <ul className="list-disc pl-5">
                   <li>Premium Authentic Materials</li>
                   <li>100% Quality Guaranteed</li>
                   <li>Fast Delivery across all sectors</li>
                 </ul>
              </div>

              <div className="flex gap-4">
                 <button 
                   onClick={() => {
                     addToCart({ ...product, image: `/images/${product.image}` });
                     alert("✅ Added to Cart!");
                   }}
                   className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded flex-1"
                 >
                   Add to Cart
                 </button>
                 
                 <button 
                  onClick={async () => {
                    const userEmail = localStorage.getItem("user");
                    if (!userEmail) return alert("Please login to save to wishlist.");
                    const res = await fetch("/api/wishlist", {
                       method: "POST", headers: {"Content-Type":"application/json"},
                       body: JSON.stringify({ email: userEmail, product_id: product.id })
                    });
                    if (res.ok) alert("💖 Added to Wishlist!");
                  }}
                  className="border border-pink-500 hover:bg-pink-500 text-pink-500 font-bold hover:text-white py-4 px-8 rounded flex-1 transition-all"
                 >
                   Save to Wishlist
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
