const VARIANTS = {
  success: "bg-green-50 text-green-700 border-green-200",
  danger: "bg-red-50 text-red-700 border-red-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  neutral: "bg-gray-100 text-gray-600 border-gray-200",
  primary: "bg-primary-50 text-primary-700 border-primary-200",
};

function Badge({ variant = "neutral", className = "", children }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
