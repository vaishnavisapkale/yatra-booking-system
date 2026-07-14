function ResultCard({ icon: Icon, iconClassName = "", title, titleClassName = "", message, actions }) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-lg border border-gray-200 border-t-4 border-t-primary-600 bg-surface p-8 text-center shadow-card">
        {Icon && <Icon className={`mx-auto mb-4 h-12 w-12 ${iconClassName}`} />}
        <h2 className={`mb-2 text-2xl font-semibold ${titleClassName}`}>{title}</h2>
        {message && <p className="mb-6 text-sm text-gray-500">{message}</p>}
        {actions && <div className="flex justify-center gap-3">{actions}</div>}
      </div>
    </div>
  );
}

export default ResultCard;
