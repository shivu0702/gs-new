"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function ProfilePage() {
  const [profile, setProfile] = useState({ name: "", email: "", role: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const email = localStorage.getItem("user");
    setUserEmail(email);
    loadProfile(email);
  }, []);

  const loadProfile = async (email: string | null) => {
    if (!email) { setLoading(false); return; }

    const res = await fetch(`/api/profile?email=${encodeURIComponent(email)}`);
    if (res.ok) {
      const data = await res.json();
      setProfile({ ...data, password: "" });
    }
    setLoading(false);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...profile, originalEmail: userEmail })
    });
    
    const data = await res.json();
    if (res.ok) {
       alert("✅ Profile Updated!");
       localStorage.setItem("user", profile.email);
       setUserEmail(profile.email);
    }
    else alert(`❌ Error: ${data.message}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    window.location.href = "/login";
  };


  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="max-w-2xl mx-auto mt-10 p-8 border border-gray-700 bg-gray-900 rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>
        
        {!userEmail ? (
          <p className="text-center text-red-400">Please login to view profile.</p>
        ) : loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <form onSubmit={handleUpdate} className="flex flex-col gap-4">
            <div>
              <label className="text-sm text-gray-400 block mb-1">Role</label>
              <input 
                 value={profile.role} 
                 onChange={(e) => setProfile({...profile, role: e.target.value.toLowerCase()})}
                 className="w-full bg-black border border-gray-600 p-3 rounded focus:outline-none focus:border-blue-500" 
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 block mb-1">Email</label>
              <input 
                 type="email"
                 value={profile.email}
                 onChange={(e) => setProfile({...profile, email: e.target.value})} 
                 className="w-full bg-black border border-gray-600 p-3 rounded focus:outline-none focus:border-blue-500" 
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 block mb-1">Full Name</label>
              <input 
                 value={profile.name} 
                 onChange={(e) => setProfile({...profile, name: e.target.value})} 
                 className="w-full bg-black border border-gray-600 p-3 rounded focus:outline-none focus:border-blue-500" 
              />
            </div>

            <div className="mt-4">
              <label className="text-sm text-gray-400 block mb-1">Change Password (leave blank to keep current)</label>
              <input 
                 type="password"
                 placeholder="Enter new password"
                 value={profile.password} 
                 onChange={(e) => setProfile({...profile, password: e.target.value})} 
                 className="w-full bg-black border border-gray-600 p-3 rounded focus:outline-none focus:border-blue-500" 
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6 border-t border-gray-700 pt-6">
               <a href="/orders" className="flex-1 text-center bg-gray-800 hover:bg-gray-700 py-3 rounded text-blue-400 font-semibold border border-gray-600 transition-all">
                 View Order History
               </a>

               {profile.role === 'admin' && (
                 <a href="/admin" className="flex-1 text-center bg-blue-900/40 hover:bg-blue-900/60 py-3 rounded text-blue-300 font-semibold border border-blue-800 transition-all">
                   Admin Dashboard
                 </a>
               )}
            </div>

            <button type="submit" className="bg-blue-600 hover:bg-blue-700 py-3 rounded mt-4 font-semibold">
              Update Profile
            </button>
            
            <button type="button" onClick={handleLogout} className="bg-red-600 hover:bg-red-700 py-3 rounded mt-2 font-semibold">
              Logout
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
