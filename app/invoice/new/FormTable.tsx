"use client";

import { Plus, XCircle } from "lucide-react";
import { useState } from "react";

export default function FormTable(){
    const [tableData, setTableData] = useState([
        {
            itemDescription: "",
            qty: 0,
            unitPrice: 0,
            tax: 0,
            amount: 0,
        }
    ]);
        function addRow() {
        setTableData([...tableData, {
            itemDescription: "",
            qty: 0,
            unitPrice: 0,
            tax: 0,
            amount: 0,
        }])
        };
            
        function deleteRow(index: number) {
            const updatedData = [...tableData];
            updatedData.splice(index, 1);
            setTableData(updatedData);
        }

type Row = {
  itemDescription: string;
  qty: number;
  unitPrice: number;
  tax: number;
  amount: number; // total
};
function handleInputChange(
  index: number,
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) {
  const { name, value } = e.target;

  setTableData(prev => {
    const updated = [...prev];
    const row = { ...updated[index] };

    // Convert numeric fields to numbers
    if (name === "qty" || name === "unitPrice" || name === "tax") {
      row[name as "qty" | "unitPrice" | "tax"] = parseFloat(value) || 0;
    }

    // Text fields
    if (name === "itemDescription") {
      row.itemDescription = value;
    }

    // Calculate amount including tax
    const qty = row.qty;
    const price = row.unitPrice;
    const taxPercent = row.tax;

    // amount = qty * unitPrice * (1 + tax/100)
    row.amount = qty * price * (1 + taxPercent / 100);

    updated[index] = row;
    return updated;
  });
}
    return(
        <div className="my-10 relative bg-[#f9fafb] shadow-sm rounded-base border border-[#e5e7eb] ">
            
<div className=" overflow-x-auto  [scrollbar-width:none]">

    <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="bg-black text-[#e5e7eb] border-b border-[#e5e7eb]">
            <tr>
                <th scope="col" className="px-6 py-3 font-medium">
                    Item Description
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                    Qty
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                    Unit Price
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                    TAX
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                    Amount
                </th>
                 <th scope="col" className="px-6 py-3 font-medium text-black">
                    action
                </th>
            </tr>
        </thead>
        <tbody>
           {
            tableData.map((row, index) => {
                return(
                     <tr key={index} 
                     className="bg-[#f9fafb] dark:bg-[#2e3135] hover:bg-[#eceef0] dark:hover:bg-[#2e3234] border-b border-[#e5e7eb] ">
                <td scope="row" className=" px-6 py-4 flex items-center font-medium text-heading whitespace-nowrap">
                  <textarea 
                  id="message" 
                  className="text-sm  h-10 rounded-sm focus:outline-none focus:ring focus:ring-primary p-2 shadow-xs placeholder:text-body" 
                  placeholder="Item Description"
                  name= "itemDescription"
                  value={row.itemDescription}
                  onChange={(e) => handleInputChange(index, e)}
                  />
                </td>
                <td className="px-6 py-4">
               <input 
               type="number" 
               className=" w-16 h-10 p-2 font-medium text-heading text-sm shadow-xs rounded-sm focus:outline-none focus:ring focus:ring-primaryshadow-xs placeholder:text-body" 
                placeholder="0" required
                name="qty"
                value={row.qty} 
                 onChange={(e) => handleInputChange(index, e)}
                 />
                </td>
                <td className="px-6 py-4">
                    <input 
               type="number" 
               className=" w-24 h-10 p-2 font-medium text-heading text-sm shadow-xs rounded-sm focus:outline-none focus:ring focus:ring-primaryshadow-xs placeholder:text-body" 
                placeholder="5" required
                name="unitPrice"
                value={row.unitPrice}
                onChange={(e) => handleInputChange(index, e)}
                  />
                </td>
                <td className="px-6 py-4">
                    <input 
               type="number" 
               className=" w-12 h-10 p-2 font-medium text-heading text-sm shadow-xs rounded-sm focus:outline-none focus:ring focus:ring-primaryshadow-xs placeholder:text-body" 
                placeholder="10" required
                name="tax"
                value={row.tax}
                 onChange={(e) => handleInputChange(index, e)}
                  />
                </td>
                <td className="px-6 py-4">
                    <input
             type="number"
             placeholder="0"
             name="amount"
             value={row.amount}
            onChange={(e) => handleInputChange(index, e)}
      className="bg-transparent h-10 w-24 shadow-xs rounded-sm p-2 placeholder-slate-400 focus:outline-none focus:ring focus:ring-primary mt-1"
    />
                </td>
                <td className="px-6 py-4">
                    <button onClick={() => deleteRow(index)} type="button" className="flex items-center ">
                        <XCircle size={16} className="text-red-500 cursor-pointer"/>
                    </button>
                    
                </td>
            </tr>
                )
            })           }


        </tbody>
    </table>
</div>
<button onClick={addRow} type="button" className="py-3 flex items-center text-sm text-[#6b21a8] font-medium mx-6 mt-4">
    <Plus size={16} fontWeight={12} className=" cursor-pointer "/>
    <span className="font-bold">Add line item</span>
</button>
        </div>
    );
};