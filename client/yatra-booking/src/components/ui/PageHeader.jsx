function PageHeader({ title, subtitle, actions, className = "" }) {
  return (
    <div className={`mb-6 flex flex-wrap items-end justify-between gap-3 border-b-2 border-primary-600 pb-4 ${className}`}>
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        {subtitle && <p className="mt-1 text-sm italic text-gray-500">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export default PageHeader;
