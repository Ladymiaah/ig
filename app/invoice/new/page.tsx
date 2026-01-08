"use client";

import { useState } from "react";
import { Download, Edit, FileText, Form, Mail, Printer, Upload, UploadCloud } from "lucide-react";
import FormPreview from "./FormPreview";
import FormTable from "./FormTable";

export default function InvoicePage() {
  const [isPreview, setIsPreview] = useState(false);
  const [formData, setFormData] = useState
  ({
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
    });

    const [tableData, setTableData] = useState([
  {
    itemDescription: "",
    qty: 0,
    unitPrice: 0,
    tax: 0,
    amount: 0,
  },
]);


    const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });
    // console.log(formData);
};

function handleFormSubmit(e: React.FormEvent) {
  e.preventDefault();
  console.log(formData);
  setIsPreview(!isPreview);
}

  
  return (
    <main className=" py-6 md:py-10 px-8 md:px-20">
      
      {/* HEADER */}

      <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
        {/* First row: preview, download, print */}
        <div className="w-full">
          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={() => setIsPreview(!isPreview)}
            className="flex items-center justify-center gap-2 font-semibold rounded-lg py-2 px-4 border border-[#b4afaf]">    
              {isPreview ? (
                <div className="flex items-center gap-2"> 
                  <Edit size={16} />
              <span className="hidden sm:inline">Edit</span>
              <span className="sm:hidden">Edit</span>
                </div>
              ):(
                <div className="flex items-center gap-2">
                   <FileText size={16} />
              <span className="hidden sm:inline"> Preview</span>
              <span className="sm:hidden">Preview</span>
                </div>
              ) }

            </button>
            <button className="flex items-center justify-center gap-2 font-semibold rounded-lg py-2 px-4 border border-[#b4afaf]">
              <Download size={16} />
              <span className="hidden sm:inline">Download</span>
              <span className="sm:hidden">DL</span>
            </button>
            <button className="flex items-center justify-center gap-2 font-semibold rounded-lg py-2 px-4 border border-[#b4afaf]">
              <Printer size={16} />
              <span className="hidden sm:inline">Print</span>
              <span className="sm:hidden">Prt</span>
            </button>
          </div>
        </div>

        {/* Second row on mobile: save and send side-by-side */}
        <div className=" mt-2 md:mt-0 flex items-center gap-2 md:justify-end">
          <button className="flex items-center justify-center gap-2 border border-[#6b21a8] rounded-lg px-3 py-2 text-[#6b21a8]">
            <Upload size={16} />
            <span className="text-sm">Save</span>
          </button>
          <button className="flex items-center justify-center gap-2 border border-[#6b21a8] rounded-lg px-3 py-2 text-[#6b21a8]">
            <Mail size={16} />
            <span className="text-sm">Send</span>
          </button>
        </div>
      </div>
      {/* INVOICE FORM & PREVIEW */}
            {
              isPreview ? (
       <FormPreview data={formData} items={tableData} />
              ) : (
<form onSubmit={handleFormSubmit} className="max-w-4xl mx-auto rounded-lg p-4 md:p-8 border-1 border-[#b4afaf] mt-6 ">
        <div className="flex items-center justify-between mb-6">
  <div className="flex items-center gap-6">
    
    <div className="p-3 border border-[#dad4d4] text-[#6b21a8] md:w-30 rounded-xl shadow-md 
                    flex flex-col items-center justify-center text-center gap-1">
      <UploadCloud size={24} />
      <p>Upload</p>
    </div>

    <div className="hidden md:block">
      <h1 className="font-semibold">Upload Logo</h1>
      <p className="text-sm ">
        240 x 240 pixel <br />
        Maximum size of 1MB.
      </p>
    </div>

  </div>

  <div>
    <h1 className="text-2xl md:text-4xl font-semibold">INVOICE</h1>
  </div>
</div> 
{/* company details       */}
<div>
 <div className="flex flex-col">
  
    <input
      type="text"
      placeholder="Your Company" 
      name="companyName" 
      onChange={handleInputChange}
      value={formData.companyName}
      className="bg-transparent  h-7 rounded-md p-2 placeholder-slate-400 focus:outline-none focus:ring focus:ring-primary mt-1"
    />
    <input
      type="text"
      placeholder="Your Name"
      name="invoiceAuthor"
      onChange={handleInputChange}
      value={formData.invoiceAuthor}
      className=" bg-transparent  h-7 rounded-md p-2 placeholder-slate-400 focus:outline-none focus:ring focus:ring-primary mt-1"
    />
    <input
      type="text"
      placeholder="Company Address"
      name="companyAddress"
      onChange={handleInputChange}
      value={formData.companyAddress}
      className="bg-transparent  h-7 rounded-md p-2 placeholder-slate-400 focus:outline-none focus:ring  focus:ring-primary mt-1"
    />
    <input
      type="text"
      placeholder="City, State, Zip"
      name="companyCity"
      onChange={handleInputChange}
      value={formData.companyCity}
      className=" bg-transparent  h-7 rounded-md p-2 placeholder-slate-400 focus:outline-none  focus:ring focus:ring-primary mt-1"
    />
    <input
      type="text"
      placeholder="Nigeria"
      name="companyCountry"
      onChange={handleInputChange}
      value={formData.companyCountry}
      className="bg-transparent h-7 rounded-md p-2 placeholder-slate-400 focus:outline-none focus:ring focus:ring-primary mt-1"
    />
</div>

{/* CLIENT DETAILS */}
<div className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-10">
<div className="flex flex-col w-1/2  mt-6">
    <h2 className="mb-2 font-semibold">Bill To:</h2>
    <input
      type="text"
      placeholder="Your client Company"
      name="clientCompany"
      onChange={handleInputChange}
      value={formData.clientCompany}
      className="bg-transparent  h-7 rounded-md p-2 placeholder-slate-400 focus:outline-none focus:ring focus:ring-primary mt-1"
    /> 
    <input
      type="text"
      placeholder="Client's Address"
      name="clientAddress"
      onChange={handleInputChange}
      value={formData.clientAddress}
      className=" bg-transparent  h-7 rounded-md p-2 placeholder-slate-400 focus:outline-none focus:ring focus:ring-primary mt-1"
    />
    <input
      type="text"
      placeholder="City, State, Zip"
      name="clientCity"
      onChange={handleInputChange}
      value={formData.clientCity}
      className=" bg-transparent h-7 rounded-md p-2 placeholder-gray-400 focus:outline-none  focus:ring focus:ring-primary mt-1"
    />
    <input
      type="text"
      placeholder="Nigeria"
      name="clientCountry"
      onChange={handleInputChange}
      value={formData.clientCountry}
      className="bg-transparent h-7 rounded-md p-2 placeholder-slate-400 focus:outline-none focus:ring focus:ring-primary mt-1"
    />
  

</div>
      {/* INVOICE DETAILS */}
<div className="flex flex-col w-1/2 mt-6">
    <div className="flex items-center gap-2">
      <label htmlFor="invoiceNumber" className="font-bold text-slate-500">
        Invoice Number
      </label>
       <input
      type="text"
      placeholder="INV-02"
      name="invoiceNumber"
      onChange={handleInputChange}
      value={formData.invoiceNumber}
      className=" bg-transparent h-7 rounded-md p-2 placeholder-slate-400 focus:outline-none focus:ring focus:ring-primary mt-1"
    />
    </div> 
    <div className="flex items-center gap-2">
      <label htmlFor="invoiceDate" className="font-bold text-slate-500">
        Invoice Date 
      </label>
      
       <input
      type="date"
      name="invoiceDate"
      onChange={handleInputChange}
      value={formData.invoiceDate}
      className=" bg-transparent h-7 rounded-md p-2 placeholder-slate-400 focus:outline-none focus:ring focus:ring-primary mt-1"
    />
    </div>  
    <div className="flex items-center gap-2">
      <label htmlFor="DueDate" className="font-bold text-slate-500">
        Due Date
      </label>
       <input
      type="date"
      name="invoiceDueDate"
      onChange={handleInputChange}
      value={formData.invoiceDueDate}
      className=" bg-transparent h-7 rounded-md p-2 placeholder-slate-400 focus:outline-none focus:ring focus:ring-primary mt-1"
    />
    </div>
  

</div>
     </div> 
     </div>
     {/* FORM TABLE */}
     <FormTable />
<button type="submit" className="bg-[#6b21a8] text-white px-4 py-2 rounded-md mt-4">
        Create Invoice
      </button>
      </form> 
              )
            }

      
      
    </main>
  );
}