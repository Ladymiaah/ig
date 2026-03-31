"use client";

import React from "react";
import { Clock, RefreshCcw, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

type InvoiceType = "progress" | "credit" | "past-due";

interface SpecialtyCardProps {
  type?: InvoiceType; // Made optional to prevent build crashes
}

const CONFIG = {
  progress: {
    title: "Progress Invoice",
    description: "Bill for a percentage of a large project. Perfect for Web Dev.",
    icon: <Clock size={24} />,
    color: "#3b82f6", // Blue
    bg: "#eff6ff",
    link: "/invoice/SpecialtyInvoiceCard/progress",
  },
  credit: {
    title: "Credit Memo",
    description: "Issued to a client for a refund or overpayment correction.",
    icon: <RefreshCcw size={24} />,
    color: "#0d9488", // Teal
    bg: "#f0fdfa",
    link: "/invoice/SpecialtyInvoiceCard/credit",
  },
  "past-due": {
    title: "Past Due Invoice",
    description: "A final notice for unpaid bills. Includes late fee options.",
    icon: <AlertCircle size={24} />,
    color: "#dc2626", // Red
    bg: "#fef2f2",
    link: "/invoice/SpecialtyInvoiceCard/past-due",
  },
};

export default function SpecialtyInvoiceCard({ type = "progress" }: SpecialtyCardProps) {
  // Fallback to 'progress' configuration if type is undefined
  const info = CONFIG[type] || CONFIG.progress;

  return (
    <div 
      className="group bg-white border border-slate-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:border-transparent relative overflow-hidden flex flex-col h-full"
      style={{ borderLeft: `6px solid ${info.color}` }}
    >
      {/* Icon & Label */}
      <div className="flex items-center gap-3 mb-4">
        <div 
          className="p-3 rounded-xl transition-colors" 
          style={{ backgroundColor: info.bg, color: info.color }}
        >
          {info.icon}
        </div>
        <h3 className="text-xl font-bold text-slate-900">{info.title}</h3>
      </div>

      {/* Description */}
      <p className="text-slate-500 text-sm mb-8 leading-relaxed">
        {info.description}
      </p>

      {/* CTA Button */}
      <Link 
        href={info.link}
        className="mt-auto flex items-center justify-between group/btn w-full px-4 py-3 rounded-xl font-bold transition-all hover:brightness-95 active:scale-[0.98]"
        style={{ backgroundColor: info.bg, color: info.color }}
      >
        <span>Create {info.title}</span>
        <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}