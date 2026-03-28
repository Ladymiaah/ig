"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy, Timestamp, doc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Trash2, ExternalLink, FileText } from "lucide-react"; // Icons for a better UI
import Link from "next/link";
import { useMessage } from "@/app/providers/MessageProvider";

interface Invoice {
  id: string;
  userId: string;
  invoiceNumber?: string;
  clientCompany?: string; 
  totalAmount?: number | string;
  createdAt?: Timestamp;
}

export default function SavedInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const push = useMessage();

  const fetchInvoices = async (uid: string) => {
    try {
      const q = query(
        collection(db, "invoices"),
        where("userId", "==", uid),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const docs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Invoice[];
      setInvoices(docs);
    } catch (err) {
      console.error("Fetch error:", err);
      push("Failed to load invoices. Check your connection.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchInvoices(user.uid);
      } else {
        setInvoices([]);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (invoiceId: string) => {
    if (!confirm("Are you sure you want to delete this invoice?")) return;

    try {
      await deleteDoc(doc(db, "invoices", invoiceId));
      setInvoices(prev => prev.filter(inv => inv.id !== invoiceId));
      push("Invoice deleted successfully", "success");
    } catch (error) {
      push("Error deleting invoice", "error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium">Fetching your invoices...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Dashboard</h1>
            <p className="text-slate-500">You have {invoices.length} saved invoices.</p>
          </div>
          <Link 
            href="/InvoiceTemplate" 
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            + Create New
          </Link>
        </div>

        {/* Invoices List */}
        <div className="grid gap-4">
          {invoices.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-16 text-center">
              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="text-slate-300" size={32} />
              </div>
              <p className="text-slate-500 font-medium mb-4">No invoices found in your cloud storage.</p>
              <Link href="/" className="bg-slate-900 text-white px-6 py-2 rounded-lg text-sm font-bold">
                Start Generating
              </Link>
            </div>
          ) : (
            invoices.map((inv) => (
              <div 
                key={inv.id} 
                className="group p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 rounded-2xl flex items-center justify-center transition-colors">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg leading-tight">
                      {inv.invoiceNumber || 'Untitled'}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Client: <span className="font-semibold text-slate-700">{inv.clientCompany || 'N/A'}</span>
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-wider">
                      {inv.createdAt?.toDate().toLocaleDateString() || "Unknown Date"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-4 md:pt-0">
                  <div className="text-right mr-4">
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Total Amount</p>
                    <p className="text-xl font-black text-slate-900">
                      ₦{Number(inv.totalAmount).toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleDelete(inv.id)}
                      className="p-3 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                      title="Delete Invoice"
                    >
                      <Trash2 size={20} />
                    </button>
                    
<Link 
  href={`/invoice-actions/SavedInvoices/${inv.id}`}
  className="bg-slate-900 text-white px-5 py-3 rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors shadow-sm"
>
  View Details
</Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}