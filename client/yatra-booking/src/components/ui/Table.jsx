export function Table({ className = "", children }) {
  return (
    <div className={`overflow-x-auto rounded-lg border border-gray-200 bg-surface shadow-card ${className}`}>
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">{children}</table>
    </div>
  );
}

export function THead({ children }) {
  return (
    <thead className="bg-primary-50/50">
      <tr>{children}</tr>
    </thead>
  );
}

export function TH({ className = "", children }) {
  return (
    <th className={`border-b-2 border-primary-600 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-primary-800 ${className}`}>
      {children}
    </th>
  );
}

export function TBody({ children }) {
  return <tbody className="divide-y divide-gray-100">{children}</tbody>;
}

export function TR({ className = "", children, ...props }) {
  return (
    <tr className={`transition-colors hover:bg-primary-50/30 ${className}`} {...props}>
      {children}
    </tr>
  );
}

export function TD({ className = "", children }) {
  return <td className={`px-4 py-3 align-middle text-gray-700 ${className}`}>{children}</td>;
}
