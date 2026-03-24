"use client";

import React, { useState } from "react";
import { RotateCcw, AlertTriangle } from "lucide-react";

interface ResetButtonProps {
  onReset: () => void; // What happens when they confirm?
  title?: string;
  message?: string;
}

export default function ResetButton({ 
  onReset, 
  title = "Clear all data?", 
  message = "This will permanently delete all your invoice details and items. This action cannot be undone." 
}: ResetButtonProps) {
  const [showModal, setShowModal] = useState(false);

  const handleConfirm = () => {
    onReset();
    setShowModal(false);
  };

  return (
    <>
      {/* TRIGGER BUTTON */}
      <button 
        type="button"
        onClick={() => setShowModal(true)}
        className="flex items-center justify-center gap-2 border border-[#ef4444] rounded-lg px-3 py-2 text-[#ef4444] hover:bg-[#fef2f2] transition-colors"
      >
        <RotateCcw size={16} />
        <span className="text-sm hidden sm:inline">Reset</span>
      </button>

      {/* MODAL OVERLAY */}
      {showModal && (
        <div className="fixed inset-0 bg-[#000000]/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-[#ffffff] rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-[#f1f5f9] animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 text-[#dc2626] mb-4">
              <div className="bg-[#fef2f2] p-2 rounded-full">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#1e293b]">{title}</h3>
            </div>
            
            <p className="text-[#64748b] text-sm mb-8 leading-relaxed">
              {message}
            </p>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border border-[#e2e8f0] rounded-xl font-bold text-[#64748b] hover:bg-[#f8fafc] transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirm}
                className="flex-1 px-4 py-2 bg-[#dc2626] text-[#ffffff] rounded-xl font-bold hover:bg-[#b91c1c] shadow-lg shadow-[#fee2e2] transition-all"
              >
                Yes, Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}