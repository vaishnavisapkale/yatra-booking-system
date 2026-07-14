import { CheckCircle2, AlertCircle, Info } from "lucide-react";

const VARIANTS = {
  success: {
    wrap: "border-green-700 bg-green-50/40 text-green-800",
    Icon: CheckCircle2,
  },
  error: {
    wrap: "border-primary-600 bg-primary-50/40 text-primary-800",
    Icon: AlertCircle,
  },
  info: {
    wrap: "border-accent-500 bg-accent-50/50 text-gray-800",
    Icon: Info,
  },
};

function Alert({ variant = "info", className = "", children }) {
  const { wrap, Icon } = VARIANTS[variant];

  return (
    <div className={`flex items-start gap-2 border-l-4 px-3.5 py-2.5 text-sm ${wrap} ${className}`}>
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <div>{children}</div>
    </div>
  );
}

export default Alert;
