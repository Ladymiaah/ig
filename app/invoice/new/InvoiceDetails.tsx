export default function InvoiceDetails({ isPreview = false }: { isPreview?: boolean }) {
    if (isPreview) {
        return (
            <div className="rounded-lg p-4 bg-gray-50">
               <h2 className="font-semibold mb-2">Invoice Preview</h2>
               <p className="text-sm text-muted">Preview mode — invoice will be shown here</p>
            </div>
        )
    }
    return(
        
        <div className="">
 <div className="flex flex-col">
  
    <input
      type="text"
      placeholder="Your Company"
      readOnly={isPreview}
      className="bg-transparentrounded-md p-2 placeholder-gray-400 focus:outline-none focus:ring focus:ring-primary mt-1"
    />
  

  
    <input
      type="text"
      placeholder="Your Name"
      readOnly={isPreview}
      className=" bg-transparent rounded-md p-2 placeholder-gray-400 focus:outline-none focus:ring focus:ring-primary mt-1"
    />

  
    <input
      type="text"
      placeholder="Company Address"
      readOnly={isPreview}
      className="bg-transparent rounded-md p-2 placeholder-gray-400 focus:outline-none focus:ring  focus:ring-primary mt-1"
    />

  
    <input
      type="text"
      placeholder="City, State, Zip"
      readOnly={isPreview}
      className=" bg-transparent rounded-md p-2 placeholder-gray-400 focus:outline-none  focus:ring focus:ring-primary mt-1"
    />

  
    <input
      type="text"
      placeholder="Nigeria"
      className="bg-transparent rounded-md p-2 placeholder-gray-400 focus:outline-none focus:ring focus:ring-primary mt-1"
    />
  

</div>
<div className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-10">
<div className="flex flex-col w-1/2  mt-6">
    <h2 className="">Bill To:</h2>
    <input
      type="text"
      placeholder="Your Company"
      className="bg-transparentrounded-md p-2 placeholder-gray-400 focus:outline-none focus:ring focus:ring-primary mt-1"
    /> 
    <input
      type="text"
      placeholder="Your Name"
      className=" bg-transparent rounded-md p-2 placeholder-gray-400 focus:outline-none focus:ring focus:ring-primary mt-1"
    />
    <input
      type="text"
      placeholder="Company Address"
      className="bg-transparent rounded-md p-2 placeholder-gray-400 focus:outline-none focus:ring  focus:ring-primary mt-1"
    />
    <input
      type="text"
      placeholder="City, State, Zip"
      className=" bg-transparent rounded-md p-2 placeholder-gray-400 focus:outline-none  focus:ring focus:ring-primary mt-1"
    />
    <input
      type="text"
      placeholder="Nigeria"
      className="bg-transparent rounded-md p-2 placeholder-gray-400 focus:outline-none focus:ring focus:ring-primary mt-1"
    />
  

</div>

<div className="flex flex-col w-1/2 mt-6">
    <h2 className="">Bill To:</h2>
    <input
      type="text"
      placeholder="Your Company"
      className="bg-transparentrounded-md p-2 placeholder-gray-400 focus:outline-none focus:ring focus:ring-primary mt-1"
    /> 
    <input
      type="text"
      placeholder="Your Name"
      className=" bg-transparent rounded-md p-2 placeholder-gray-400 focus:outline-none focus:ring focus:ring-primary mt-1"
    />
    <input
      type="text"
      placeholder="Company Address"
      className="bg-transparent rounded-md p-2 placeholder-gray-400 focus:outline-none focus:ring  focus:ring-primary mt-1"
    />
    <input
      type="text"
      placeholder="City, State, Zip"
      className=" bg-transparent rounded-md p-2 placeholder-gray-400 focus:outline-none  focus:ring focus:ring-primary mt-1"
    />
    <input
      type="text"
      placeholder="Nigeria"
      className="bg-transparent rounded-md p-2 placeholder-gray-400 focus:outline-none focus:ring focus:ring-primary mt-1"
    />
  

</div>
     </div> 
     </div>
    )
}