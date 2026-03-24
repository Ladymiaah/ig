import BaseInvoicePage from "../BaseInvoicePage";




export default function PastDuePage() {
  return (
    <BaseInvoicePage 
      type="past-due" 
      accentColor="#dc2626" // Red for warning/overdue
      storageKey="past-due-data"
      label="Overdue Invoice Notice"
    />
  );
}