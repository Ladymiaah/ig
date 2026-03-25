"use client";

import { Plus, XCircle, Trash2 } from "lucide-react";

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

function formatCurrency(amount: number): string {
  return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function FormTable({ tableData, setTableData }: FormTableProps) {
  function addRow() {
    setTableData([
      ...tableData,
      { itemDescription: "", qty: 1, unitPrice: 0, tax: 0, amount: 0 },
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

      if (name === "qty" || name === "unitPrice" || name === "tax") {
        row[name as "qty" | "unitPrice" | "tax"] = parseFloat(value) || 0;
      }

      if (name === "itemDescription") {
        row.itemDescription = value;
      }

      row.amount = row.qty * row.unitPrice * (1 + row.tax / 100);
      updated[index] = row;
      return updated;
    });
  }

  return (
    <div className="my-6 md:my-10 relative">
      {/* DESKTOP VIEW: Standard Table */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-900 text-slate-200 uppercase text-[10px] tracking-wider">
            <tr>
              <th className="px-6 py-4 font-bold">Item Description</th>
              <th className="px-6 py-4 font-bold w-24 text-center">Qty</th>
              <th className="px-6 py-4 font-bold w-40 text-right">Unit Price</th>
              <th className="px-6 py-4 font-bold w-24 text-center">Tax %</th>
              <th className="px-6 py-4 font-bold w-40 text-right">Amount</th>
              <th className="px-6 py-4 font-bold w-16 text-center text-slate-900">.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tableData.map((row, index) => (
              <tr key={index} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3">
                  <textarea
                    rows={1}
                    className="w-full p-2 text-sm bg-transparent border border-transparent focus:border-slate-200 focus:bg-white rounded-md outline-none resize-none transition-all"
                    placeholder="Describe service or product..."
                    name="itemDescription"
                    value={row.itemDescription}
                    onChange={e => handleInputChange(index, e)}
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    name="qty"
                    value={row.qty}
                    onChange={e => handleInputChange(index, e)}
                    className="w-full p-2 text-center bg-transparent border border-transparent focus:border-slate-200 focus:bg-white rounded-md outline-none"
                  />
                </td>
                <td className="px-4 py-3">
                  
                    
                    <input
                      type="number"
                      name="unitPrice"
                      value={row.unitPrice}
                      onChange={e => handleInputChange(index, e)}
                      className="w-28 p-2 text-right bg-transparent border border-transparent focus:border-slate-200 focus:bg-white rounded-md outline-none font-medium"
                    />
                  
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    name="tax"
                    value={row.tax}
                    onChange={e => handleInputChange(index, e)}
                    className="w-full p-2 text-center bg-transparent border border-transparent focus:border-slate-200 focus:bg-white rounded-md outline-none text-slate-500"
                  />
                </td>
                <td className="px-4 py-3 text-right font-bold text-slate-900">
                  ₦{formatCurrency(row.amount)}
                </td>
                <td className="px-4 py-3 text-center">
                  <button onClick={() => deleteRow(index)} className="text-slate-300 hover:text-red-500 transition-colors">
                    <XCircle size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE VIEW: Stacked Cards */}
      <div className="md:hidden space-y-4">
        {tableData.map((row, index) => (
          <div key={index} className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Item {index + 1}</span>
              <button onClick={() => deleteRow(index)} className="text-red-500 p-1">
                <Trash2 size={18} />
              </button>
            </div>
            
            <textarea
              className="w-full p-3 text-sm border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-purple-500"
              placeholder="Item Description"
              name="itemDescription"
              value={row.itemDescription}
              onChange={e => handleInputChange(index, e)}
              rows={2}
            />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Qty</label>
                <input
                  type="number"
                  name="qty"
                  value={row.qty}
                  onChange={e => handleInputChange(index, e)}
                  className="w-full p-2 border border-slate-200 rounded-lg outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Tax %</label>
                <input
                  type="number"
                  name="tax"
                  value={row.tax}
                  onChange={e => handleInputChange(index, e)}
                  className="w-full p-2 border border-slate-200 rounded-lg outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Unit Price (₦)</label>
              <input
                type="number"
                name="unitPrice"
                value={row.unitPrice}
                onChange={e => handleInputChange(index, e)}
                className="w-full p-2 border border-slate-200 rounded-lg outline-none font-semibold text-slate-800"
              />
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase">Total Amount</span>
              <span className="text-lg font-black text-purple-700">₦{formatCurrency(row.amount)}</span>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addRow}
        className="w-full md:w-auto py-3 px-6 flex items-center justify-center gap-2 text-sm text-[#7e22ce] font-bold mt-4 bg-purple-50 md:bg-transparent rounded-xl hover:bg-purple-100 transition-all"
      >
        <Plus size={18} /> Add line item
      </button>
    </div>
  );
}