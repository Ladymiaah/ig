"use client";

import React, { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface DownloadButtonProps {
  targetId: string;
  fileName?: string;
}

export default function DownloadButton({ targetId, fileName = "invoice.pdf" }: DownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    const element = document.getElementById(targetId);
    if (!element) return;

    try {
      setIsGenerating(true);
      
      // Capture the element as a canvas
      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // Allows loading Cloudinary images
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      
      // Initialize PDF (Portrait, Millimeters, A4)
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(fileName);
    } catch (error) {
      console.error("PDF Generation Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating}
      className="flex items-center justify-center gap-2 font-semibold rounded-lg py-2 px-4 border border-[#b4afaf] hover:bg-gray-50 disabled:opacity-50"
    >
      {isGenerating ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <Download size={16} />
      )}
      <span className="hidden sm:inline">
        {isGenerating ? "Generating..." : "Download"}
      </span>
      <span className="sm:hidden">{isGenerating ? "..." : "DL"}</span>
    </button>
  );
}