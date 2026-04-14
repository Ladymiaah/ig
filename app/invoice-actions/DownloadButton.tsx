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
        /* 1. Reset Page Margins */
        @page { 
          size: auto; 
          margin: 0mm; 
        }

        /* 2. Hide everything by default */
        body * { 
          visibility: hidden !important; 
        }

        /* 3. Show only the invoice area */
        #invoice-download-area,
        #invoice-download-area * {
          visibility: visible !important;
        }

        /* 4. Fix for Mobile: Completely remove the UI "boxes" from the layout */
        /* We target common tags and the specific layout classes used in your page */
        nav, header, footer, button, .max-w-5xl, aside {
          display: none !important;
          height: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        /* 5. Force the preview to the top-left of the PDF */
        #invoice-download-area {
          position: absolute !important;
          left: 0 !important;
          top: 0 !important;
          width: 100% !important;
          margin: 0 !important;
          padding: 10mm !important; /* Adds a clean margin inside the PDF */
          visibility: visible !important;
          display: block !important;
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