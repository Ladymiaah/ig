import BaseInvoicePage from "../BaseInvoicePage";



export default function ProgressInvoicePage() {
  return (
    <BaseInvoicePage 
      type="progress" 
      accentColor="#3b82f6" // Blue for project growth
      storageKey="progress-invoice-data"
      label="Progress Billing"
    />
  );
}