"use client";

import Link from "next/link";
import Image from "next/image";
import { Twitter, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-800 bg-black py-8 text-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="logo" width={40} height={40} />
            <div>
              <div className="text-lg font-semibold text-accent">Invoice</div>
              <div className="text-sm text-gray-300">Simple invoicing for freelancers & teams</div>
            </div>
          </div>

          <nav>
            <ul className="flex gap-6 text-sm text-gray-300">
              <li><a href="#feature" className="hover:underline hover:text-white">Features</a></li>
              <li><a href="#pricing" className="hover:underline hover:text-white">Pricing</a></li>
              <li><a href="#about" className="hover:underline hover:text-white">About</a></li>
              <li><a href="#contact" className="hover:underline hover:text-white">Contact</a></li>
              <li><a href="#faq" className="hover:underline hover:text-white">FAQ</a></li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <a href="#" aria-label="Twitter" className="text-gray-300 hover:text-primary transition">
              <Twitter size={18} />
            </a>
            <a href="#" aria-label="GitHub" className="text-gray-300 hover:text-primary transition">
              <Github size={18} />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-gray-300 hover:text-primary transition">
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-800 pt-6 text-sm text-gray-300 flex flex-col sm:flex-row sm:justify-between gap-4">
          <div>© {new Date().getFullYear()} Invoice — All rights reserved.</div>
          <div className="flex gap-4">
            <Link href="#" className="hover:underline text-gray-300">Terms</Link>
            <Link href="#" className="hover:underline text-gray-300">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
