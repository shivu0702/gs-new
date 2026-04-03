"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const email = localStorage.getItem("user");
    setUserEmail(email);
    loadOrders(email);
  }, []);

  const loadOrders = async (email: string | null) => {
    if (!email) { setLoading(false); return; }

    try {
      const res = await fetch(`/api/orders/history?email=${encodeURIComponent(email)}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };


  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-400">Order History</h1>

        {!userEmail ? (
          <p className="text-center text-red-500">Please login to view your orders.</p>
        ) : loading ? (
          <p className="text-center">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-400">You haven't placed any orders yet.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {orders.map((order: any) => (
              <div key={order.id} className="border border-gray-700 bg-gray-900 rounded-lg p-6 flex flex-col md:flex-row gap-6 justify-between items-start">
                
                <div className="flex-1">
                   <div className="flex justify-between border-b border-gray-700 pb-3 mb-3">
                     <p className="font-bold">Order #{order.id}</p>
                     <p className="text-gray-400">{new Date(order.created_at).toLocaleDateString()}</p>
                   </div>
                   
                   <p className="mb-2">
                     Status: <span className="text-yellow-500 font-semibold">{order.status}</span>
                   </p>

                   <div className="mt-4 flex flex-col gap-2">
                     {order.items.map((item: any) => (
                        <div key={item.id} className="flex items-center gap-4 text-sm bg-black p-2 rounded">
                          <img src={item.image} alt="product" className="w-12 h-12 object-contain bg-white rounded" />
                          <p className="flex-1">{item.product_name}</p>
                          <p className="text-gray-400">₹{item.price}</p>
                        </div>
                     ))}
                   </div>
                </div>

                <div className="flex flex-col gap-2 min-w-[150px]">
                   <Link href={`/orders/track/${order.id}`}>
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">Track Order</button>
                   </Link>
                   <Link href={`/orders/invoice/${order.id}`}>
                      <button className="w-full border border-gray-500 hover:bg-gray-700 text-white py-2 rounded">View Invoice</button>
                   </Link>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
