"use client";

import { MenuIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="">
      <nav className="py-10 sm:py-16 px-10 sm:px-20 flex justify-between items-center ">
        {/* logo & title */}
<div className="flex items-center gap-3 ">
    <Image src="/logo.png" alt="logo" width={40} height={40}  />
    <Link href="/#hero" className="text-2xl sm:text-4xl text-accent font-bold ">Invoice</Link>
     
</div>

{/* navgation links */}

<ul className="flex gap-6 text-sm text-muted  ">
  <li className="hidden lg:block"><a href="#feature" className="hover:underline">Features</a></li>
   <li className="hidden lg:block"><a href="#pricing" className="hover:underline">Pricing</a></li>
  <li className="hidden lg:block"><a href="#about" className="hover:underline">About us</a></li>
  <li className="hidden lg:block"><a href="#contact" className="hover:underline">Contact us</a></li>
  <li className="hidden lg:block"><a href="#faq" className="hover:underline">FAQ</a></li>
 


</ul>

{/* cta buttons */}
<div className="flex items-center gap-10 ">
  <Link href="/Login" className="text-[#270d3b] font-bold hidden sm:block text-xl">
    LogIn
  </Link>
  <Link href="/SignIn" className="border border-[#270d3b] shadow-xl px-4  py-2  text-base rounded-xl hover:bg-[#6b21a8]/90 transition">
    Try It Free
  </Link>
</div>
        {/* mobile menu button  */}
            <button className="sm:hidden text-[#a45ca9]"  onClick={() => setIsOpen(true)}>
                <MenuIcon size={32}/>
            </button>
      </nav>
      {/* mobile menu  */}

              {/* Sidebar Overlay (Mobile) */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 flex">
          <div className="w-48 bg-[#f7f7f7] shadow-xl p-6 space-y-6 relative">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-[#862886]"
              onClick={() => setIsOpen(false)}
            >
              <X size={28} />
            </button>

            {/* Sidebar Links */}
            <ul className="flex flex-col text-lg text-[#3f3a3a] space-y-4 mt-12 ">
             <li><a href="#feature">Feature</a></li>
               <li><a href="#pricing">Pricing</a></li>
                 <li><a href="#about">About Us</a></li>   
                    <li><a href="#contact">Contact Us</a></li>
                    <li ><a href="#faq">FAQ</a></li>
                   

            <li><Link href="/Login" className="text-[#3f3a3a] font-medium">Log In</Link></li>
            </ul>
          </div>

          {/* Click outside closes sidebar */}
          <div
            className="flex-1"
            onClick={() => setIsOpen(false)}
          ></div>
        </div>
        )}
    </header>
  );
}