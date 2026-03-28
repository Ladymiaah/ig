"use client";

import React, { useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { db, auth } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useMessage } from "@/app/providers/MessageProvider";

interface SaveButtonProps {
  invoiceData: any; // This will catch whatever data you pass it
  total: number;    // The final price to save
}

export default function SaveButton({ invoiceData, total }: SaveButtonProps) {
  const [isSaving, setIsSaving] = useState(false);
  const push = useMessage();

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) {
      push("Please log in to save this invoice.", "error");
      return;
    }

    setIsSaving(true);
    try {
      await addDoc(collection(db, "invoices"), {
        ...invoiceData,           // Automatically saves all form fields
        totalAmount: total,       // Saves the final price
        userId: user.uid,         // Links it to you
        createdAt: serverTimestamp(),
      });
      push("Invoice saved successfully!", "success");
    } catch (error) {
      console.error("Save Error:", error);
      push("Failed to save. check your connection.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={isSaving}
      className="flex items-center justify-center gap-2 font-semibold rounded-lg py-2 px-4 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
    >
      {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
      <span>{isSaving ? "Saving..." : "Save to Cloud"}</span>
    </button>
  );
}