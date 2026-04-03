"use client";

import { useEffect, useState, use } from "react";

export default function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.id;
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        if (res.ok) setOrder(await res.json());
      } catch (err) {}
      setLoading(false);
    }
    loadOrder();
  }, [orderId]);

  if (loading) return <p className="text-center mt-20">Loading Invoice...</p>;
  if (!order) return <p className="text-center mt-20 text-red-500">Order not found.</p>;

  const subtotal = order.items.reduce((acc: number, item: any) => acc + Number(item.price), 0);
  const gst = subtotal * 0.18; // 18% GST example
  const total = subtotal + gst;

  return (
    <div className="min-h-screen bg-gray-100 p-10 flex justify-center text-black">
       <div className="bg-white max-w-3xl w-full p-10 shadow-lg border border-gray-200">
          
          <div className="flex justify-between items-start border-b pb-6 mb-6">
            <div>
               <h1 className="text-4xl font-extrabold text-blue-700">INVOICE</h1>
               <p className="text-gray-500 mt-1">Order #{order.id}</p>
               <p className="text-gray-500">Date: {new Date(order.created_at).toLocaleString()}</p>
            </div>
            
            <div className="text-right">
              <h2 className="text-2xl font-bold">GS Enterprises</h2>
              <p className="text-gray-500">#123 Sector 4, Ind. Area</p>
              <p className="text-gray-500">contact@gsenterprises.com</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold">Bill To:</h3>
            <p className="text-gray-700 font-semibold">{order.user?.name || "Customer"}</p>
            <p className="text-gray-600">{order.user_email}</p>
            <p className="text-gray-600 mt-2"><b>Payment Method:</b> {order.payment_method?.toUpperCase() || 'COD'}</p>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 border-b border-gray-300">
                <th className="p-3">Item Description</th>
                <th className="p-3 text-right">Qty</th>
                <th className="p-3 text-right">Price</th>
                <th className="p-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item: any) => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="p-3 font-medium flex items-center gap-3">
                     <img src={item.image} className="w-10 h-10 object-contain" />
                     {item.product_name}
                  </td>
                  <td className="p-3 text-right">1</td>
                  <td className="p-3 text-right">₹{item.price}</td>
                  <td className="p-3 text-right font-semibold">₹{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mt-6">
            <div className="w-1/2 p-4 bg-gray-50 border border-gray-200 rounded">
               <div className="flex justify-between mb-2">
                 <p className="text-gray-600">Subtotal</p>
                 <p className="font-semibold">₹{subtotal.toFixed(2)}</p>
               </div>
               <div className="flex justify-between mb-2">
                 <p className="text-gray-600">GST (18%)</p>
                 <p className="font-semibold">₹{gst.toFixed(2)}</p>
               </div>
               <div className="flex justify-between mt-4 pt-4 border-t border-gray-300">
                 <p className="font-bold text-lg">Total Amount</p>
                 <p className="font-bold text-lg text-blue-700">₹{total.toFixed(2)}</p>
               </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t text-center text-sm text-gray-500">
            <p>Thank you for your business with GS Enterprises!</p>
            <button 
               onClick={() => window.print()}
               className="mt-6 bg-gray-800 text-white px-6 py-2 rounded print:hidden"
            >
               Print Invoice
            </button>
          </div>

       </div>
    </div>
  );
}
