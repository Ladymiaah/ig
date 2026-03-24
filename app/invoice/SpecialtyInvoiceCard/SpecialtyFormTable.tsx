"use client";

import React from "react";
import { Plus, XCircle } from "lucide-react";

interface SpecialtyTableProps {
  tableData: any[];
  setTableData: (data: any[]) => void;
  accentColor: string;
  type: "progress" | "credit" | "past-due"; // Added type prop
}

export default function SpecialtyFormTable({ 
  tableData, 
  setTableData, 
  accentColor,
  type 
}: SpecialtyTableProps) {

  const addRow = () => {
    setTableData([...tableData, { itemDescription: "", qty: 1, unitPrice: 0, tax: 0, amount: 0 }]);
  };

  const removeRow = (index: number) => {
    setTableData(tableData.filter((_: any, i: number) => i !== index));
  };

  const updateRow = (index: number, field: string, value: any) => {
    const newData = [...tableData];
    newData[index][field] = value;
    
    // Auto-calculate amount
    const qty = Number(newData[index].qty) || 0;
    const price = Number(newData[index].unitPrice) || 0;
    const tax = Number(newData[index].tax) || 0;
    newData[index].amount = (qty * price) * (1 + tax / 100);
    
    setTableData(newData);
  };

  // Dynamic labels based on invoice type
  const qtyLabel = type === "progress" ? "Qty / Hrs" : "Qty";
  const totalLabel = type === "credit" ? "Credit" : "Total";

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-[#94a3b8]">
       <div className="col-span-6">Description</div>
        <div className="col-span-2 text-center">{type === "progress" ? "Hrs" : "Qty"}</div>
        <div className="col-span-2 text-right">Rate</div>
        <div className="col-span-2 text-right">{type === "credit" ? "Credit" : "Total"}</div>
      </div>

      {/* ROWS */}
      <div className="space-y-3">
        {tableData.map((row: any, index: number) => (
          <div key={index} className="group relative grid grid-cols-1 md:grid-cols-12 gap-4 bg-[#f8fafc] p-4 rounded-xl border border-transparent hover:border-[#e2e8f0] transition-all">
            <div className="md:col-span-6">
              <input 
                placeholder={type === "credit" ? "Reason for credit (e.g., Return)..." : "Service or work item..."}
                className="w-full bg-transparent font-semibold text-[#1e293b] outline-none placeholder:text-[#cbd5e1]"
                value={row.itemDescription}
                onChange={(e) => updateRow(index, "itemDescription", e.target.value)}
              />
            </div>
            
            <div className="flex md:col-span-2 items-center justify-center gap-2">
                              <input 
                type="number"
                className="w-full text-center bg-[#ffffff] border border-[#e2e8f0] rounded-md py-1 text-sm outline-none focus:ring-1"
                style={{ "--tw-ring-color": accentColor } as React.CSSProperties}
                value={row.qty}
                onChange={(e) => updateRow(index, "qty", e.target.value)}
               />
            </div>

            <div className="md:col-span-2">
               <input 
                type="number"
                placeholder="0.00"
                className="w-full text-right bg-transparent font-medium text-[#475569] outline-none"
                value={row.unitPrice}
                onChange={(e) => updateRow(index, "unitPrice", e.target.value)}
               />
            </div>

            <div className="md:col-span-2 flex items-center justify-end gap-3">
               <span className="font-bold text-[#1e293b]">₦{row.amount.toLocaleString()}</span>
               <button 
                type="button"
                onClick={() => removeRow(index)}
                className="text-[#fca5a5] hover:text-[#ef4444] transition-colors p-1"
                title="Remove Item"
               >
                <XCircle size={16} />
               </button>
            </div>
          </div>
        ))}
      </div>

      {/* ADD BUTTON */}
      <button 
        type="button"
        onClick={addRow}
        className="flex items-center gap-2 text-sm font-bold mt-4 px-4 py-3 rounded-xl border-2 border-dashed border-[#e2e8f0] text-[#94a3b8] hover:border-slate-300 hover:text-slate-500 transition-all w-full justify-center"
      >
        <Plus size={16} /> Add {type === "credit" ? "Credit Item" : "Line Item"}
      </button>
    </div>
  );
}