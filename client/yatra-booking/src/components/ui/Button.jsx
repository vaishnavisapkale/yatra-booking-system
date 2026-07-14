const VARIANTS = {
  primary:
    "bg-primary-600 text-white border border-primary-600 hover:bg-primary-700 hover:border-primary-700 disabled:bg-primary-300 disabled:border-primary-300",
  secondary:
    "bg-surface text-gray-700 border border-gray-300 hover:bg-gray-50 disabled:text-gray-400",
  outline:
    "bg-transparent text-primary-600 border border-primary-600 hover:bg-primary-50 disabled:text-primary-300 disabled:border-primary-200",
  success:
    "bg-green-700 text-white border border-green-700 hover:bg-green-800 disabled:bg-green-300 disabled:border-green-300",
  danger:
    "bg-red-600 text-white border border-red-600 hover:bg-red-700 disabled:bg-red-300 disabled:border-red-300",
  ghost:
    "bg-transparent text-gray-600 border border-transparent hover:bg-gray-100 disabled:text-gray-300",
};

const SIZES = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-2.5 text-sm",
};

function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  children,
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-md font-medium tracking-wide transition-colors duration-150 focus-ring disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
