import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto p-12 mt-10 text-center">
        <h1 className="text-4xl font-extrabold mb-8 text-blue-500">About GS Enterprises</h1>
        
        <p className="text-xl text-gray-300 leading-relaxed mb-6">
           At GS Enterprises, we're dedicated to bringing you the highest quality products directly to your doorstep. 
           With years of industry expertise, we source the finest goods, ensuring reliability and customer satisfaction every step of the way.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
           <div className="p-6 bg-gray-900 border border-gray-700 rounded-lg">
             <h3 className="text-xl font-bold mb-3 text-blue-400">Premium Quality</h3>
             <p className="text-gray-400">Every item goes through rigorous quality checks to maintain our high standards.</p>
           </div>
           
           <div className="p-6 bg-gray-900 border border-gray-700 rounded-lg">
             <h3 className="text-xl font-bold mb-3 text-blue-400">Fast Shipping</h3>
             <p className="text-gray-400">We partner with leading couriers to guarantee swift and secure package delivery.</p>
           </div>
           
           <div className="p-6 bg-gray-900 border border-gray-700 rounded-lg">
             <h3 className="text-xl font-bold mb-3 text-blue-400">24/7 Support</h3>
             <p className="text-gray-400">Our customer care team is always online to resolve your issues and track your shipments.</p>
           </div>
        </div>

      </div>
    </div>
  );
}
