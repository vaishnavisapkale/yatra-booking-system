import { NavLink } from "react-router-dom";
import { LayoutDashboard, PackagePlus, ListChecks, Receipt } from "lucide-react";

const TABS = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/create-inventory", label: "Create Inventory", icon: PackagePlus },
  { to: "/admin/manage", label: "Manage Inventory", icon: ListChecks },
  { to: "/admin/bookings", label: "All Bookings", icon: Receipt },
];

function AdminLayout({ title, subtitle, children }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">{title || "Admin Panel"}</h1>
        {subtitle && <p className="mt-1 text-sm italic text-gray-500">{subtitle}</p>}
      </div>

      <div className="mb-6 flex flex-wrap gap-2 border-b border-gray-200">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                `flex items-center gap-1.5 border-b-2 px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-primary-600 text-primary-700"
                    : "border-transparent text-gray-500 hover:text-primary-600"
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </NavLink>
          );
        })}
      </div>

      {children}
    </div>
  );
}

export default AdminLayout;
