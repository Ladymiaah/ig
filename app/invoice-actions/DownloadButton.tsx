"use client";

import React from "react";
import { Printer, Loader2 } from "lucide-react";
import { useReactToPrint } from "react-to-print";

interface DownloadButtonProps {
  contentRef: React.RefObject<HTMLDivElement | null>;
  fileName?: string;
}

export default function DownloadButton({ contentRef, fileName = "invoice" }: DownloadButtonProps) {
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    documentTitle: fileName,
    pageStyle: `
      @media print {
        /* 1. FORCE COLORS & BACKGROUNDS */
        html, body {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          margin: 0 !important;
          padding: 0 !important;
          background-color: white !important;
        }

        /* 2. COMPLETELY REMOVE UI LAYOUT SPACE */
        /* This targets your navbar, action bar, and the buttons flex container */
        nav, 
        header, 
        footer, 
        button, 
        .max-w-5xl, 
        .flex.items-center.gap-2, 
        .max-w-4xl.mx-auto.mb-6 {
          display: none !important;
          height: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden !important;
          position: absolute !important;
          top: -9999px !important;
        }

        /* 3. HIDE EVERYTHING EXCEPT THE INVOICE AREA */
        body > *:not(#invoice-download-area) {
          display: none !important;
        }

        /* 4. FORCE INVOICE TO THE LITERAL TOP OF THE PAGE */
        #invoice-download-area {
          display: block !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          visibility: visible !important;
        }

        /* Ensure all children of the invoice are visible and colored */
        #invoice-download-area * {
          visibility: visible !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }

        /* 5. REMOVE BROWSER-ADDED MARGINS */
        @page {
          margin: 0;
        }
      }
    `,
    onBeforePrint: async () => setIsGenerating(true),
    onAfterPrint: () => setIsGenerating(false),
    onPrintError: () => setIsGenerating(false),
  });

  return (
    <button
      onClick={() => handlePrint()}
      disabled={isGenerating}
      className="flex items-center justify-center gap-2 font-semibold rounded-lg py-2 px-4 border border-[#b4afaf] hover:bg-gray-50 disabled:opacity-50 transition-colors"
    >
      {isGenerating ? (
        <Loader2 size={16} className="animate-spin text-blue-600" />
      ) : (
        <Printer size={16} />
      )}
      <span className="hidden sm:inline">
        {isGenerating ? "Preparing PDF..." : " Download PDF"}
      </span>
      <span className="sm:hidden">{isGenerating ? "..." : "DL"}</span>
    </button>
  );
}