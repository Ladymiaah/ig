"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowLeft, Edit, FileText } from "lucide-react";
import FormPreview from "./FormPreview";
import FormTable from "./FormTable";

import DownloadButton from "@/app/invoice-actions/DownloadButton";
import ResetButton from "@/app/invoice-actions/ResetButton";
import SaveButton from "@/app/invoice-actions/SaveButton";
import ImageUpload from "@/app/invoice-actions/ImageUpload";
import Link from "next/link";

export default function InvoicePage() {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // FIXED: Added explicit fallback return for build-time
  const [formData, setFormData] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("invoice-form-data");
      if (saved) return JSON.parse(saved);
    }
    return {
      logoUrl: "",
      companyName: "",
      invoiceAuthor: "",
      companyAddress: "",
      companyCity: "",
      companyCountry: "",
      clientCompany: "",
      clientAddress: "",
      invoiceNumber: "",
      invoiceDate: new Date().toISOString().split('T')[0],
      invoiceDueDate: "",
    };
  });

  // FIXED: Added explicit fallback return for build-time
  const [tableData, setTableData] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("invoice-table-data");
      if (saved) return JSON.parse(saved);
    }
    return [{
      id: "initial-id", // crypto.randomUUID() can fail in some build environments
      itemDescription: "",
      qty: 1,
      unitPrice: 0,
      tax: 0,
      amount: 0,
    }];
  });

  useEffect(() => { 
    setIsMounted(true); 
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("invoice-form-data", JSON.stringify(formData));
      localStorage.setItem("invoice-table-data", JSON.stringify(tableData));
    }
  }, [formData, tableData, isMounted]);

  // SAFE ACCESS: Ensuring tableData is treated as an array
  const totalAmount = (tableData || []).reduce(
    (acc: number, item: any) => acc + (Number(item.amount) || 0), 
    0
  );

  // SAFE ACCESS: Added optional chaining and fallbacks to prevent "length of undefined"
  const hasValidItems = (tableData?.length > 0) && 
    tableData.every((item: any) => item?.itemDescription?.trim()?.length > 0);
    
  const canTogglePreview = isPreview || hasValidItems;

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-[#f8fafc] py-6 md:py-10 px-4 md:px-20">
      {/* ACTION BAR */}
      <div className="max-w-5xl mx-auto mb-6 flex flex-wrap justify-between items-center gap-4 bg-[#ffffff] p-4 rounded-xl shadow-sm border border-[#e2e8f0]">
        <div className="flex items-center gap-3">
          {!isPreview && (
            <Link href="/InvoiceTemplate" className="p-2 rounded-lg border border-[#e2e8f0] text-[#64748b] hover:bg-[#f1f5f9]">
              <ArrowLeft size={20} />
            </Link>
          )}
          <h1 className="text-lg font-bold text-[#334155]">Retail Invoice</h1>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => canTogglePreview && setIsPreview(!isPreview)}
            disabled={!canTogglePreview}
            className="flex items-center justify-center gap-2 font-semibold rounded-lg py-2 px-4 bg-[#f1f5f9] hover:bg-[#e2e8f0] transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >    
            {isPreview ? <><Edit size={16} /> Edit</> : <><FileText size={16} /> Preview</>}
          </button>
          
          {isPreview && (
            <div className="flex items-center gap-2">
              <DownloadButton 
                contentRef={invoiceRef} 
                fileName={`Invoice_${formData.invoiceNumber || "Draft"}`} 
              />
              <SaveButton 
                invoiceData={{ ...formData, items: tableData, templateType: "Retail" }} 
                total={totalAmount} 
              />
            </div>
          )}

          <ResetButton onReset={() => {
            if (typeof window !== "undefined") {
              localStorage.removeItem("invoice-form-data");
              localStorage.removeItem("invoice-table-data");
              window.location.reload();
            }
          }} />
        </div>
      </div>

      {/* CONTENT AREA */}
      {isPreview ? (
        <div ref={invoiceRef} id="invoice-download-area" className="w-full max-w-4xl mx-auto">
           <FormPreview data={formData} items={tableData} isPreview={false} />
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-[#ffffff] rounded-2xl shadow-xl border border-[#e2e8f0] p-6 md:p-10">
          <ImageUpload onUpload={(url) => setFormData((p:any)=>({...p, logoUrl: url}))} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-[#6b21a8] uppercase">From:</h3>
              <input name="companyName" value={formData.companyName} onChange={(e)=>setFormData({...formData, companyName: e.target.value})} placeholder="Company Name" className="w-full text-lg font-bold outline-none border-b border-[#f1f5f9] focus:border-[#6b21a8]" />
              <textarea name="companyAddress" value={formData.companyAddress} onChange={(e)=>setFormData({...formData, companyAddress: e.target.value})} placeholder="Address" className="w-full text-sm outline-none text-[#64748b] h-20 resize-none" />
            </div>
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-[#6b21a8] uppercase">Bill To:</h3>
              <input name="clientCompany" value={formData.clientCompany} onChange={(e)=>setFormData({...formData, clientCompany: e.target.value})} placeholder="Client Name" className="w-full text-lg font-bold outline-none border-b border-[#f1f5f9] focus:border-[#6b21a8]" />
              <textarea name="clientAddress" value={formData.clientAddress} onChange={(e)=>setFormData({...formData, clientAddress: e.target.value})} placeholder="Client Address" className="w-full text-sm outline-none text-[#64748b] h-20 resize-none" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#f8fafc] p-5 rounded-xl border border-[#e2e8f0] mt-8">
              <div>
                <label className="text-[10px] font-bold text-[#94a3b8] uppercase">Invoice #</label>
                <input value={formData.invoiceNumber} onChange={(e)=>setFormData({...formData, invoiceNumber: e.target.value})} className="bg-transparent font-bold outline-none w-full" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-[#94a3b8] uppercase">Date</label>
                <input type="date" value={formData.invoiceDate} onChange={(e)=>setFormData({...formData, invoiceDate: e.target.value})} className="bg-transparent outline-none w-full" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-[#94a3b8] uppercase">Due Date</label>
                <input type="date" value={formData.invoiceDueDate} onChange={(e)=>setFormData({...formData, invoiceDueDate: e.target.value})} className="bg-transparent outline-none w-full" />
              </div>
          </div>

          <div className="mt-8">
            <FormTable tableData={tableData} setTableData={setTableData} />
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t pt-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => hasValidItems && setIsPreview(true)}
                disabled={!hasValidItems}
                className="bg-[#6b21a8] text-[#ffffff] px-8 py-3 rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-700"
              >
                Preview Invoice
              </button>
              {!hasValidItems && (
                <p className="text-sm text-red-600">Enter item descriptions for all rows before previewing.</p>
              )}
            </div>
            <div className="text-right">
                <p className="text-[#94a3b8] text-xs font-bold uppercase">Total Due</p>
                <p className="text-3xl font-black text-[#6b21a8]">₦{totalAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}