import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { className = "", invalid = false, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={`w-full rounded-md border px-3 py-2 text-sm bg-surface placeholder:text-gray-400 transition-colors focus-ring disabled:bg-gray-50 disabled:text-gray-400 ${
        invalid ? "border-red-400" : "border-gray-300"
      } ${className}`}
      {...props}
    />
  );
});

export default Input;
