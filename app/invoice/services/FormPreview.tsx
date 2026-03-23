type Row = {
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

function formatCurrency(amount: number): string {
  return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function ServiceFormPreview({
  data,
  items,
}: {
  data: ServiceInvoiceData;
  items: Row[];
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

  return (
    <div id="invoice-download-area" className="bg-[#ffffff] max-w-4xl mx-auto rounded-2xl p-2 shadow-xl overflow-hidden border border-[#e2e8f0]">
      {/* HEADER - Solid Slate 800 for best PDF compatibility */}
      <div className="bg-[#1e293b] p-8 text-[#ffffff] rounded-tl-2xl rounded-tr-2xl">
        <div className="flex justify-between items-start mb-8">
          <div>
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt="Company Logo" 
                className="h-16 object-contain mb-4" 
              />
            ) : (
              <div className="w-16 h-16 bg-[#334155] border-2 border-dashed border-[#475569] rounded flex items-center justify-center text-[#94a3b8] text-[10px] mb-4">
                Logo
              </div>
            )}
            <h1 className="text-3xl font-bold mb-1 text-[#ffffff]">{companyName}</h1>
            <p className="text-[#cbd5e1] text-sm">{invoiceAuthor}</p>
          </div>
          <div className="text-right">
            <p className="text-[#94a3b8] text-xs uppercase tracking-widest mb-2">Service Invoice</p>
            <p className="text-4xl font-bold text-[#c084fc]">
              ₦{formatCurrency(totalCalculated)}
            </p>
          </div>
        </div>

        <div className="text-[#cbd5e1] text-sm space-y-1">
          <p>{companyAddress}</p>
          {companyEmail && <p>{companyEmail}</p>}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-8 bg-[#ffffff]">
        {/* INVOICE DETAILS */}
        <div className="grid grid-cols-3 gap-8 mb-12 pb-8 border-b border-[#e2e8f0]">
          <div>
            <p className="text-[#94a3b8] text-xs uppercase font-bold mb-1">Invoice #</p>
            <p className="text-xl font-bold text-[#1e293b]">{invoiceNumber}</p>
          </div>
          <div>
            <p className="text-[#94a3b8] text-xs uppercase font-bold mb-1">Issued Date</p>
            <p className="text-xl font-bold text-[#1e293b]">{invoiceDate}</p>
          </div>
          <div>
            <p className="text-[#94a3b8] text-xs uppercase font-bold mb-1">Due Date</p>
            <p className="text-xl font-bold text-[#1e293b]">{invoiceDueDate}</p>
          </div>
        </div>

        {/* FROM & TO */}
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <p className="text-[#94a3b8] text-xs uppercase font-bold mb-3">From</p>
            <p className="text-lg font-bold text-[#1e293b] mb-1">{companyName}</p>
            <p className="text-sm text-[#475569]">{invoiceAuthor}</p>
            <p className="text-sm text-[#475569]">{companyAddress}</p>
            {companyEmail && <p className="text-sm text-[#475569]">{companyEmail}</p>}
          </div>

          <div>
            <p className="text-[#94a3b8] text-xs uppercase font-bold mb-3">Bill To</p>
            <p className="text-lg font-bold text-[#1e293b]">{clientCompany}</p>
            <p className="text-sm text-[#475569] whitespace-pre-wrap">{clientAddress}</p>
          </div>
        </div>

        {/* SERVICES TABLE */}
        <div className="mb-8 overflow-hidden rounded-lg border border-[#e2e8f0]">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                <th className="px-4 py-3 text-left text-xs font-bold text-[#475569] uppercase">Service Description</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-[#475569] uppercase w-20">Qty</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-[#475569] uppercase w-24">Unit Price</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-[#475569] uppercase w-16">Tax</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-[#475569] uppercase w-28">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-4 text-[#1e293b] text-sm">{item.itemDescription}</td>
                  <td className="px-4 py-4 text-center text-[#1e293b] text-sm">{item.qty}</td>
                  <td className="px-4 py-4 text-right text-[#1e293b] text-sm">₦{formatCurrency(item.unitPrice)}</td>
                  <td className="px-4 py-4 text-center text-[#1e293b] text-sm">{item.tax}%</td>
                  <td className="px-4 py-4 text-right font-semibold text-[#1e293b] text-sm">₦{formatCurrency(item.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* SUMMARY */}
        <div className="flex justify-end mb-12">
          <div className="w-full md:w-80 space-y-2">
            <div className="flex justify-between text-sm text-[#475569] pb-2 border-b border-[#f1f5f9]">
              <span>Subtotal:</span>
              <span>₦{formatCurrency(items.reduce((sum, item) => sum + (item.amount / (1 + item.tax / 100)), 0))}</span>
            </div>
            <div className="flex justify-between text-sm text-[#475569] pb-2 border-b border-[#f1f5f9]">
              <span>Tax:</span>
              <span>₦{formatCurrency(items.reduce((sum, item) => sum + (item.amount - item.amount / (1 + item.tax / 100)), 0))}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-[#1e293b] pt-2 border-t-2 border-[#1e293b]">
              <span>Total Due:</span>
              <span className="text-[#7e22ce]">₦{formatCurrency(totalCalculated)}</span>
            </div>
          </div>
        </div>

        {/* NOTES */}
        {notes && (
          <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e2e8f0]">
            <p className="text-[10px] uppercase font-bold text-[#94a3b8] mb-2 tracking-widest">Notes & Instructions</p>
            <p className="text-sm text-[#475569] leading-relaxed">{notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}