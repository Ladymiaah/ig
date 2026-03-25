type Row = {
  itemDescription: string;
  qty: number;
  unitPrice: number;
  tax: number;
  amount: number;
};

type InvoiceData = {
  logoUrl?: string;
  companyName: string;
  invoiceAuthor: string;
  companyAddress: string;
  companyCity: string;
  companyCountry: string;
  clientCompany: string;
  clientAddress: string;
  clientCity: string;
  clientCountry: string;
  invoiceNumber: string;
  invoiceDate: string;
  invoiceDueDate: string;
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <h2>
      <span className="text-[#64748b] font-semibold ">{label}:</span>{" "}
      <span className="text-[#4b2e2e]">{value}</span>
    </h2>
  );
}

function formatCurrency(amount: number): string {
  return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function FormPreview({
  data,
  items,
}: {
  data: InvoiceData;
  items: Row[];
}) {
  const {
    logoUrl,
    companyName,
    companyAddress,
    companyCity,
    companyCountry,
    clientCompany,
    clientAddress,
    clientCity,
    invoiceNumber,
    invoiceDate,
    invoiceDueDate,
  } = data;

  return (
    <div id="invoice-download-area" className=" bg-[#ffffff] max-w-3xl mx-auto rounded-lg p-4 md:p-8 border border-[#b4afaf] mt-6">
      

      {/* Company Info */}
{/* Header Section with Logo and Company Info */}
      <div className="flex flex-col md:flex-row justify-between items-start  pb-6 border-b border-[#f9fafb]">
        <div >
          <div className="flex justify-between items-center gap-4 md:w-100">
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt="Company Logo" 
              className="w-20 h-auto object-contain " 
            />
          ) : (
            <div className="w-20 h-20 bg-[#e9e4e4] border-2 border-dashed border-[#b4afaf] rounded flex items-center justify-center text-gray-400 text-[10px] mb-4">
              No Logo
            </div>
          )}
          <h1 className="text-2xl md:text-4xl font-medium text-center">Invoice</h1>
          </div>
          <h2 className="text-xl font-bold text-[#4b2e2e] mt-5">{companyName}</h2>
          <p className="text-xs text-[#475569]">{companyAddress}</p>
          <p className="text-xs text-[#475569]">{companyCity}, {companyCountry}</p>
        </div>

       
      </div>

      {/* Client + Invoice Info */}
    
      <div className="flex flex-col md:flex-row gap-6 justify-between mb-6">
        <div className="w-2/5 md:w-1/2">
          <p className="text-sm font-bold  text-[#4b2e2e]">{clientCompany}</p>
          <p className="text-xs text-[#475569]">{clientAddress}</p>
          <p className="text-xs text-[#475569]">{clientCity}</p>
        </div>

        <div className="w-3/5 md:w-1/2 text-xs">
           <InfoRow label="Invoice Number" value={invoiceNumber} />
          <InfoRow label="Invoice Date" value={invoiceDate} />
          <InfoRow label="Invoice Due Date" value={invoiceDueDate} />
        </div>
      </div>

      {/* Line Items Preview - Optimized for Mobile & Print */}
<div className="mt-8">
  <table className="w-full text-[10px] md:text-sm border-collapse table-fixed">
    <thead className="bg-[#e9e4e4]">
      <tr>
        {/* We assign fixed percentage widths so it doesn't overflow */}
        <th className="border px-2 py-2 text-left w-[30%] md:w-[40%]">Item</th>
        <th className="border px-1 py-2 w-[8%]">Qty</th>
        <th className="border px-1 py-2 w-[15%]">Price</th>
        <th className="border px-1 py-2 w-[8%]">Tax</th>
        <th className="border px-2 py-2 text-right w-[25%]">Total</th>
      </tr>
    </thead>
    <tbody>
      {items.map((item, index) => (
        <tr key={index} className="break-inside-avoid">
          <td className="border px-2 py-2 truncate md:whitespace-normal">
            {item.itemDescription}
          </td>
          <td className="border px-1 py-2 text-center">{item.qty}</td>
          <td className="border px-1 py-2 text-center">₦{item.unitPrice}</td>
          <td className="border px-1 py-2 text-center">{item.tax}%</td>
          <td className="border px-2 py-2 text-right  font-semibold">
            ₦{formatCurrency(item.amount)}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      {/* Summary Section */}
      <div className="mt-6 flex justify-end">
        <div className="w-full md:w-1/3">
          <div className="flex justify-between text-sm md:text-base py-2 border-t border-[#b4afaf]">
            <span className="font-semibold text-[#4b2e2e]">Subtotal:</span>
            <span className="text-[#4b2e2e]">
              ₦{formatCurrency(items.reduce((sum, item) => sum + (item.amount / (1 + item.tax / 100)), 0))}
            </span>
          </div>
          <div className="flex justify-between text-sm md:text-base py-2">
            <span className="font-semibold text-[#4b2e2e]">Tax:</span>
            <span className="text-[#4b2e2e]">
              ₦{formatCurrency(items.reduce((sum, item) => sum + (item.amount - item.amount / (1 + item.tax / 100)), 0))}
            </span>
          </div>
          <div className="flex justify-between text-base md:text-lg py-2 border-t-2 border-[#4b2e2e]">
            <span className="font-bold text-[#4b2e2e]">Total:</span>
            <span className="font-bold text-[#4b2e2e]">
             ₦{formatCurrency(items.reduce((sum, item) => sum + item.amount, 0))}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
