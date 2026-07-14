import { Card, Button } from "../ui";

function BookingSummary({ details, pilgrims, totalAmount, onConfirm, confirmLabel = "Proceed to Pay" }) {
  return (
    <Card className="mt-6 border-t-4 border-t-primary-600">
      <h3 className="mb-4 text-lg font-semibold text-primary-700">Booking Summary</h3>

      <dl className="mb-4 grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm sm:grid-cols-3">
        {details.map(({ label, value }) => (
          <div key={label} className="flex gap-1.5">
            <dt className="text-gray-500">{label}:</dt>
            <dd className="font-medium text-gray-800">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full min-w-[480px] border-collapse text-left text-sm">
          <thead className="bg-primary-50/50">
            <tr>
              <th className="border-b-2 border-primary-600 px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-primary-800">Name</th>
              <th className="border-b-2 border-primary-600 px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-primary-800">Gender</th>
              <th className="border-b-2 border-primary-600 px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-primary-800">Age</th>
              <th className="border-b-2 border-primary-600 px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-primary-800">ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pilgrims.map((p, index) => (
              <tr key={index}>
                <td className="px-3 py-2 text-gray-700">{p.name}</td>
                <td className="px-3 py-2 text-gray-700">{p.gender}</td>
                <td className="px-3 py-2 text-gray-700">{p.age}</td>
                <td className="px-3 py-2 text-gray-700">{p.idNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <p className="text-lg font-semibold text-green-700">
          Total Amount: ₹{totalAmount}
        </p>
        <Button variant="success" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Card>
  );
}

export default BookingSummary;
