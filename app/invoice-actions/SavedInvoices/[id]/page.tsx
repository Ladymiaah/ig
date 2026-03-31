"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ArrowLeft, Loader2, AlertCircle, RefreshCcw } from "lucide-react";
import Link from "next/link";

// --- Import Your 3 Templates ---
import FormPreview from "@/app/invoice/new/FormPreview";
import ServiceFormPreview from "@/app/invoice/services/FormPreview";
import SpecialtyFormPreview from "@/app/invoice/SpecialtyInvoiceCard/SpecialtyFormPreview";

export default function ViewSavedInvoice() {
  const params = useParams();
  const router = useRouter();
  
  // FIX: Ensure ID is grabbed correctly even if params is still hydrating
  const id = params?.id as string;

  const [invoice, setInvoice] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 1. Debugging: Check if ID is actually captured
    console.log("URL ID captured:", id);

    if (!id) {
      // If no ID after 5 seconds, show an error
      const timeout = setTimeout(() => {
        if (loading) setError("Could not find the Invoice ID in the URL.");
      }, 5000);
      return () => clearTimeout(timeout);
    }

    const fetchInvoice = async () => {
      try {
        setLoading(true);
        const docRef = doc(db, "invoices", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Invoice data found!");
          setInvoice(docSnap.data());
          setError(null);
        } else {
          setError("Invoice not found in the database.");
        }
      } catch (err: any) {
        console.error("Firebase Error:", err);
        setError("Failed to connect to the database. Check your internet.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  // --- 1. Loading State ---
  if (loading && !error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
        <p className="text-slate-600 font-bold tracking-tight">Loading Invoice Template...</p>
        <p className="text-slate-400 text-xs mt-2 italic">Fetching ID: {id || "Scanning URL..."}</p>
      </div>
    );
  }

  // --- 2. Error State ---
  if (error || !invoice) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
        <AlertCircle className="text-red-500 mb-4" size={48} />
        <h2 className="text-2xl font-bold text-slate-800">Something went wrong</h2>
        <p className="text-slate-500 mb-6 max-w-xs mx-auto">{error}</p>
        <div className="flex gap-4">
            <button onClick={() => window.location.reload()} className="flex items-center gap-2 bg-slate-200 px-6 py-2 rounded-xl font-bold">
                <RefreshCcw size={16}/> Retry
            </button>
            <Link href="/invoice-actions/SavedInvoices" className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold">
                Dashboard
            </Link>
        </div>
      </div>
    );
  }

  
  const renderTemplate = () => {
  // 1. Check for Specialty
  if (invoice.projectStage || invoice.refundType || invoice.templateType === "Specialty") {
    return <SpecialtyFormPreview 
          data={invoice} 
          items={invoice.items || []} 
          specialtyType={invoice.specialtyType || invoice.type} 
          specialtyColor={invoice.specialtyColor || "#3b82f6"}
          // FIX: Pass totalAmount from Firebase to the 'total' prop
          total={invoice.totalAmount || 0} 
          isPreview={false}
        />;
  }

  // 2. Check for Service (Only if it's explicitly labeled Service)
  if (invoice.templateType === "Service") {
    return <ServiceFormPreview data={invoice} items={invoice.items || []} isPreview={false} />;
  }

  // 3. Default to Retail (Everything else)
  return <FormPreview data={invoice} items={invoice.items || []} isPreview={false} />;
};

  return (
    <div className="min-h-screen bg-slate-100 pb-20">
      <div className="bg-white border-b border-slate-200 p-4 mb-6 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <button 
            onClick={() => router.push("/invoice-actions/SavedInvoices")} 
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold"
          >
            <ArrowLeft size={18} /> Back to List
          </button>
          <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            {invoice.invoiceNumber || "Invoice Preview"}
          </div>
          <button 
            onClick={() => window.print()} 
            className="bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 shadow-md"
          >
            Download PDF
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-200">
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}