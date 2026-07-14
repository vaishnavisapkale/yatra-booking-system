function InstructionsPanel({ title = "Important Instructions", items = [] }) {
  return (
    <div className="mb-6 border-l-4 border-accent-500 bg-accent-50/40 py-3.5 pl-5 pr-4">
      <h3 className="mb-2 font-sans text-sm font-semibold uppercase tracking-wide text-primary-800">
        {title}
      </h3>
      <ul className="list-disc space-y-1 pl-5 text-sm text-gray-600">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default InstructionsPanel;
