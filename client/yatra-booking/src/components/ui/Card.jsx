function Card({ className = "", padding = "p-6", children, ...props }) {
  return (
    <div
      className={`rounded-lg border border-gray-200 bg-surface shadow-card ${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
