"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("user");
    loadAdminData(email);
  }, []);

  const loadAdminData = async (email: string | null) => {
    if (!email) { setError("Please login"); setLoading(false); return; }

    try {
      const res = await fetch(`/api/admin?email=${encodeURIComponent(email)}`);
      if (res.ok) {
        setData(await res.json());
      } else {
        setError("You are not authorized to view the admin dashboard.");
      }
    } catch(err) {
      setError("Network error");
    }
    setLoading(false);
  };

  const updateOrderStatus = async (orderId: number, currentStatus: string) => {
    const statuses = ["Pending", "Processing", "Shipped", "Delivered"];
    const nextStatus = statuses[statuses.indexOf(currentStatus) + 1] || "Delivered";
    
    try {
      const res = await fetch("/api/admin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: localStorage.getItem("user"), orderId, newStatus: nextStatus })
      });
      
      if (res.ok) {
        const email = localStorage.getItem("user");
        loadAdminData(email); // refresh
      }
    } catch(err) { alert("Failed to update status"); }
  };

  if (loading) return <div className="text-white bg-black min-h-screen text-center"><Navbar/><p className="mt-10">Loading...</p></div>;
  if (error) return <div className="text-white bg-black min-h-screen text-center"><Navbar/><p className="mt-10 text-red-500">{error}</p></div>;

  return (
    <div className="min-h-screen bg-black text-white pb-10">
      <Navbar />
      
      <div className="max-w-6xl mx-auto p-8 mt-10">
        <h1 className="text-4xl font-bold mb-8 text-blue-500">Admin Dashboard</h1>

        <div className="grid grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-900 border border-gray-700 p-6 rounded-lg text-center">
             <p className="text-gray-400 text-lg uppercase">Total Orders</p>
             <p className="text-5xl font-bold mt-2">{data.orders.length}</p>
          </div>
          <div className="bg-gray-900 border border-gray-700 p-6 rounded-lg text-center">
             <p className="text-gray-400 text-lg uppercase">Total Users</p>
             <p className="text-5xl font-bold mt-2">{data.users.length}</p>
          </div>
          <div className="bg-gray-900 border border-gray-700 p-6 rounded-lg text-center">
             <p className="text-gray-400 text-lg uppercase">Global Revenue</p>
             <p className="text-5xl font-bold mt-2 text-green-500">
                ₹{data.orders.reduce((acc: number, curr: any) => acc + Number(curr.total_amount), 0)}
             </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Manage Orders</h2>
        <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
           <table className="w-full text-left">
              <thead className="bg-gray-800 border-b border-gray-700">
                 <tr>
                    <th className="p-4">ID</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Action</th>
                 </tr>
              </thead>
              <tbody>
                 {data.orders.map((o: any) => (
                    <tr key={o.id} className="border-b border-gray-800">
                       <td className="p-4">#{o.id}</td>
                       <td className="p-4">{o.user_email}</td>
                       <td className="p-4">{new Date(o.created_at).toLocaleDateString()}</td>
                       <td className="p-4"><span className="bg-blue-900 text-blue-300 px-2 py-1 rounded text-sm">{o.status}</span></td>
                       <td className="p-4">
                          <button 
                             onClick={() => updateOrderStatus(o.id, o.status)}
                             disabled={o.status === 'Delivered'}
                             className="bg-gray-700 hover:bg-gray-600 px-4 py-1 rounded disabled:opacity-50"
                          >
                            Advance Status
                          </button>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}
