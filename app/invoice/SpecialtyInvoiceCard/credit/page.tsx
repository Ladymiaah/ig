import BaseInvoicePage from "../BaseInvoicePage";




export default function CreditMemoPage() {
  return (
    <BaseInvoicePage 
      type="credit" 
      accentColor="#0d9488" // Teal for safe financial correction
      storageKey="credit-memo-data"
      label="Credit Memo"
    />
  );
}