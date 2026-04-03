import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GS Enterprises",
  description: "Ecommerce Website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className="flex flex-col min-h-[100vh]">
        <CartProvider>{children}</CartProvider>
        
        <footer className="w-full bg-[#111] text-gray-500 py-6 mt-auto">
           <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-10 text-sm">
              <p>&copy; {new Date().getFullYear()} GS Enterprises. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                 <a href="/about" className="hover:text-blue-400 transition-all font-semibold">About Us</a>
                 <a href="/faq" className="hover:text-blue-400 transition-all font-semibold">FAQ</a>
              </div>
           </div>
        </footer>
      </body>
    </html>
    );
}