"use client";

import React from "react";
import { Printer } from "lucide-react";

export default function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* This Style tag ensures only the invoice area is visible during printing */}
      <style jsx global>{`
        @media print {
          /* Hide everything by default */
          body * {
            visibility: hidden;
          }
          /* Show only the invoice preview and its children */
          #invoice-download-area,
          #invoice-download-area * {
            visibility: visible;
          }
          /* Position the invoice at the very top-left of the paper */
          #invoice-download-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            border: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          /* Hide the "Print/Download" buttons during printing */
          button, 
          nav, 
          header, 
          footer {
            display: none !important;
          }
        }
      `}</style>

      <button
        onClick={handlePrint}
        className="flex items-center justify-center gap-2 font-semibold rounded-lg py-2 px-4 border border-[#b4afaf] hover:bg-gray-50 transition-colors"
      >
        <Printer size={16} />
        <span className="hidden sm:inline">Print</span>
        <span className="sm:hidden">Prt</span>
      </button>
    </>
  );
}