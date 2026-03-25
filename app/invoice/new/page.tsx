"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Edit, FileText } from "lucide-react";
import FormPreview from "./FormPreview";
import FormTable from "./FormTable";

import DownloadButton from "@/app/invoice-actions/DownloadButton";
import PrintButton from "@/app/invoice-actions/PrintButton";
import ResetButton from "@/app/invoice-actions/ResetButton";
import ImageUpload from "@/app/invoice-actions/ImageUpload";
import Link from "next/link";

export default function InvoicePage() {
  const [isPreview, setIsPreview] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // 1. Initialize formData from LocalStorage
  const [formData, setFormData] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("invoice-form-data");
      return saved ? JSON.parse(saved) : {
        logoUrl: "",
        companyName: "",
        invoiceAuthor: "",
        companyAddress: "",
        companyCity: "",
        companyCountry: "",
        clientCompany: "",
        clientAddress: "",
        clientCity: "",
        clientCountry: "",
        invoiceNumber: "",
        invoiceDate: "",
        invoiceDueDate: "",
      };
    }
  });

  // 2. Initialize tableData from LocalStorage
  const [tableData, setTableData] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("invoice-table-data");
      return saved ? JSON.parse(saved) : [{
        itemDescription: "",
        qty: 0,
        unitPrice: 0,
        tax: 0,
        amount: 0,
      }];
    }
  });

  // 3. Set mounted to true to handle Next.js hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 4. Save to LocalStorage whenever data changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("invoice-form-data", JSON.stringify(formData));
    }
  }, [formData, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("invoice-table-data", JSON.stringify(tableData));
    }
  }, [tableData, isMounted]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsPreview(!isPreview);
  }

  const handleLogoUpload = (url: string) => {
    setFormData((prev: any) => ({ ...prev, logoUrl: url }));
  };

  // Prevent rendering until mounted to avoid hydration mismatch
  if (!isMounted) return null;

  const handleReset = () => {
  // Use the same keys you used in your useState/useEffect logic
  localStorage.removeItem("invoice-form-data");
  localStorage.removeItem("invoice-table-data");
  
  // Optional: If you also want to clear the "service" ones just in case:
  localStorage.removeItem("service-invoice-data");
  localStorage.removeItem("service-table-data");

  // Force a reload to reset the state back to defaults
  window.location.reload();
};

  return (
    <main className="py-6 md:py-10 px-8 md:px-20">
      {/* HEADER */}
      <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
        <div className="w-full">
          
          <div className="flex items-center gap-2 flex-wrap">
            {!isPreview && (
              <Link href="/InvoiceTemplate"  className="gap-2 font-semibold rounded-lg py-2 px-4 border border-[#b4afaf]">
                <ArrowLeft size={24} />
              </Link>
            )}
            <button 
              onClick={() => setIsPreview(!isPreview)}
              className="flex items-center justify-center gap-2 font-semibold rounded-lg py-2 px-4 border border-[#b4afaf]"
            >    
              {isPreview ? (
                <div className="flex items-center gap-2"> 
                  <Edit size={16} />
                  <span>Edit</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <FileText size={16} />
                  <span>Preview</span>
                </div>
              )}
            </button>
            
            {/* Download/Print buttons could go here */}
            {isPreview && (
              <div className="flex gap-2"> 
  <DownloadButton 
  targetId="invoice-download-area" 
  fileName={`Invoice_${formData.invoiceNumber || "Draft"}.pdf`} 
/>
            <PrintButton/>
            </div>
            )}
          

            <ResetButton onReset={handleReset} />
            
            </div>
          
        </div>

       
      </div>

      {/* INVOICE FORM & PREVIEW */}
      {isPreview ? (
        <FormPreview data={formData} items={tableData} />
      ) : (
        <form onSubmit={handleFormSubmit} className="max-w-4xl mx-auto rounded-lg p-4 md:p-8 border border-[#b4afaf] mt-6 bg-white">
          <ImageUpload onUpload={handleLogoUpload} />

          <div className="flex flex-col mt-2">
            <input
              type="text"
              placeholder="Your Company" 
              name="companyName" 
              onChange={handleInputChange}
              value={formData.companyName}
              className="bg-transparent h-8 rounded-md p-2 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500 mt-1 "
            />
            <input
              type="text"
              placeholder="Your Name"
              name="invoiceAuthor"
              onChange={handleInputChange}
              value={formData.invoiceAuthor}
              className="bg-transparent h-8 rounded-md p-2 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500 mt-1 "
            />
            {/* ... Other inputs stay exactly as you had them ... */}
            <input
              type="text"
              placeholder="Company Address"
              name="companyAddress"
              onChange={handleInputChange}
              value={formData.companyAddress}
              className="bg-transparent h-8 rounded-md p-2 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500 mt-1"
            />
             <input
              type="text"
              placeholder="City, State, Zip"
              name="companyCity"
              onChange={handleInputChange}
              value={formData.companyCity}
              className="bg-transparent h-8 rounded-md p-2 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-500 mt-1"
            />
            
          </div>

          <div className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-10">
            <div className="flex flex-col w-full md:w-1/2 mt-6">
              <h2 className="mb-2 font-semibold">Bill To:</h2>
              <input
                type="text"
                placeholder="Client Company"
                name="clientCompany"
                onChange={handleInputChange}
                value={formData.clientCompany}
                className="bg-transparent h-8  rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="Client Address"
                name="clientAddress"
                onChange={handleInputChange}
                value={formData.clientAddress}
                className="bg-transparent h-8 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
             
            </div>

            <div className="flex flex-col w-full md:w-1/2 mt-6 gap-2">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-slate-500">Invoice #</label>
                    <input name="invoiceNumber" placeholder="INV 001" value={formData.invoiceNumber} onChange={handleInputChange} className="bg-transparent h-8 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-purple-500" />
                </div>
                <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-slate-500">Date</label>
                    <input type="date" name="invoiceDate" value={formData.invoiceDate} onChange={handleInputChange}  />
                </div>
                <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-slate-500">Due Date</label>
                    <input type="date" name="invoiceDueDate" value={formData.invoiceDueDate} onChange={handleInputChange} />
                </div>
            </div>
          </div>

          <FormTable tableData={tableData} setTableData={setTableData} />

          <button type="submit" className="bg-[#6b21a8] text-white px-6 py-2 rounded-md mt-8 w-full md:w-auto font-semibold">
            Preview Invoice
          </button>
        </form>
      )}
    </main>
  );
}