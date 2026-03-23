export default function InvoiceDetails() {
   
    return(
        
        <div>
 <div className="flex flex-col">
  
    <input
      type="text"
      placeholder="Your Company"  
      className="bg-transparent  h-7 rounded-md p-2 placeholder-slate-400 focus:outline-none focus:ring focus:ring-primary mt-1"
    />
    <input
      type="text"
      placeholder="Your Name"
      className=" bg-transparent  h-7 rounded-md p-2 placeholder-slate-400 focus:outline-none focus:ring focus:ring-primary mt-1"
    />
    <input
      type="text"
      placeholder="Company Address"
      className="bg-transparent  h-7 rounded-md p-2 placeholder-slate-400 focus:outline-none focus:ring  focus:ring-primary mt-1"
    />
    <input
      type="text"
      placeholder="City, State, Zip"
      className=" bg-transparent  h-7 rounded-md p-2 placeholder-slate-400 focus:outline-none  focus:ring focus:ring-primary mt-1"
    />
    <input
      type="text"
      placeholder="Nigeria"
      className="bg-transparent h-7 rounded-md p-2 placeholder-slate-400 focus:outline-none focus:ring focus:ring-primary mt-1"
    />
</div>

{/* CLIENT DETAILS */}
<div className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-10">
<div className="flex flex-col w-1/2  mt-6">
    <h2 className="mb-2 font-semibold">Bill To:</h2>
    <input
      type="text"
      placeholder="Your client Company"
      className="bg-transparent  h-7 rounded-md p-2 placeholder-slate-400 focus:outline-none focus:ring focus:ring-primary mt-1"
    /> 
    <input
      type="text"
      placeholder="Client's Address"
      className=" bg-transparent  h-7 rounded-md p-2 placeholder-slate-400 focus:outline-none focus:ring focus:ring-primary mt-1"
    />
    <input
      type="text"
      placeholder="City, State, Zip"
      className=" bg-transparent h-7 rounded-md p-2 placeholder-gray-400 focus:outline-none  focus:ring focus:ring-primary mt-1"
    />
    <input
      type="text"
      placeholder="Nigeria"
      className="bg-transparent h-7 rounded-md p-2 placeholder-slate-400 focus:outline-none focus:ring focus:ring-primary mt-1"
    />
  

</div>
      {/* INVOICE DETAILS */}
<div className="flex flex-col w-1/2 mt-6">
    <div className="flex items-center gap-2">
      <label htmlFor="invoiceNumber" className="font-bold text-slate-500">
        Invoice
      </label>
       <input
      type="text"
      placeholder="INV-02"
      className=" bg-transparent h-7 rounded-md p-2 placeholder-slate-400 focus:outline-none focus:ring focus:ring-primary mt-1"
    />
    </div> 
    <div className="flex items-center gap-2">
      <label htmlFor="invoiceDate" className="font-bold text-slate-500">
        Invoice Date 
      </label>
       <input
      type="date"
      className=" bg-transparent h-7 rounded-md p-2 placeholder-slate-400 focus:outline-none focus:ring focus:ring-primary mt-1"
    />
    </div>  
    <div className="flex items-center gap-2">
      <label htmlFor="DueDate" className="font-bold text-slate-500">
        Due Date
      </label>
       <input
      type="date"
      className=" bg-transparent h-7 rounded-md p-2 placeholder-slate-400 focus:outline-none focus:ring focus:ring-primary mt-1"
    />
    </div>
  

</div>
     </div> 
     </div>
    )
}