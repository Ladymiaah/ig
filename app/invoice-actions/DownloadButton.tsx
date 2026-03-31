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