"use client";

import { useEffect, useState } from "react";
import { Edit, FileText, Briefcase } from "lucide-react";
import DownloadButton from "@/app/invoice-actions/DownloadButton";
import PrintButton from "@/app/invoice-actions/PrintButton";
import ResetButton from "@/app/invoice-actions/ResetButton";
import ImageUpload from "@/app/invoice-actions/ImageUpload";
import SpecialtyFormPreview from "./SpecialtyFormPreview";
import SpecialtyFormTable from "./SpecialtyFormTable";
import Link from "next/link";

interface BaseProps {
  type: "progress" | "credit" | "past-due";
  accentColor: string;
  storageKey: string;
  label: string;
}

export default function BaseInvoicePage({ type, accentColor, storageKey, label }: BaseProps) {
  const [isPreview, setIsPreview] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

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

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-[#f8fafc] py-10 px-6 md:px-20">
      <div className="max-w-5xl mx-auto mb-8 flex flex-wrap justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-[#e2e8f0]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg" style={{ backgroundColor: `${accentColor}15`, color: accentColor }}>
            <Link href="/InvoiceTemplate" >
                <Briefcase size={24} />
            </Link>
                
          </div>
          <h1 className="text-xl font-bold text-[#334155]">{label}</h1>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setIsPreview(!isPreview)} className="flex items-center gap-2 font-semibold rounded-lg py-2 px-4 bg-[#f1f5f9] hover:bg-[#e2e8f0]">
            {isPreview ? <><Edit size={16} /> Edit</> : <><FileText size={16} /> Preview</>}
          </button>
          {isPreview && <><DownloadButton targetId="invoice-download-area" fileName={`${label}.pdf`} /><PrintButton /></>}
          <ResetButton onReset={() => { localStorage.clear(); window.location.reload(); }} />
        </div>
      </div>

      {isPreview ? (
        <div id="invoice-download-area">
           <SpecialtyFormPreview data={formData} items={tableData} specialtyType={type} specialtyColor={accentColor} total={totalAmount} />
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-[#e2e8f0]">
          <div className="p-6 text-white flex justify-between items-center" style={{ backgroundColor: accentColor }}>
             <ImageUpload onUpload={(url) => setFormData((p:any)=>({...p, logoUrl: url}))} />
             <div className="text-right">
                <p className="opacity-80 text-xs uppercase">{type === "credit" ? "Total Refund" : "Amount Due"}</p>
                <p className="text-3xl font-bold">₦{totalAmount.toLocaleString()}</p>
             </div>
          </div>

          <form className="p-8 space-y-8" onSubmit={(e) => e.preventDefault()}>
            {/* Credit Logic: Refund Details */}
            {type === "credit" && (
              <div className="grid md:grid-cols-2 gap-6 bg-[#f0fdfa] p-5 rounded-2xl border border-[#ccfbf1]">
                <div>
                  <label className="block text-[10px] font-black text-[#0d9488] uppercase mb-2">Ref. Invoice #</label>
                  <input placeholder="INV-001" className="w-full bg-white border border-[#99f6e4] rounded-lg px-3 py-2 text-sm" value={formData.referenceInvoice || ""} onChange={(e) => setFormData({...formData, referenceInvoice: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-[#0d9488] uppercase mb-2">Method</label>
                  <div className="flex gap-4 mt-2">
                    {["Store Credit", "Cash Refund"].map(m => (
                      <label key={m} className="flex items-center gap-2 text-sm font-bold text-[#134e4a]">
                        <input type="radio" checked={formData.refundType === m} onChange={() => setFormData({...formData, refundType: m})} className="accent-[#0d9488]" /> {m}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Standard From/To Section */}
            <div className="grid md:grid-cols-2 gap-12">
               <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase" style={{ color: accentColor }}>From:</h3>
                <input value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})} placeholder="Business Name" className="w-full text-lg font-bold outline-none border-b border-transparent focus:border-slate-300" />
                <textarea value={formData.companyAddress} onChange={(e) => setFormData({...formData, companyAddress: e.target.value})} placeholder="Address" className="w-full text-sm outline-none text-slate-500 resize-none h-20" />
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase" style={{ color: accentColor }}>Bill To:</h3>
                <input value={formData.clientCompany} onChange={(e) => setFormData({...formData, clientCompany: e.target.value})} placeholder="Client Name" className="w-full text-lg font-bold outline-none border-b border-transparent focus:border-slate-300" />
                <textarea value={formData.clientAddress} onChange={(e) => setFormData({...formData, clientAddress: e.target.value})} placeholder="Client Address" className="w-full text-sm outline-none text-[#64748b] resize-none h-20" />
              </div>
            </div>

            <div className="bg-[#f8fafc] p-4 rounded-xl border border-[#e2e8f0] grid grid-cols-2 md:grid-cols-4 gap-4">
                <div><label className="text-[10px] font-bold text-[#64748b] uppercase">Invoice #</label><input value={formData.invoiceNumber} onChange={(e) => setFormData({...formData, invoiceNumber: e.target.value})} className="bg-transparent font-medium outline-none w-full" /></div>
                {type !== "credit" && <div><label className="text-[10px] font-bold text-[#64748b] uppercase">Due Date</label><input type="date" value={formData.invoiceDueDate} onChange={(e) => setFormData({...formData, invoiceDueDate: e.target.value})} className="bg-transparent outline-none w-full" /></div>}
                {type === "progress" && <div><label className="text-[10px] font-bold text-[#3b82f6] uppercase">Completion %</label><input type="number" value={formData.completionRate} onChange={(e) => setFormData({...formData, completionRate: e.target.value})} className="bg-transparent font-bold w-full" /></div>}
                {type === "past-due" && <div><label className="text-[10px] font-bold text-[#dc2626] uppercase">Late Fee %</label><input type="number" value={formData.lateFee} onChange={(e) => setFormData({...formData, lateFee: e.target.value})} className="bg-transparent font-bold w-full" /></div>}
            </div>

            <SpecialtyFormTable tableData={tableData} setTableData={setTableData} accentColor={accentColor} type={type} />
            
            <div className="pt-6 border-t border-[#e2e8f0] flex justify-between items-center">
               <button type="button" onClick={() => setIsPreview(true)} className="text-white px-8 py-3 rounded-xl font-bold" style={{ backgroundColor: accentColor }}>View {label}</button>
               <div className="text-right">
                  <p className="text-[#94a3b8] text-sm">{type === "credit" ? "Total Refund" : "Grand Total"}</p>
                  <p className="text-2xl font-black" style={{ color: accentColor }}>₦{totalAmount.toLocaleString()}</p>
               </div>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}