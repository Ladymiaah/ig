"use client";

import { Plus, XCircle } from "lucide-react";

export type Row = {
  itemDescription: string;
  qty: number;
  unitPrice: number;
  tax: number;
  amount: number;
};

type FormTableProps = {
  tableData: Row[];
  setTableData: React.Dispatch<React.SetStateAction<Row[]>>;
};

export default function FormTable({ tableData, setTableData }: FormTableProps) {
  function addRow() {
    setTableData([
      ...tableData,
      { itemDescription: "", qty: 0, unitPrice: 0, tax: 0, amount: 0 },
    ]);
  }

  function deleteRow(index: number) {
    const updatedData = [...tableData];
    updatedData.splice(index, 1);
    setTableData(updatedData);
  }

  function handleInputChange(
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setTableData(prev => {
      const updated = [...prev];
      const row = { ...updated[index] };

      // Numeric fields
      if (name === "qty" || name === "unitPrice" || name === "tax") {
        row[name as "qty" | "unitPrice" | "tax"] = parseFloat(value) || 0;
      }

      // Text fields
      if (name === "itemDescription") {
        row.itemDescription = value;
      }

      // Calculate amount including tax
      row.amount = row.qty * row.unitPrice * (1 + row.tax / 100);

      updated[index] = row;
      return updated;
    });
  }

  return (
    <div className="my-10 relative bg-[#f9fafb] shadow-sm rounded-base border border-[#e5e7eb]">
      <div className="overflow-x-auto [scrollbar-width:none]">
        <table className="w-full text-sm text-left ">
          <thead className="bg-black text-[#e5e7eb] border-b border-[#e5e7eb]">
            <tr>
              <th className="px-6 py-3 font-medium">Item Description</th>
              <th className="px-6 py-3 font-medium">Qty</th>
              <th className="px-6 py-3 font-medium">Unit Price</th>
              <th className="px-6 py-3 font-medium">Tax</th>
              <th className="px-6 py-3 font-medium">Amount</th>
              <th className="px-6 py-3 font-medium text-black">Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr
                key={index}
                className="bg-[#f9fafb] hover:bg-[#eceef0] border-b border-[#e5e7eb]"
              >
                <td className="px-6 py-4">
                  <textarea
                    className="text-sm h-10 rounded-sm focus:outline-none focus:ring focus:ring-primary p-2 shadow-xs placeholder:text-body w-full"
                    placeholder="Item Description"
                    name="itemDescription"
                    value={row.itemDescription}
                    onChange={e => handleInputChange(index, e)}
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    placeholder="0"
                    name="qty"
                    value={row.qty}
                    onChange={e => handleInputChange(index, e)}
                    className="w-16 h-10 p-2 rounded-sm shadow-xs focus:outline-none focus:ring focus:ring-primary"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    placeholder="0"
                    name="unitPrice"
                    value={row.unitPrice}
                    onChange={e => handleInputChange(index, e)}
                    className="w-24 h-10 p-2 rounded-sm shadow-xs focus:outline-none focus:ring focus:ring-primary"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    placeholder="0"
                    name="tax"
                    value={row.tax}
                    onChange={e => handleInputChange(index, e)}
                    className="w-12 h-10 p-2 rounded-sm shadow-xs focus:outline-none focus:ring focus:ring-primary"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    name="amount"
                    value={row.amount.toFixed(2)}
                    readOnly
                    className="bg-transparent h-10 w-24 p-2 rounded-sm shadow-xs focus:outline-none focus:ring focus:ring-primary"
                  />
                </td>
                <td className="px-6 py-4">
                  <button
                    type="button"
                    onClick={() => deleteRow(index)}
                    className="flex items-center text-red-500"
                  >
                    <XCircle size={16} className="cursor-pointer" />
                  </button>
                </td>
              </tr>
            ))}


          </tbody>
        </table>
      </div>

      <button
        type="button"
        onClick={addRow}
        className="py-3 flex items-center gap-2 text-sm text-[#6b21a8] font-medium mx-6 mt-4"
      >
        <Plus size={16} /> Add line item
      </button>
    </div>
  );
}
