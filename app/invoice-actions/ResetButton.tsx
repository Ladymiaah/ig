"use client";

interface ResetButtonProps {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export default function ResetButton({ onClick, className = "", disabled = false }: ResetButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 font-semibold rounded-lg py-2 px-4 border border-red-500 text-red-500 hover:bg-red-50 disabled:opacity-50 ${className}`}
    >
      Reset
    </button>
  );
}
