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
      <h1 className="text-2xl md:text-4xl font-medium text-center">Invoice</h1>

      {/* Company Info */}
{/* Header Section with Logo and Company Info */}
      <div className="flex flex-col md:flex-row justify-between items-start  pb-6 border-b border-[#f9fafb]">
        <div >
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt="Company Logo" 
              className="max-w-xl h-auto object-contain " 
            />
          ) : (
            <div className="w-20 h-20 bg-[#e9e4e4] border-2 border-dashed border-[#b4afaf] rounded flex items-center justify-center text-gray-400 text-[10px] mb-4">
              No Logo
            </div>
          )}
          <h2 className="text-xl font-bold text-[#4b2e2e]">{companyName}</h2>
          <p className="text-xs text-[#475569]">{companyAddress}</p>
          <p className="text-xs text-[#475569]">{companyCity}, {companyCountry}</p>
        </div>

       
      </div>

      {/* Client + Invoice Info */}
    
      <div className="flex flex-row gap-6 justify-between mb-6">
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
        <th className="border px-2 py-2 text-left w-[40%]">Item</th>
        <th className="border px-1 py-2 w-[10%]">Qty</th>
        <th className="border px-1 py-2 w-[15%]">Price</th>
        <th className="border px-1 py-2 w-[15%]">Tax</th>
        <th className="border px-2 py-2 text-right w-[20%]">Total</th>
      </tr>
    </thead>
    <tbody>
      {items.map((item, index) => (
        <tr key={index} className="break-inside-avoid">
          <td className="border px-2 py-2 truncate md:whitespace-normal">
            {item.itemDescription}
          </td>
          <td className="border px-1 py-2 text-center">{item.qty}</td>
          <td className="border px-1 py-2 text-center">{item.unitPrice}</td>
          <td className="border px-1 py-2 text-center">{item.tax}%</td>
          <td className="border px-2 py-2 text-right font-semibold">
            {item.amount.toFixed(2)}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
}
