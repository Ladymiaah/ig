"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy, Timestamp, doc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Trash2, FileText, Plus } from "lucide-react"; 
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
  const push = useMessage(); // Your message provider

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
      push("Unable to sync with cloud storage.", "error");
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
    // Note: For a truly 'pro' feel, you'd trigger a custom Modal here.
    // For now, we use your message provider for the result.
    try {
      await deleteDoc(doc(db, "invoices", invoiceId));
      setInvoices(prev => prev.filter(inv => inv.id !== invoiceId));
      push("Invoice permanently removed.", "success");
    } catch (error) {
      push("Delete failed. Please check your permissions.", "error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-semibold tracking-tight">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Invoices</h1>
            <p className="text-slate-500 font-medium">
              {invoices.length === 0 ? "No records found" : `Managing ${invoices.length} saved records`}
            </p>
          </div>
          <Link 
            href="/InvoiceTemplate" 
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95"
          >
            <Plus size={18} />
            Create New
          </Link>
        </div>

        {/* Invoices List */}
        <div className="grid gap-4">
          {invoices.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-16 text-center shadow-sm">
              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="text-slate-300" size={32} />
              </div>
              <h3 className="text-slate-800 font-bold text-lg">Your tray is empty</h3>
              <p className="text-slate-500 mb-6">Start by creating your first professional invoice.</p>
              <Link href="/InvoiceTemplate" className="inline-block bg-slate-900 text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all">
                Create First Invoice
              </Link>
            </div>
          ) : (
            invoices.map((inv) => (
              <div 
                key={inv.id} 
                className="group p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-100 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-slate-100 text-slate-400 group-hover:bg-blue-600 group-hover:text-white rounded-xl flex items-center justify-center transition-all">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 leading-tight">
                      {inv.invoiceNumber || 'Draft Invoice'}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Client: <span className="font-semibold text-slate-700">{inv.clientCompany || 'Unnamed Client'}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0">
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Amount</p>
                    <p className="text-lg font-black text-slate-900">
                      ₦{Number(inv.totalAmount || 0).toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleDelete(inv.id)}
                      className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                    
                    <Link 
                      href={`/invoice-actions/SavedInvoices/${inv.id}`}
                      className="bg-slate-100 text-slate-900 px-4 py-2.5 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors"
                    >
                      View
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