"use client";

import { useEffect, useState, useRef } from "react";
import { Edit, FileText, Briefcase } from "lucide-react";
import DownloadButton from "@/app/invoice-actions/DownloadButton";
import ResetButton from "@/app/invoice-actions/ResetButton";
import ImageUpload from "@/app/invoice-actions/ImageUpload";
import SpecialtyFormPreview from "./SpecialtyFormPreview";
import SpecialtyFormTable from "./SpecialtyFormTable";
import Link from "next/link";
import SaveButton from "@/app/invoice-actions/SaveButton";

interface BaseProps {
  type: "progress" | "credit" | "past-due";
  accentColor: string;
  storageKey: string;
  label: string;
}

export default function BaseInvoicePage({ type, accentColor, storageKey, label }: BaseProps) {
  const [isPreview, setIsPreview] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const invoiceRef = useRef<HTMLDivElement>(null);

  const defaultFormData = {
    logoUrl: "",
    companyName: "",
    companyAddress: "",
    clientCompany: "",
    clientAddress: "",
    invoiceNumber: `${type.toUpperCase().slice(0, 3)}-${Date.now().toString().slice(-4)}`,
    invoiceDate: new Date().toISOString().split('T')[0],
    invoiceDueDate: "",
    // Specialty Fields
    projectStage: type === "progress" ? "Phase 1" : "",
    completionRate: type === "progress" ? "50" : "0",
    lateFee: type === "past-due" ? "5" : "0",
    referenceInvoice: "",
    refundType: "Store Credit", 
    notes: type === "past-due" ? "FINAL NOTICE: Please remit payment immediately." : "Thank you for your business!",
  };

  const [formData, setFormData] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : defaultFormData;
    }
    return defaultFormData;
  });

  const [tableData, setTableData] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`${storageKey}-table`);
      return saved ? JSON.parse(saved) : [{ itemDescription: "", qty: 1, unitPrice: 0, tax: 0, amount: 0 }];
    }
    return [];
  });

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem(storageKey, JSON.stringify(formData));
      localStorage.setItem(`${storageKey}-table`, JSON.stringify(tableData));
    }
  }, [formData, tableData, isMounted, storageKey]);

  const subTotal = tableData.reduce((acc: number, item: any) => acc + (Number(item.amount) || 0), 0);
  const totalAmount = type === "past-due" 
    ? subTotal + (subTotal * (Number(formData.lateFee) / 100)) 
    : subTotal;

  const hasValidItems = tableData.length > 0 && tableData.every((item: any) => item.itemDescription?.trim().length > 0);
  const canTogglePreview = isPreview || hasValidItems;

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-[#f8fafc] py-10 px-6 md:px-20">
      {/* TOOLBAR */}
      <div className="max-w-5xl mx-auto mb-8 flex flex-wrap justify-between items-center gap-4 bg-[#ffffff] p-4 rounded-xl shadow-sm border border-[#e2e8f0]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg" style={{ backgroundColor: `${accentColor}15`, color: accentColor }}>
            <Link href="/InvoiceTemplate" >
                <Briefcase size={24} />
            </Link>
          </div>
          <h1 className="text-xl font-bold text-[#334155]">{label}</h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => canTogglePreview && setIsPreview(!isPreview)}
            disabled={!canTogglePreview}
            className="flex items-center gap-2 font-semibold rounded-lg py-2 px-4 bg-[#f1f5f9] hover:bg-[#e2e8f0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPreview ? <><Edit size={16} /> Edit Form</> : <><FileText size={16} /> Preview</>}
          </button>
          
          {isPreview && (
  <div className="flex gap-2 no-print"> 
  
    <DownloadButton 
      contentRef={invoiceRef} 
      fileName={label} 
    />
    
  </div>
)}

 {isPreview && (
            <div>
          <SaveButton 
            invoiceData={{ ...formData, items: tableData, specialtyType: type, templateType: "Specialty" }} 
            total={totalAmount} 
          />
          </div> 
          )}

          <ResetButton onReset={() => { localStorage.clear(); window.location.reload(); }} />
          
         
        </div>
      </div>

      {isPreview ? (
        <div ref={invoiceRef} id="invoice-download-area">
           <SpecialtyFormPreview 
             data={formData} 
             items={tableData} 
             specialtyType={type} 
             specialtyColor={accentColor} 
             total={totalAmount} 
             isPreview={true} 
           />
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-[#ffffff] rounded-2xl shadow-xl overflow-hidden border border-[#e2e8f0]">
          {/* Form Header */}
          <div className="p-6 text-[#ffffff] flex justify-between items-center" style={{ backgroundColor: accentColor }}>
             <ImageUpload onUpload={(url) => setFormData((p:any)=>({...p, logoUrl: url}))} />
             <div className="text-right">
                <p className="opacity-80 text-xs uppercase font-bold tracking-widest">{type === "credit" ? "Total Refund" : "Amount Due"}</p>
                <p className="text-3xl font-bold">₦{totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
             </div>
          </div>

          <form className="p-8 space-y-8" onSubmit={(e) => e.preventDefault()}>
            {/* Credit Logic: Refund Details */}
            {type === "credit" && (
              <div className="grid md:grid-cols-2 gap-6 bg-[#f0fdfa] p-5 rounded-2xl border border-[#ccfbf1]">
                <div>
                  <label className="block text-[10px] font-black text-[#0d9488] uppercase mb-2 tracking-widest">Ref. Invoice #</label>
                  <input 
                    placeholder="INV-001" 
                    className="w-full bg-[#ffffff] border border-[#99f6e4] rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[#0d9488]" 
                    value={formData.referenceInvoice || ""} 
                    onChange={(e) => setFormData({...formData, referenceInvoice: e.target.value})} 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-[#0d9488] uppercase mb-2 tracking-widest">Refund Method</label>
                  <div className="flex gap-4 mt-2">
                    {["Store Credit", "Cash Refund"].map(m => (
                      <label key={m} className="flex items-center gap-2 text-sm font-bold text-[#134e4a] cursor-pointer">
                        <input 
                          type="radio" 
                          checked={formData.refundType === m} 
                          onChange={() => setFormData({...formData, refundType: m})} 
                          className="accent-[#0d9488]" 
                        /> {m}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* From/To Section */}
            <div className="grid md:grid-cols-2 gap-12">
               <div className="space-y-3">
                <h3 className="text-sm font-black uppercase tracking-widest" style={{ color: accentColor }}>From:</h3>
                <input 
                  value={formData.companyName} 
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})} 
                  placeholder="Your Business Name" 
                  className="w-full text-lg font-bold outline-none border-b border-transparent focus:border-[#e2e8f0] transition-all" 
                />
                <textarea 
                  value={formData.companyAddress} 
                  onChange={(e) => setFormData({...formData, companyAddress: e.target.value})} 
                  placeholder="Business Address" 
                  className="w-full text-sm outline-none text-[#64748b] resize-none h-20 bg-transparent" 
                />
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-black uppercase tracking-widest" style={{ color: accentColor }}>Bill To:</h3>
                <input 
                  value={formData.clientCompany} 
                  onChange={(e) => setFormData({...formData, clientCompany: e.target.value})} 
                  placeholder="Client/Company Name" 
                  className="w-full text-lg font-bold outline-none border-b border-transparent focus:border-[#e2e8f0] transition-all" 
                />
                <textarea 
                  value={formData.clientAddress} 
                  onChange={(e) => setFormData({...formData, clientAddress: e.target.value})} 
                  placeholder="Client Address" 
                  className="w-full text-sm outline-none text-[#64748b] resize-none h-20 bg-transparent" 
                />
              </div>
            </div>

            {/* Meta Info Grid */}
            <div className="bg-[#f8fafc] p-4 rounded-xl border border-[#e2e8f0] grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">Invoice #</label>
                  <input value={formData.invoiceNumber} onChange={(e) => setFormData({...formData, invoiceNumber: e.target.value})} className="bg-transparent font-bold outline-none w-full text-[#1e293b]" />
                </div>
                {type !== "credit" && (
                  <div>
                    <label className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">Due Date</label>
                    <input type="date" value={formData.invoiceDueDate || ""} onChange={(e) => setFormData({...formData, invoiceDueDate: e.target.value})} className="bg-transparent outline-none w-full text-[#1e293b] font-medium" />
                  </div>
                )}
                {type === "progress" && (
                  <div>
                    <label className="text-[10px] font-bold text-[#3b82f6] uppercase tracking-widest">Completion %</label>
                    <input type="number" value={formData.completionRate || "0"} onChange={(e) => setFormData({...formData, completionRate: e.target.value})} className="bg-transparent font-bold w-full text-[#1e293b]" />
                  </div>
                )}
                {type === "past-due" && (
                  <div>
                    <label className="text-[10px] font-bold text-[#dc2626] uppercase tracking-widest">Late Fee %</label>
                    <input type="number" value={formData.lateFee || "0"} onChange={(e) => setFormData({...formData, lateFee: e.target.value})} className="bg-transparent font-bold w-full text-[#1e293b]" />
                  </div>
                )}
            </div>

            <SpecialtyFormTable tableData={tableData} setTableData={setTableData} accentColor={accentColor} type={type} />
            
            {/* Form Footer / Summary */}
            <div className="pt-6 border-t border-[#e2e8f0] flex flex-col md:flex-row justify-between items-center gap-6">
               <div className="space-y-3 md:space-y-0 md:flex  md:items-center md:gap-4">
              <div className="space-y-3 ">
                <button 
                  type="button" 
                  onClick={() => hasValidItems && setIsPreview(true)} 
                  disabled={!hasValidItems}
                  className="order-2 md:order-1 text-[#ffffff] px-8 py-3 rounded-xl font-bold transition-transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                  style={{ backgroundColor: accentColor }}>
                  Generate Preview
                </button>
                {!hasValidItems && (
                  <p className="text-sm text-red-600">Please enter an item description before generating preview.</p>
                )}
              </div>
              <div className="text-right">
                  <p className="text-[#94a3b8] text-[10px] uppercase font-bold tracking-widest">{type === "credit" ? "Total Refund" : "Grand Total"}</p>
                  <p className="text-3xl font-black" style={{ color: accentColor }}>₦{totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
               </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}