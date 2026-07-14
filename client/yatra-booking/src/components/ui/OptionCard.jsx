import { CheckCircle2 } from "lucide-react";

function OptionCard({ title, statusLabel, subtitle, price, selected, disabled, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`relative w-48 shrink-0 rounded-lg border p-3.5 text-left transition-colors focus-ring disabled:cursor-not-allowed disabled:opacity-50 ${
        selected
          ? "border-primary-600 bg-primary-50/60 ring-1 ring-primary-600"
          : "border-gray-200 bg-surface hover:border-primary-300"
      }`}
    >
      {selected && (
        <CheckCircle2 className="absolute right-3 top-3 h-4 w-4 text-primary-600" />
      )}

      {title && (
        <p className="mb-2 text-center text-sm font-semibold text-gray-800">{title}</p>
      )}

      <div
        className={`rounded-md px-2 py-1.5 text-center text-sm font-medium text-white ${
          disabled ? "bg-gray-400" : selected ? "bg-primary-600" : "bg-green-700"
        }`}
      >
        {statusLabel}
      </div>

      {subtitle && <p className="mt-2 text-center text-xs text-gray-500">{subtitle}</p>}
      {price && <p className="mt-1 text-center text-sm font-medium text-gray-700">{price}</p>}
    </button>
  );
}

export default OptionCard;
