import { Loader2 } from "lucide-react";

function Spinner({ label, className = "" }) {
  return (
    <div className={`flex items-center gap-2 text-sm text-gray-500 ${className}`}>
      <Loader2 className="h-4 w-4 animate-spin text-primary-600" />
      {label}
    </div>
  );
}

export default Spinner;
