import Navbar from "@/components/Navbar";

export default function FAQPage() {
  const faqs = [
    {
      q: "How long does shipping take?",
      a: "Standard shipping usually takes 3-5 business days. You can track your order using the 'Track Order' option in your Order History."
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept Cash on Delivery (COD), UPI, and major Credit/Debit cards at checkout."
    },
    {
      q: "Can I return a product?",
      a: "Yes, we have a 7-day no-questions-asked return policy. Please make sure the product is in its original condition."
    },
    {
      q: "My order arrived damaged. What do I do?",
      a: "Reach out to us via the Contact Us page immediately and we will arrange a free replacement."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="max-w-3xl mx-auto p-12 mt-10">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-blue-500">Frequently Asked Questions</h1>
        
        <div className="space-y-6">
           {faqs.map((faq, i) => (
             <div key={i} className="bg-gray-900 border border-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2 flex items-start gap-2">
                  <span className="text-blue-500">Q:</span> {faq.q}
                </h3>
                <p className="text-gray-400 flex items-start gap-2">
                  <span className="text-green-500 font-bold">A:</span> {faq.a}
                </p>
             </div>
           ))}
        </div>

      </div>
    </div>
  );
}
