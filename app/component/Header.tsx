"use client";

import { MenuIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50 w-full">
      <nav className="max-w-7xl mx-auto py-4 sm:py-6 px-6 sm:px-12 flex justify-between items-center">
        {/* logo & title */}
        <Link href="/#hero" className="flex items-center gap-2 group">
          <Image src="/logo1.png" alt="logo" width={50} height={50} className="group-hover:scale-105 transition-transform" />
          <h1 className="text-2xl sm:text-3xl text-[#a45ca9] font-black tracking-tight">ZIG</h1>
        </Link>

        {/* navigation links - Using deep slate for maximum readability */}
        <ul className="hidden lg:flex gap-8 text-sm font-bold text-slate-600">
          <li><a href="/#feature" className="hover:text-[#6b21a8] transition-colors">Features</a></li>
          <li><a href="/#pricing" className="hover:text-[#6b21a8] transition-colors">Pricing</a></li>
          <li><a href="/#about" className="hover:text-[#6b21a8] transition-colors">About us</a></li>
          <li><a href="/#contact" className="hover:text-[#6b21a8] transition-colors">Contact us</a></li>
          <li><a href="/#faq" className="hover:text-[#6b21a8] transition-colors">FAQ</a></li>
        </ul>

        {/* cta buttons */}
        <div className="flex items-center gap-6">
          <Link href="/firebase-auth/Login" className="text-slate-900 font-bold hidden sm:block text-lg hover:text-[#6b21a8] transition-colors">
            Log In
          </Link>
          <Link href="/firebase-auth/SignIn" className="hidden sm:block bg-white border-2 border-[#270d3b] px-6 py-2.5 text-slate-900 font-bold rounded-xl shadow-sm hover:bg-slate-50 active:scale-95 transition-all">
            Try It Free
          </Link>
          
          {/* mobile menu button */}
          <button className="lg:hidden text-[#a45ca9] p-2 hover:bg-slate-50 rounded-lg transition-colors" onClick={() => setIsOpen(true)}>
            <MenuIcon size={28}/>
          </button>
        </div>
      </nav>

      {/* Sidebar Overlay (Mobile) */}
      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] flex justify-end">
          <div className="w-64 bg-white h-full shadow-2xl p-8 flex flex-col animate-in slide-in-from-right duration-300">
            <button
              className="self-end text-slate-400 hover:text-slate-900 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <X size={28} />
            </button>

            <ul className="flex flex-col text-lg font-bold text-slate-800 space-y-6 mt-10">
              <li><a href="#feature" onClick={() => setIsOpen(false)}>Features</a></li>
              <li><a href="#pricing" onClick={() => setIsOpen(false)}>Pricing</a></li>
              <li><a href="#about" onClick={() => setIsOpen(false)}>About Us</a></li>
              <li><a href="#contact" onClick={() => setIsOpen(false)}>Contact Us</a></li>
              <li><a href="#faq" onClick={() => setIsOpen(false)}>FAQ</a></li>
              <hr className="border-slate-100" />
              <li><Link href="/firebase-auth/Login" className="text-[#6b21a8]">Log In</Link></li>
              <li><Link href="/firebase-auth/SignIn" className="block w-full text-center bg-[#6b21a8] text-white py-3 rounded-xl shadow-lg shadow-purple-100">Try It Free</Link></li>
            </ul>
          </div>

          <div className="flex-1" onClick={() => setIsOpen(false)}></div>
        </div>
      )}
    </header>
  );
}