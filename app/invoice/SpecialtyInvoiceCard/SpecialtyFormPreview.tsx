"use client";

export default function SpecialtyFormPreview({ data, items, specialtyType, specialtyColor, total }: any) {
  return (
    <div className="bg-[#ffffff] max-w-4xl mx-auto rounded-3xl shadow-2xl overflow-hidden border border-[#e2e8f0] flex flex-col md:flex-row min-h-[800px]">
      
      {/* SIDEBAR */}
      <div className="w-full md:w-16 flex md:flex-col items-center justify-between p-6" style={{ backgroundColor: specialtyColor }}>
         <div className="rotate-0 md:-rotate-90 whitespace-nowrap text-[#ffffff] font-black tracking-[0.3em] uppercase text-xl opacity-40">
            {specialtyType}
         </div>
         <div className="hidden md:block w-1 h-20 bg-white/20 rounded-full"></div>
      </div>

      <div className="flex-1 p-10 relative">
        
        {/* PAST DUE STAMP */}
        {specialtyType === "past-due" && (
          <div className="absolute top-40 right-10 border-[10px] border-[#dc2626] p-4 rotate-[-15deg] opacity-10 z-0 select-none">
            <h1 className="text-8xl font-black text-[#dc2626]">PAST DUE</h1>
          </div>
        )}

        {/* HEADER */}
        <div className="flex justify-between items-start mb-16">
          <div>
            {data.logoUrl && <img src={data.logoUrl} className="h-12 mb-6 object-contain" />}
            <h2 className="text-4xl font-black text-[#1e293b]">{data.companyName}</h2>
            <p className="text-[#64748b] text-sm">{data.companyAddress}</p>
          </div>
          <div className="text-right">
            <p className="text-[#94a3b8] text-[10px] font-black uppercase mb-1 tracking-widest">
              {specialtyType === "credit" ? "Amount to Refund" : "Total Outstanding"}
            </p>
            <p className="text-5xl font-black" style={{ color: specialtyColor }}>₦{total.toLocaleString()}</p>
            
            {/* PROGRESS BAR */}
            {specialtyType === "progress" && (
              <div className="mt-4 text-right">
                <p className="text-[10px] font-bold text-[#64748b] mb-1">Project Completion: {data.completionRate}%</p>
                <div className="w-40 h-2 bg-[#f1f5f9] rounded-full ml-auto overflow-hidden">
                  <div className="h-full transition-all duration-1000" style={{ width: `${data.completionRate}%`, backgroundColor: specialtyColor }}></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CREDIT SPECIFIC INFO (This is what was missing!) */}
        {specialtyType === "credit" && (
          <div className="mb-10 p-5 rounded-2xl border-2 border-dashed border-[#ccfbf1] bg-[#f0fdfa] flex justify-between items-center">
            <div>
              <p className="text-[10px] font-black text-[#0d9488] uppercase tracking-widest">Refund Method</p>
              <p className="text-sm font-bold text-[#134e4a]">{data.refundType || "Store Credit"}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-[#0d9488] uppercase tracking-widest">Original Invoice</p>
              <p className="text-sm font-bold text-[#134e4a]">#{data.referenceInvoice || "N/A"}</p>
            </div>
          </div>
        )}

        {/* INFO GRID */}
        <div className="grid grid-cols-2 gap-12 mb-12 border-y border-[#f1f5f9] py-8">
          <div>
            <h4 className="text-[10px] font-black text-[#94a3b8] uppercase mb-2">Billed To</h4>
            <p className="font-bold text-[#1e293b]">{data.clientCompany}</p>
            <p className="text-[#64748b] text-sm whitespace-pre-wrap">{data.clientAddress}</p>
          </div>
          <div className="text-right">
            <h4 className="text-[10px] font-black text-[#94a3b8] uppercase mb-2">Reference</h4>
            <p className="text-[#1e293b] font-bold">#{data.invoiceNumber}</p>
            <p className="text-[#64748b] text-sm">Date: {data.invoiceDate}</p>
            
            {/* FIX: Hide Due Date for Credit Memo */}
            {specialtyType !== "credit" && (
              <p className="font-bold text-sm" style={{ color: specialtyColor }}>Due: {data.invoiceDueDate}</p>
            )}
          </div>
        </div>

        {/* ITEMS LIST (Same as before) */}
        <div className="mb-12">
          <div className="flex justify-between text-[10px] font-black text-[#94a3b8] uppercase border-b pb-2 mb-4">
            <span>Description</span>
            <span>Amount</span>
          </div>
          <div className="space-y-4">
            {items.map((item: any, i: number) => (
              <div key={i} className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-[#1e293b]">{item.itemDescription}</p>
                  <p className="text-xs text-[#94a3b8]">{item.qty} × ₦{item.unitPrice.toLocaleString()}</p>
                </div>
                <p className="font-bold text-[#1e293b]">₦{item.amount.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        {/* LATE FEE DETAIL (Same as before) */}
        {specialtyType === "past-due" && Number(data.lateFee) > 0 && (
          <div className="flex justify-between py-4 border-t-2 border-dashed border-[#fef2f2] text-[#dc2626]">
            <span className="text-sm font-bold">Late Payment Penalty ({data.lateFee}%)</span>
            <span className="font-bold">+ ₦{(total - (total / (1 + Number(data.lateFee)/100))).toLocaleString()}</span>
          </div>
        )}

        <div className="mt-16 p-6 bg-[#f8fafc] rounded-2xl border border-[#f1f5f9]">
          <p className="text-[10px] font-black text-[#94a3b8] uppercase mb-2">Notes</p>
          <p className="text-sm text-[#475569] italic">"{data.notes}"</p>
        </div>
      </div>
    </div>
  );
}