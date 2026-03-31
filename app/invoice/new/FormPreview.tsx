"use client";

import React from 'react';

type Row = {
  id: string;
  itemDescription: string;
  qty: number;
  unitPrice: number;
  amount: number;
};

interface FormPreviewProps {
  data: any;
  items: Row[];
  isPreview?: boolean; // We kept this for backward compatibility
}

export default function FormPreview({ data, items }: FormPreviewProps) {
  const formatCurrency = (val: number) => val.toLocaleString('en-US', { minimumFractionDigits: 2 });
  const total = items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  return (
    <div className="bg-[#ffffff] rounded-2xl shadow-2xl overflow-hidden border border-[#e2e8f0]">
      {/* Header */}
      <div className="p-8 md:p-12 border-b border-[#f1f5f9] flex justify-between items-start">
        <div>
          {data.logoUrl && <img src={data.logoUrl} alt="Logo" className="h-16 mb-4 object-contain" />}
          <h1 className="text-xl  md:text-3xl font-black text-[#1e293b] uppercase tracking-tight">{data.companyName || "Your Company"}</h1>
          <p className="text-[#64748b] text-sm whitespace-pre-wrap max-w-sm">{data.companyAddress}</p>
        </div>
        <div className="text-right">
          <h2 className="text-5xl font-black text-[#f1f5f9] absolute top-10 right-10 -z-0 select-none">INVOICE</h2>
          <div className="relative z-10">
            <p className="text-[#94a3b8] text-xs font-bold uppercase tracking-widest">Invoice Number</p>
            <p className="text-xl font-bold text-[#1e293b]">#{data.invoiceNumber || "---"}</p>
          </div>
        </div>
      </div>

      {/* Bill To & Dates */}
      <div className="p-8 md:p-12 grid md:grid-cols-2 gap-5 md:gap-12 bg-[#fcfcfd]">
        <div>
          <p className="text-[#94a3b8] text-[10px] font-bold uppercase mb-2 tracking-widest">Bill To</p>
          <p className="md:text-lg font-bold text-[#1e293b]">{data.clientCompany || "Client Name"}</p>
          <p className="text-[#64748b] text-sm whitespace-pre-wrap">{data.clientAddress}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-[#94a3b8] text-[10px] font-bold uppercase mb-1">Date Issued</p>
            <p className="font-bold  text-[#1e293b]">{data.invoiceDate}</p>
          </div>
          <div>
            <p className="text-[#94a3b8] text-[10px] font-bold uppercase mb-1">Due Date</p>
            <p className="font-bold text-[#1e293b]">{data.invoiceDueDate || "---"}</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="px-8 md:px-12 pb-12">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-[#1e293b]">
              <th className="py-4 text-[10px] font-black uppercase text-[#1e293b]">Description</th>
              <th className="py-4 text-[10px] font-black uppercase text-[#1e293b] text-center w-20">Qty</th>
              <th className="py-4 text-[10px] font-black uppercase text-[#1e293b] text-right w-32">Price</th>
              <th className="py-4 text-[10px] font-black uppercase text-[#1e293b] text-right w-32">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f1f5f9]">
            {items.map((item, idx) => (
              <tr key={item.id || idx}>
                <td className="py-5 text-sm font-medium text-[#1e293b]">{item.itemDescription || "New Item"}</td>
                <td className="py-5 text-sm text-center text-[#64748b]">{item.qty}</td>
                <td className="py-5 text-sm text-right text-[#64748b]">₦{formatCurrency(item.unitPrice)}</td>
                <td className="py-5 text-sm text-right font-bold text-[#1e293b]">₦{formatCurrency(item.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total Summary */}
        <div className="mt-8 flex justify-end">
          <div className="w-64 space-y-3 bg-[#f8fafc] p-6 rounded-xl border border-[#e2e8f0]">
            <div className="flex justify-between text-sm">
              <span className="text-[#64748b]">Subtotal</span>
              <span className="font-bold">₦{formatCurrency(total)}</span>
            </div>
            <div className="flex justify-between text-lg font-black border-t border-[#e2e8f0] pt-3">
              <span>Total Due</span>
              <span className="text-[#6b21a8]">₦{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}