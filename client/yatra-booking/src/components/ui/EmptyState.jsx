function EmptyState({ icon: Icon, title = "Nothing here yet", description, className = "" }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-2 py-14 text-center ${className}`}>
      {Icon && <Icon className="h-9 w-9 text-gray-300" />}
      <p className="font-medium text-gray-600">{title}</p>
      {description && <p className="text-sm text-gray-400">{description}</p>}
    </div>
  );
}

export default EmptyState;
