import { Input, Select } from "../ui";

function PilgrimDetailsTable({ pilgrims, onChange }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-surface shadow-card">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <thead className="bg-primary-50/50">
          <tr>
            <th className="w-14 border-b-2 border-primary-600 px-3 py-3 text-xs font-semibold uppercase tracking-wider text-primary-800">
              S.No
            </th>
            <th className="border-b-2 border-primary-600 px-3 py-3 text-xs font-semibold uppercase tracking-wider text-primary-800">
              Pilgrim Name *
            </th>
            <th className="border-b-2 border-primary-600 px-3 py-3 text-xs font-semibold uppercase tracking-wider text-primary-800">
              Gender *
            </th>
            <th className="w-20 border-b-2 border-primary-600 px-3 py-3 text-xs font-semibold uppercase tracking-wider text-primary-800">
              Age *
            </th>
            <th className="border-b-2 border-primary-600 px-3 py-3 text-xs font-semibold uppercase tracking-wider text-primary-800">
              ID Type *
            </th>
            <th className="border-b-2 border-primary-600 px-3 py-3 text-xs font-semibold uppercase tracking-wider text-primary-800">
              ID Proof Number *
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {pilgrims.map((p, index) => (
            <tr key={index}>
              <td className="px-3 py-2.5 text-gray-500">{index + 1}</td>
              <td className="px-3 py-2.5">
                <Input
                  value={p.name}
                  onChange={(e) => onChange(index, "name", e.target.value)}
                  placeholder="Full name"
                />
              </td>
              <td className="px-3 py-2.5">
                <Select
                  value={p.gender}
                  onChange={(e) => onChange(index, "gender", e.target.value)}
                >
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                </Select>
              </td>
              <td className="px-3 py-2.5">
                <Input
                  value={p.age}
                  onChange={(e) => onChange(index, "age", e.target.value)}
                />
              </td>
              <td className="px-3 py-2.5">
                <Select
                  value={p.idType}
                  onChange={(e) => onChange(index, "idType", e.target.value)}
                >
                  <option value="">Select</option>
                  <option>Aadhar Card</option>
                  <option>PAN Card</option>
                </Select>
              </td>
              <td className="px-3 py-2.5">
                <Input
                  value={p.idNumber}
                  onChange={(e) => onChange(index, "idNumber", e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PilgrimDetailsTable;
