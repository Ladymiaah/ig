"use client";

import { useEffect, useState } from "react";
import { Edit, FileText, RotateCcw, Briefcase } from "lucide-react";
import FormPreview from "./FormPreview";
import FormTable from "../new/FormTable";

import DownloadButton from "@/app/invoice-actions/DownloadButton";
import PrintButton from "@/app/invoice-actions/PrintButton";
import ResetButton from "@/app/invoice-actions/ResetButton";
import ImageUpload from "@/app/invoice-actions/ImageUpload";

export default function ServiceInvoicePage() {
  const [isPreview, setIsPreview] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  // Default values to prevent "undefined" errors during SSR
  const defaultFormData = {
    logoUrl: "",
    companyName: "",
    invoiceAuthor: "",
    companyAddress: "",
    companyEmail: "",
    clientCompany: "",
    clientAddress: "",
    invoiceNumber: `SRV-${Date.now().toString().slice(-4)}`,
    invoiceDate: new Date().toISOString().split('T')[0],
    invoiceDueDate: "",
    notes: "Thank you for choosing our services!",
  };

  const defaultTableData = [{
    itemDescription: "",
    qty: 1,
    unitPrice: 0,
    tax: 0,
    amount: 0,
  }];

  // 1. Initialize formData with Server-Side Fallback
  const [formData, setFormData] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("service-invoice-data");
      return saved ? JSON.parse(saved) : defaultFormData;
    }
    return defaultFormData;
  });

  // 2. Initialize tableData with Server-Side Fallback (Fixes the .reduce error)
  const [tableData, setTableData] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("service-table-data");
      return saved ? JSON.parse(saved) : defaultTableData;
    }
    return defaultTableData;
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 3. Save to LocalStorage whenever data changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("service-invoice-data", JSON.stringify(formData));
      localStorage.setItem("service-table-data", JSON.stringify(tableData));
    }
  }, [formData, tableData, isMounted]);

  // Safe calculation using the state (now guaranteed to be an array)
  const totalAmount = tableData.reduce((acc: number, item: any) => acc + (Number(item.amount) || 0), 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  // Prevent UI flickers during hydration
  if (!isMounted) return null;

  const handleReset = () => {
  // Clear specific keys so you don't accidentally wipe other app settings
  localStorage.removeItem("service-invoice-data");
  localStorage.removeItem("service-table-data");
  window.location.reload();
};      

  return (
    <main className="min-h-screen bg-[#f8fafc] py-10 px-6 md:px-20">
      {/* ACTION BAR */}
      <div className="max-w-5xl mx-auto mb-8 flex flex-wrap justify-between items-center gap-4 bg-[#ffffff] p-4 rounded-xl shadow-sm border border-[#e2e8f0] ">
        <div className="flex items-center gap-3">
          {/* Using your requested Hex Colors here */}
          <div className="bg-[#f3e8ff] p-2 rounded-lg text-[#7e22ce]">
            <Briefcase size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#334155]">Service Invoice</h1>
            <p className="text-xs text-[#64748b]">Professional billing for vendors</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsPreview(!isPreview)}
            className="flex items-center gap-2 font-semibold rounded-lg py-2 px-4 bg-[#f1f5f9] hover:bg-[#e2e8f0] transition-colors"
          >    
            {isPreview ? <><Edit size={16} /> Edit</> : <><FileText size={16} /> Preview</>}
          </button>
          
          {isPreview && (
            <div  className="flex items-center gap-2">
              <DownloadButton targetId="invoice-download-area" fileName={`Service_Invoice_${formData.invoiceNumber}.pdf`} />
              <PrintButton />
            </div>
          )}

          <ResetButton onReset={handleReset} />
        </div>
      </div>

      {/* MAIN CONTENT */}
      {isPreview ? (
        <div id="invoice-download-area">
           <FormPreview data={formData} items={tableData} />
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-[#ffffff] rounded-2xl shadow-xl overflow-hidden border border-[#e2e8f0]">
          <div className="  p-6 text-white flex justify-between items-center">
             <ImageUpload onUpload={(url) => setFormData((p:any)=>({...p, logoUrl: url}))} />
             <div className="text-right">
                <p className="text-[#94a3b8] text-xs uppercase tracking-widest">Amount Due</p>
                <p className="text-3xl font-bold text-[#7e22ce]">₦{totalAmount.toLocaleString()}</p>
             </div>
          </div>

          <form className="p-8 space-y-8" onSubmit={(e) => e.preventDefault()}>
            {/* VENDOR & CLIENT GRID */}
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-[#7e22ce] uppercase">From:</h3>
                <input name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="Your Business Name" className="w-full text-lg font-bold outline-none border-b border-transparent focus:border-[#7e22ce]" />
                <input name="invoiceAuthor" value={formData.invoiceAuthor} onChange={handleInputChange} placeholder="Your Name" className="w-full text-sm outline-none text-[#64748b]" />
                <textarea name="companyAddress" value={formData.companyAddress} onChange={handleInputChange} placeholder="Business Address & Contact" className="w-full text-sm outline-none text-slate-500 resize-none h-20" />
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-[#7e22ce] uppercase">To:</h3>
                <input name="clientCompany" value={formData.clientCompany} onChange={handleInputChange} placeholder="Client Name/Company" className="w-full text-lg font-bold outline-none border-b border-transparent focus:border-[#7e22ce]" />
                <textarea name="clientAddress" value={formData.clientAddress} onChange={handleInputChange} placeholder="Client Address" className="w-full text-sm outline-none text-[#64748b] resize-none h-20" />
              </div>
            </div>

            {/* DATE & DETAILS BOX */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-[#f1f5f9] p-4 rounded-xl border border-[#e2e8f0]">
                <div>
                    <label className="block text-[10px] font-bold text-[#64748b] uppercase">Invoice #</label>
                    <input name="invoiceNumber" value={formData.invoiceNumber} onChange={handleInputChange} className="bg-transparent font-medium outline-none" />
                </div>
                <div>
                    <label className="block text-[10px] font-bold text-[#64748b] uppercase">Issued Date</label>
                    <input type="date" name="invoiceDate" value={formData.invoiceDate} onChange={handleInputChange} className="bg-transparent outline-none" />
                </div>
                <div>
                    <label className="block text-[10px] font-bold text-[#64748b] uppercase">Due Date</label>
                    <input type="date" name="invoiceDueDate" value={formData.invoiceDueDate} onChange={handleInputChange} className="bg-transparent outline-none" />
                </div>
            </div>

            <FormTable tableData={tableData} setTableData={setTableData} />

            <div className="pt-6 border-t border-[#e2e8f0] flex flex-col md:flex-row justify-between items-center gap-4">
               <button 
                type="button" 
                onClick={() => setIsPreview(true)} 
                className="bg-[#7e22ce] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#6b21a8] transition-all shadow-lg shadow-[#e9d5ff] w-full md:w-auto"
               >
                  Generate Preview
               </button>
               <div className="text-right">
                  <p className="text-[#94a3b8] text-sm">Grand Total</p>
                  <p className="text-2xl font-black text-[#7e22ce]">₦{totalAmount.toLocaleString()}</p>
               </div>
            </div>
          </form>
        </div>
      )}

      {/* RESET MODAL */}
      {showResetModal && (
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#ffffff] p-6 rounded-2xl max-w-sm w-full shadow-2xl">
               <h3 className="text-xl font-bold mb-2">Clear Invoice?</h3>
               <p className="text-[#94a3b8] mb-6">This will reset all your service and table data.</p>
               <div className="flex gap-3">
                  <button onClick={() => setShowResetModal(false)} className="flex-1 py-2 font-semibold text-[#64748b]">Cancel</button>
                  <button 
                    onClick={() => { 
                      localStorage.removeItem("service-invoice-data"); 
                      localStorage.removeItem("service-table-data");
                      window.location.reload(); 
                    }} 
                    className="flex-1 py-2 bg-[#dc2626] text-[#ffffff] rounded-lg font-semibold hover:bg-[#dc2626]"
                  >
                    Reset
                  </button>
               </div>
            </div>
         </div>
      )}
    </main>
  );
}