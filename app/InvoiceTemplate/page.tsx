"use client";

import Link from "next/link";
import { ArrowRight, Zap, ShoppingBag } from "lucide-react";
import SpecialtyInvoiceCard from "../invoice/SpecialtyInvoiceCard/page";

export default function InvoiceTemplatePage() {
  const mainTemplates = [
    {
      title: "Service Invoice",
      description: "Best for freelancers, consultants, and contractors.",
      link: "/invoice/services",
      img: "/service-img.png", // Updated to .jpg to match your files
      icon: <Zap size={18} />,
      tag: "Popular"
    },
    {
      title: "Retail Invoice",
      description: "Perfect for physical goods and e-commerce stores.",
      link: "/invoice/new",
      img: "/retail-img.png", // Updated to .jpg to match your files
      icon: <ShoppingBag size={18} />,
      tag: "Essential"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] px-6 sm:px-20 py-8 md:py-16">
      {/* HEADER SECTION */}
      <div className="flex flex-col gap-4 md:gap-6 mb-12">
      <div className="max-w-6xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-[#1e293b] tracking-tight">
          Select a Template
        </h1>
        <p className="text-[#64748b] mt-2 text-lg">
          Choose the best layout for your business needs and start billing.
        </p>
      </div>
      <Link href={"/invoice-actions/SavedInvoices"}> saved Invoices</Link>
      </div>

      {/* MAIN TEMPLATES GRID (Service & Retail) */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-20">
        {mainTemplates.map((template, index) => (
          <div 
            key={index} 
            className="group bg-[#ffffff] rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#7e22ce] transition-all duration-300 flex flex-col"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-[#f1f5f9]">
              <img 
                src={template.img} 
                alt={template.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-[#ffffff]/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-[#7e22ce] uppercase tracking-wider border border-[#e9d5ff]">
                {template.tag}
              </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-2 mb-2 text-[#7e22ce]">
                {template.icon}
                <h2 className="text-xl font-bold text-[#334155]">{template.title}</h2>
              </div>
              <p className="text-[#64748b] text-sm leading-relaxed mb-6">
                {template.description}
              </p>
              <Link 
                href={template.link} 
                className="mt-auto flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#ffffff] border border-[#e2e8f0] text-[#1e293b] font-bold rounded-xl group-hover:bg-[#7e22ce] group-hover:text-[#ffffff] group-hover:border-[#7e22ce] transition-all"
              >
                Use Template
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* SPECIALTY INVOICES SECTION */}
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 border-t border-[#e2e8f0] pt-12">
            <h2 className="text-2xl font-bold text-[#1e293b]">Specialized Billing</h2>
            <p className="text-[#64748b] text-sm">Advanced documents for specific project needs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SpecialtyInvoiceCard type="progress" />
          <SpecialtyInvoiceCard type="credit" />
          <SpecialtyInvoiceCard type="past-due" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-20 text-center">
        <p className="text-[#64748b]">
  Need a custom layout? {" "}
  <a 
    href="mailto:doyinmariam001@gmail.com" 
    className="text-[#7e22ce] font-bold hover:underline"
  >
    Contact ZIG 
  </a>
   {" "} for bespoke development.
</p>
      </div>
    </div>
  );
}