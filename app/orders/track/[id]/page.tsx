"use client";

import { useEffect, useState, use } from "react";
import Navbar from "@/components/Navbar";

// Represents a vertical tracking timeline based on "status"
export default function OrderTrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.id;
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        if (res.ok) setOrder(await res.json());
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    loadOrder();
  }, [orderId]);

  const stages = ["Pending", "Processing", "Shipped", "Delivered"];
  
  const getStatusIndex = (status: string) => {
    const s = status || "Pending";
    return stages.findIndex(val => val.toLowerCase() === s.toLowerCase());
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="max-w-2xl mx-auto p-8 mt-10 border border-gray-700 bg-gray-900 rounded-lg">
        <h1 className="text-2xl font-bold mb-8 text-center text-blue-400">Track Order #{orderId}</h1>

        {loading ? (
          <p className="text-center">Loading Tracking Information...</p>
        ) : !order ? (
          <p className="text-center text-red-500">Order not found.</p>
        ) : (
          <div className="flex flex-col gap-6 px-10">
            {stages.map((stage, index) => {
              const currentIdx = getStatusIndex(order.status);
              const isCompleted = index <= currentIdx;
              const isCurrent = index === currentIdx;
              
              return (
                <div key={stage} className="flex gap-4 items-center relative">
                  {/* Visual Line */}
                  {index !== stages.length - 1 && (
                     <div className={`absolute top-10 left-4 w-1 h-12 ${isCompleted && !isCurrent ? 'bg-blue-600' : 'bg-gray-700'}`}></div>
                  )}

                  <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                    isCompleted ? 'bg-blue-600' : 'bg-gray-700'
                  }`}>
                    {isCompleted ? "✓" : index + 1}
                  </div>
                  
                  <div>
                    <p className={`text-lg font-bold ${isCompleted ? 'text-white' : 'text-gray-500'}`}>
                      {stage}
                    </p>
                    {isCurrent && stage === "Pending" && <p className="text-sm text-gray-400">Order received, awaiting processing.</p>}
                    {isCurrent && stage === "Processing" && <p className="text-sm text-gray-400">Items are being packaged.</p>}
                    {isCurrent && stage === "Shipped" && <p className="text-sm text-gray-400">Dispatched to courier.</p>}
                    {isCurrent && stage === "Delivered" && <p className="text-sm text-green-400">Package has been delivered.</p>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
