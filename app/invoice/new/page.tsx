"use client";

import { useState } from "react";
import { Download, FileText, Mail, Printer, Upload, UploadCloud } from "lucide-react";
import InvoiceDetails from "./InvoiceDetails";
import ImageUploader from "./ImageUpload";

export default function NewInvoicePage() {
  const [isPreview, setIsPreview] = useState(false);
  return (
    <main className="max-w-4xl mx-auto p-6 sm:p-10">
      
      {/* HEADER */}

      <div className="grid grid-cols-2 md:flex md:justify-between gap-4">
        <div className="flex items-center space-x-4">
            <button onClick={() => setIsPreview(prev => !prev)} className="flex items-center font-semibold space-x-2 rounded-lg py-2 px-4 border-1 border-[#b4afaf]">
                     <FileText size={16} />
                <p className="">{isPreview ? 'Edit' : 'Preview'}</p>
            </button>
            <button className="flex items-center font-semibold space-x-2 rounded-lg py-2 px-4 border-1 border-[#b4afaf]">
                     <Download size={16} />
                <p className="">Download</p>
            </button>
             <button className="flex items-center font-semibold space-x-2 rounded-lg py-2 px-4 border-1 border-[#b4afaf]">
                     <Printer size={16} />
                <p className="">print</p>
            </button>
        </div>
        <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-2 border border-[#6b21a8] rounded-lg px-3 py-2 text-[#6b21a8] ">
            <Upload size={16} />
            <h1 className="">Save as image</h1>       
        </button>
        <button className="flex items-center space-x-2 border border-[#6b21a8] rounded-lg px-3 py-2 text-[#6b21a8] ">
            <Mail size={16} />
            <h1 className="">Send</h1>       
        </button>
        </div>
      </div>
      {/* INVOICE FORM  */}
      <div className="rounded-lg p-4 md:p-8 border-1 border-[#b4afaf] mt-6 ">
        <div className="flex items-center justify-between mb-6">
  <div className="flex items-center gap-6">
    
    <div className="p-3 border border-[#dad4d4] text-[#6b21a8] md:w-30 rounded-xl shadow-md 
                    flex flex-col items-center justify-center text-center gap-1">
      <UploadCloud size={24} />
      <p>Upload</p>
    </div>

    <div>
      <h1 className="font-semibold">Upload Logo</h1>
      <p className="text-sm">
        240 x 240 pixel <br />
        Maximum size of 1MB.
      </p>
    </div>

  </div>

  <div>
    <h1 className="text-4xl font-semibold">INVOICE</h1>
  </div>
</div>

         {/* INVOICE DETAILS */}
<InvoiceDetails isPreview={isPreview} />
      </div>
      {/* INVOICE PREVIEW */}
      <h1 className="text-3xl font-extrabold mb-6 mt-20">Create New Invoice</h1>
    </main>
  );
}