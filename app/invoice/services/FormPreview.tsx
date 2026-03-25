import DownloadButton from '@/app/invoice-actions/DownloadButton';
import PrintButton from '@/app/invoice-actions/PrintButton';
import React from 'react';

// --- Types ---
type Row = {
  id: string; // Added ID for easier state management
  itemDescription: string;
  qty: number;
  unitPrice: number;
  tax: number;
  amount: number;
};

type ServiceInvoiceData = {
  logoUrl?: string;
  companyName: string;
  invoiceAuthor: string;
  companyAddress: string;
  companyEmail?: string;
  clientCompany: string;
  clientAddress: string;
  invoiceNumber: string;
  invoiceDate: string;
  invoiceDueDate: string;
  notes?: string;
};

// --- Helper ---
function formatCurrency(amount: number): string {
  return amount.toLocaleString('en-US', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  });
}

export default function ServiceFormPreview({
  data,
  items,
  isPreview = true, // Added a toggle for the buttons
}: {
  data: ServiceInvoiceData;
  items: Row[];
  isPreview?: boolean;
}) {
  const {
    logoUrl,
    companyName,
    invoiceAuthor,
    companyAddress,
    companyEmail,
    clientCompany,
    clientAddress,
    invoiceNumber,
    invoiceDate,
    invoiceDueDate,
    notes,
  } = data;

  const totalCalculated = items.reduce((sum, item) => sum + item.amount, 0);
  const subTotal = items.reduce((sum, item) => sum + (item.amount / (1 + item.tax / 100)), 0);
  const totalTax = items.reduce((sum, item) => sum + (item.amount - item.amount / (1 + item.tax / 100)), 0);

  return (
    <div className="space-y-6">

      {/* INVOICE AREA */}
      <div id="invoice-download-area" className="bg-[#ffffff] max-w-4xl mx-auto rounded-2xl shadow-xl overflow-hidden border border-[#e2e8f0]">
        
        {/* HEADER */}
        <div className="bg-[#1e293b] p-6 md:p-10 text-[#ffffff]">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
            <div>
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="h-14 md:h-20 object-contain mb-4" />
              ) : (
                <div className="w-16 h-16 bg-[#334155] border-2 border-dashed border-[#475569] rounded flex items-center justify-center text-[#94a3b8] text-[10px] mb-4 uppercase">Logo</div>
              )}
              <h1 className="text-2xl md:text-3xl font-bold">{companyName}</h1>
              <p className="text-[#cbd5e1] text-sm">{invoiceAuthor}</p>
               <div className="text-[#cbd5e1] text-xs md:text-sm max-w-md">
            <p>{companyAddress}</p>
            {companyEmail && <p className="mt-1">{companyEmail}</p>}
          </div>
            </div>
            <div className="w-full md:w-auto md:text-right border-t border-[#334155] pt-4 md:border-0 md:pt-0">
              <p className="text-[#94a3b8] text-xs uppercase tracking-widest mb-1">Amount Due</p>
              <p className="text-3xl md:text-5xl font-bold text-[#c084fc]">
                ₦{formatCurrency(totalCalculated)}
              </p>
            </div>
          </div>
         
        </div>

        {/* CONTENT BODY */}
        <div className="p-6 md:p-10">
          
          {/* INFO GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6  pb-10 border-b border-[#f1f5f9]">
  <div>
    <p className="text-[#94a3b8] text-[10px] uppercase font-bold ">Invoice Number</p>
    <p className="text-md md:text-lg font-bold text-[#1e293b]">{invoiceNumber || "---"}</p>
  </div>
  
  <div className="text-right md:text-left"> 
    <p className="text-[#94a3b8] text-[10px] uppercase font-bold">Date Issued</p>
    <p className="text-md md:text-lg font-bold text-[#1e293b]">{invoiceDate}</p>
  </div>

  {/* Centered on mobile via text-center, back to left-aligned on desktop */}
  <div className="col-span-2 md:col-span-1 text-center md:text-left">
    <p className="text-[#94a3b8] text-[10px] uppercase font-bold">Payment Due</p>
    <p className="text-md md:text-lg font-bold text-[#1e293b]">{invoiceDueDate}</p>
  </div>
</div>

          {/* BILLING SECTION */}
          <div className="grid md:grid-cols-2 md:gap-10 mb-10">
            <div className='hidden md:block'>
              <p className="text-[#94a3b8] text-[10px] uppercase font-bold mb-3">Issued By</p>
              <p className="font-bold text-[#1e293b]">{companyName}</p>
              <p className="text-sm text-[#64748b] leading-relaxed">{companyAddress}</p>
            </div>
            <div>
              <p className="text-[#94a3b8] text-[10px] uppercase font-bold mb-3">Bill To</p>
              <p className="font-bold text-[#1e293b]">{clientCompany}</p>
              <p className="text-sm text-[#64748b] whitespace-pre-wrap leading-relaxed">{clientAddress}</p>
            </div>
          </div>

          {/* TABLE / ITEMS LIST */}
          <div className="mb-8 overflow-hidden rounded-xl border border-[#e2e8f0]">
            {/* Desktop Table */}
            <table className="hidden md:table w-full">
              <thead className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                <tr>
                  <th className="px-6 py-4 text-left text-[10px] font-bold text-[#475569] uppercase">Description</th>
                  <th className="px-6 py-4 text-center text-[10px] font-bold text-[#475569] uppercase w-20">Qty</th>
                  <th className="px-6 py-4 text-right text-[10px] font-bold text-[#475569] uppercase w-40">Unit Price</th>
                  <th className="px-6 py-4 text-right text-[10px] font-bold text-[#475569] uppercase w-32">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e8f0]">
                {items.map((item, idx) => (
                  <tr key={item.id || idx} className="hover:bg-[#fcfcfd] transition-colors">
                    <td className="px-6 py-4 text-sm text-[#1e293b] font-medium">{item.itemDescription}</td>
                    <td className="px-6 py-4 text-center text-sm text-[#1e293b]">{item.qty}</td>
                    <td className="px-6 py-4 text-right">
                      {/* Editable Unit Price UI */}
                      
                        <input 
                          type="number"
                          defaultValue={item.unitPrice}
                          className="w-24 bg-transparent text-right border-b border-dashed border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none"
                        />
                      
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-bold text-[#1e293b]">₦{formatCurrency(item.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile Card List */}
            <div className="md:hidden divide-y divide-[#e2e8f0]">
              {items.map((item, idx) => (
                <div key={item.id || idx} className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-[#1e293b] text-sm">{item.itemDescription}</span>
                    <span className="text-xs bg-slate-100 px-2 py-1 rounded text-[#475569]">Tax {item.tax}%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="text-[#64748b]">
                      {item.qty} units × ₦{formatCurrency(item.unitPrice)}
                    </div>
                    <div className="font-bold text-[#1e293b]">
                      ₦{formatCurrency(item.amount)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CALCULATION SUMMARY */}
          <div className="flex justify-end">
            <div className="w-full md:w-72 space-y-3">
              <div className="flex justify-between text-sm text-[#64748b]">
                <span>Subtotal</span>
                <span>₦{formatCurrency(subTotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-[#64748b]">
                <span>VAT / Tax</span>
                <span>₦{formatCurrency(totalTax)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-[#1e293b] pt-4 border-t-2 border-[#1e293b]">
                <span>Total Due</span>
                <span className="text-[#7e22ce]">₦{formatCurrency(totalCalculated)}</span>
              </div>
            </div>
          </div>

          {/* FOOTER NOTES */}
          {notes && (
            <div className="mt-12 bg-[#f8fafc] p-5 rounded-xl border border-[#e2e8f0]">
              <p className="text-[10px] uppercase font-bold text-[#94a3b8] mb-2 tracking-widest">Notes & Instructions</p>
              <p className="text-sm text-[#475569] leading-relaxed italic">"{notes}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}