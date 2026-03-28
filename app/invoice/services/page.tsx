"use client";

import { useEffect, useState } from "react";
import { Edit, FileText, Briefcase } from "lucide-react";
import FormPreview from "./FormPreview";
import FormTable from "../new/FormTable";

import DownloadButton from "@/app/invoice-actions/DownloadButton";
import PrintButton from "@/app/invoice-actions/PrintButton";
import ResetButton from "@/app/invoice-actions/ResetButton";
import ImageUpload from "@/app/invoice-actions/ImageUpload";
import Link from "next/link";


export default function ServiceInvoicePage() {
  const [isPreview, setIsPreview] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

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

  const [formData, setFormData] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("service-invoice-data");
      return saved ? JSON.parse(saved) : defaultFormData;
    }
    return defaultFormData;
  });

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

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("service-invoice-data", JSON.stringify(formData));
      localStorage.setItem("service-table-data", JSON.stringify(tableData));
    }
  }, [formData, tableData, isMounted]);

  const totalAmount = tableData.reduce((acc: number, item: any) => acc + (Number(item.amount) || 0), 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  if (!isMounted) return null;

  const handleReset = () => {
    localStorage.removeItem("service-invoice-data");
    localStorage.removeItem("service-table-data");
    window.location.reload();
  };      

  return (
    <main className="min-h-screen bg-[#f8fafc] py-6 md:py-10 px-4 md:px-20">
      {/* ACTION BAR - Responsive flex direction */}
      <div className="max-w-5xl mx-auto mb-6 flex justify-between items-center gap-4 bg-[#ffffff] p-4 rounded-xl shadow-sm border border-[#e2e8f0]">
        <div className="flex items-center gap-3">
          {!isPreview && (
            <div className="bg-[#f3e8ff] p-2 rounded-lg text-[#7e22ce]">
              <Link href="/InvoiceTemplate">
                <Briefcase size={22} />
            </Link>
          </div>
          )}
          <div className="hidden md:block ">
            <h1 className="text-lg md:text-xl font-bold text-[#334155]  ">Service Invoice</h1>
            <p className=" text-xs text-[#64748b]">Professional billing for vendors</p>
          </div>
        </div>

        <div className="flex items-center w-full sm:w-auto gap-2">
          <button 
            onClick={() => setIsPreview(!isPreview)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 font-semibold rounded-lg py-2 px-4 bg-[#f1f5f9] hover:bg-[#e2e8f0] transition-colors text-sm md:text-base"
          >    
            {isPreview ? <><Edit size={16} /> Edit</> : <><FileText size={16} /> Preview</>}
          </button>
          
          {isPreview && (
            <div className="flex items-center gap-2">
              <DownloadButton targetId="invoice-download-area" fileName={`Service_Invoice_${formData.invoiceNumber}.pdf`} />
              <PrintButton />
            </div>
          )}


          <ResetButton onReset={handleReset} />
        </div>
      </div>

      {/* MAIN CONTENT */}
      {isPreview ? (
        <div id="invoice-download-area" className="w-full overflow-x-auto">
           <FormPreview data={formData} items={tableData} />
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-[#ffffff] rounded-2xl shadow-xl overflow-hidden border border-[#e2e8f0]">
          {/* Form Header - Mobile optimized padding */}
          <div className="p-5 md:p-6 bg-slate-50 border-b border-[#e2e8f0] flex flex-col md:flex-row justify-between items-center gap-4">
             <ImageUpload onUpload={(url) => setFormData((p:any)=>({...p, logoUrl: url}))} />
             <div className="text-center md:text-right w-full md:w-auto">
                <p className="text-[#94a3b8] text-[10px] uppercase tracking-widest font-bold">Total Amount Due</p>
                <p className="text-3xl md:text-4xl font-bold text-[#7e22ce]">₦{totalAmount.toLocaleString()}</p>
             </div>
          </div>

          <form className="p-5 md:p-8 space-y-8" onSubmit={(e) => e.preventDefault()}>
            {/* VENDOR & CLIENT GRID - Responsive gap */}
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12">
              <div className="md:space-y-4">
                <h3 className="text-xs font-bold text-[#7e22ce] uppercase tracking-wider">From:</h3>
                <input name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="Your Business Name" className="w-full text-lg font-bold outline-none" />
                <input name="invoiceAuthor" value={formData.invoiceAuthor} onChange={handleInputChange} placeholder="Your Name" className="w-full text-sm outline-none text-[#64748b]" />
                <textarea name="companyAddress" value={formData.companyAddress} onChange={handleInputChange} placeholder="Business Address & Contact" className="w-full text-sm outline-none text-slate-500 resize-none h-20" />
              </div>

              <div className="md:space-y-4">
                <h3 className="text-xs font-bold text-[#7e22ce] uppercase tracking-wider">Bill To:</h3>
                <input name="clientCompany" value={formData.clientCompany} onChange={handleInputChange} placeholder="Client Name/Company" className="w-full text-lg font-bold outline-none border-b border-slate-100 focus:border-[#7e22ce]" />
                <textarea name="clientAddress" value={formData.clientAddress} onChange={handleInputChange} placeholder="Client Address" className="w-full text-sm outline-none text-[#64748b] resize-none h-20" />
              </div>
            </div>

            {/* DATE & DETAILS BOX - Optimized for mobile touch targets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#f8fafc] p-4 md:p-5 rounded-xl border border-[#e2e8f0]">
                <div className="border-b sm:border-b-0 sm:border-r border-[#e2e8f0] pb-2 sm:pb-0 sm:pr-2">
                    <label className="block text-[10px] font-bold text-[#94a3b8] uppercase mb-1">Invoice #</label>
                    <input name="invoiceNumber" value={formData.invoiceNumber} onChange={handleInputChange} className="bg-transparent font-medium outline-none w-full text-sm md:text-base" />
                </div>
                <div className="border-b sm:border-b-0 sm:border-r border-[#e2e8f0] pb-2 sm:pb-0 sm:px-2">
                    <label className="block text-[10px] font-bold text-[#94a3b8] uppercase mb-1">Issued Date</label>
                    <input type="date" name="invoiceDate" value={formData.invoiceDate} onChange={handleInputChange} className="bg-transparent outline-none w-full text-sm md:text-base" />
                </div>
                <div className="pt-2 sm:pt-0 sm:pl-2">
                    <label className="block text-[10px] font-bold text-[#94a3b8] uppercase mb-1">Due Date</label>
                    <input type="date" name="invoiceDueDate" value={formData.invoiceDueDate} onChange={handleInputChange} className="bg-transparent outline-none w-full text-sm md:text-base" />
                </div>
            </div>

            {/* Ensure FormTable has overflow handling inside its own component */}
            <div className="overflow-x-auto -mx-2 px-2">
               <FormTable tableData={tableData} setTableData={setTableData} />
            </div>

            {/* Bottom Footer - Stacked on Mobile */}
            <div className="pt-6 border-t border-[#e2e8f0] flex flex-col md:flex-row justify-between items-center gap-6">
               <button 
                type="button" 
                onClick={() => setIsPreview(true)} 
                className="bg-[#7e22ce] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#6b21a8] transition-all shadow-lg shadow-[#e9d5ff] w-full md:w-auto order-2 md:order-1"
               >
                  Generate Preview
               </button>
               <div className="text-center md:text-right order-1 md:order-2">
                  <p className="text-[#94a3b8] text-xs uppercase font-bold tracking-widest">Grand Total</p>
                  <p className="text-2xl md:text-3xl font-black text-[#7e22ce]">₦{totalAmount.toLocaleString()}</p>
               </div>
            </div>
          </form>
        </div>
      )}

      
    </main>
  );
}