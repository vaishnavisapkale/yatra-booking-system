import { CheckCircle2, AlertCircle } from "lucide-react";

function Toast({ toast }) {
  if (!toast) return null;

  const isSuccess = toast.type === "success";
  const Icon = isSuccess ? CheckCircle2 : AlertCircle;

  return (
    <div
      className={`fixed top-20 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 border-l-4 bg-surface px-4 py-2.5 text-sm font-medium shadow-popover ${
        isSuccess ? "border-green-700 text-green-800" : "border-primary-600 text-primary-800"
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {toast.message}
    </div>
  );
}

export default Toast;
