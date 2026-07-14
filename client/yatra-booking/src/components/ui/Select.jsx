import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";

const Select = forwardRef(function Select(
  { className = "", children, ...props },
  ref
) {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={`w-full appearance-none rounded-md border border-gray-300 bg-surface px-3 py-2 pr-9 text-sm transition-colors focus-ring disabled:bg-gray-50 disabled:text-gray-400 ${className}`}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
    </div>
  );
});

export default Select;
