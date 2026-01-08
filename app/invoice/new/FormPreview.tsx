type Row = {
  itemDescription: string;
  qty: number;
  unitPrice: number;
  tax: number;
  amount: number;
};

export default function FormPreview({
  data,
  items,
}: {
  data: any;
  items: Row[];
}) {

   const {
    companyName,
    invoiceAuthor,
    companyAddress,
    companyCity,
    companyCountry,
    clientCompany,
    clientAddress,
    clientCity,
    clientCountry,
    invoiceNumber,
    invoiceDate,
    invoiceDueDate,
    } = data;

    type Row = {
  itemDescription: string;
  qty: number;
  unitPrice: number;
  tax: number;
  amount: number;
};

    function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <h2 >
      <span className="text-slate-500 font-semibold ">{label}:</span>{" "}
      <span className="text-[#4b2e2e]">{value}</span>
    </h2>
  );
}

    return(
      <div>
        <div className="max-w-4xl mx-auto rounded-lg p-4 md:p-8 border-1 border-[#b4afaf] mt-6 ">
      <h1 className="text-3xl font-extrabold m-6">Preview</h1>
      
        <div className="mb-5 ">
        <InfoRow label="Company Name" value={companyName} />
        <InfoRow label="Invoice Author" value={invoiceAuthor} />
        <InfoRow label="Company Address" value={companyAddress} />
        <InfoRow label="Company City" value={companyCity} />
        <InfoRow label="Company Country" value={companyCountry} />
      </div>
      <div className="flex flex-col  md:flex-row gap-4 justify-between mb-6 ">
      <div className="w-1/2">
        <InfoRow label="Client Company" value={clientCompany} />
        <InfoRow label="Client Address" value={clientAddress} />
        <InfoRow label="Client City" value={clientCity} />
        <InfoRow label="Client Country" value={clientCountry} />
      </div>
      
        <div className="w-1/2 items-center  ">
        <InfoRow label="Invoice Number" value={invoiceNumber} />
        <InfoRow label="Invoice Date" value={invoiceDate} />
        <InfoRow label="Invoice Due Date" value={invoiceDueDate} />
        </div>

      </div>
      </div>
      </div>
    );
};