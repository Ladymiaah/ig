"use client";

// --- Types ---
type Row = {
  itemDescription: string;
  qty: number;
  unitPrice: number;
  tax: number;
  amount: number;
};

// --- Helper for Currency ---
function formatCurrency(amount: number): string {
  return amount.toLocaleString('en-US', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  });
}

export default function SpecialtyFormPreview({
  data,
  items,
  specialtyType,
  specialtyColor = "#3b82f6", // Default fallback color
  total,
  isPreview = true, // Toggle for the buttons
}: any) {
  
  // Defensive check for items to prevent map crashes
  const safeItems = items || [];
  
  // Format total amount defensively
  const formattedTotal = Number(total || 0);

  return (
    <div className="bg-[#ffffff] max-w-4xl mx-auto rounded-3xl shadow-2xl overflow-hidden border border-[#e2e8f0] flex flex-col md:flex-row min-h-[800px]">
      
      {/* SIDEBAR */}
      <div className="w-full md:w-16 flex md:flex-col items-center justify-between p-6" style={{ backgroundColor: specialtyColor }}>
         <div className="rotate-0 md:-rotate-90 whitespace-nowrap text-[#ffffff] font-black tracking-[0.3em] uppercase text-xl opacity-40">
            {specialtyType}
         </div>
         {/* Transparency using white/20 */}
         <div className="hidden md:block w-1 h-20 bg-white/20 rounded-full"></div>
      </div>

      <div className="flex-1 p-10 relative">
        
        {/* PAST DUE STAMP */}
        {specialtyType === "past-due" && (
          <div className="absolute top-40 right-10 border-[10px] border-[#dc2626] p-4 rotate-[-15deg] opacity-10 z-0 select-none no-print">
            <h1 className="text-4xl md:text-8xl font-black text-[#dc2626]">PAST DUE</h1>
          </div>
        )}

        {/* HEADER */}
        {/* mobile view adjustments  */}
        <div className="md:hidden text-center mb-8">
            <h2 className="text-2xl font-bold text-[#1e293b]">{data.companyName}</h2>
            <p className="text-[#64748b] text-sm">{data.companyAddress}</p>
        </div>

        {/* desktop view adjustments */}
        <div className="flex justify-between items-start mb-8 md:mb-16">
          <div>
            {data.logoUrl && <img src={data.logoUrl} alt="Logo" className="h-20 mb-6 object-contain" />}
            <h2 className="hidden md:block md:text-4xl md:font-black text-[#1e293b]">{data.companyName}</h2>
            <p className="hidden md:block text-[#64748b] text-sm">{data.companyAddress}</p>
          </div>
          <div className="text-right">
            <p className="text-[#94a3b8] text-[10px] font-black uppercase mb-1 tracking-widest">
              {specialtyType === "credit" ? "Amount to Refund" : "Total Outstanding"}
            </p>
            <p className="text-3xl md:text-5xl font-black" style={{ color: specialtyColor }}>
              ₦{formatCurrency(formattedTotal)}
            </p>
            
            {/* PROGRESS BAR */}
            {specialtyType === "progress" && (
              <div className="mt-4 text-right">
                <p className="text-xs font-bold text-[#64748b] mb-1">Project Completion: {data.completionRate || 0}%</p>
                <div className="w-40 h-2 bg-[#f1f5f9] rounded-full ml-auto overflow-hidden">
                  <div 
                    className="h-full transition-all duration-1000" 
                    style={{ width: `${data.completionRate || 0}%`, backgroundColor: specialtyColor }}>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CREDIT SPECIFIC INFO */}
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
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12 border-y border-[#f1f5f9] py-8">
          <div>
            <h4 className="text-[10px] font-black text-[#94a3b8] uppercase mb-2tracking-widest">Billed To</h4>
            <p className="font-bold text-[#1e293b]">{data.clientCompany}</p>
            <p className="text-[#64748b] text-sm whitespace-pre-wrap">{data.clientAddress}</p>
          </div>
          <div className="text-right">
            <h4 className="text-[10px] font-black text-[#94a3b8] uppercase mb-2 tracking-widest">Reference</h4>
            <p className="text-[#1e293b] font-bold">#{data.invoiceNumber || "N/A"}</p>
            <p className="text-[#64748b] text-sm">Date: {data.invoiceDate}</p>
            
            {/* Hide Due Date for Credit Memo */}
            {specialtyType !== "credit" && (
              <p className="font-bold text-sm" style={{ color: specialtyColor }}>Due: {data.invoiceDueDate}</p>
            )}
          </div>
        </div>

        {/* ITEMS LIST */}
        <div className="mb-12">
          <div className="flex justify-between text-[10px] font-black text-[#94a3b8] uppercase border-b border-[#e2e8f0] pb-2 mb-4 tracking-widest">
            <span>Description</span>
            <span>Amount</span>
          </div>
          <div className="space-y-4">
            {safeItems.map((item: Row, i: number) => (
              <div key={i} className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-[#1e293b]">{item.itemDescription}</p>
                  <p className="text-xs text-[#94a3b8]">{item.qty} × ₦{formatCurrency(item.unitPrice)}</p>
                </div>
                <p className="font-bold text-[#1e293b]">₦{formatCurrency(item.amount)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* LATE FEE DETAIL */}
        {specialtyType === "past-due" && Number(data.lateFee) > 0 && (
          <div className="flex justify-between py-4 border-t-2 border-dashed border-[#fef2f2] text-[#dc2626]">
            <span className="text-sm font-bold">Late Payment Penalty ({data.lateFee}%)</span>
            {/* Simple math to isolate the late fee amount */}
            <span className="font-bold">+ ₦{formatCurrency(formattedTotal - (formattedTotal / (1 + Number(data.lateFee)/100)))}</span>
          </div>
        )}

        {/* NOTES SECTION */}
        {data.notes && (
            <div className="mt-16 p-6 bg-[#f8fafc] rounded-2xl border border-[#f1f5f9]">
              <p className="text-[10px] font-black text-[#94a3b8] uppercase mb-2 tracking-widest">Notes</p>
              <p className="text-sm text-[#475569] italic">"{data.notes}"</p>
            </div>
        )}
      </div>
    </div>
  );
}