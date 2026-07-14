import { useNavigate } from "react-router-dom";
import { PackagePlus, ListChecks, Receipt } from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";
import { Card, Button } from "../../components/ui";

const SECTIONS = [
  {
    icon: PackagePlus,
    title: "Create Inventory",
    description: "Add rooms, ropeway or car service slots",
    action: "Create",
    path: "/admin/create-inventory",
    variant: "primary",
  },
  {
    icon: ListChecks,
    title: "Manage Inventory",
    description: "View and delete existing inventory",
    action: "Manage",
    path: "/admin/manage",
    variant: "outline",
  },
  {
    icon: Receipt,
    title: "All Bookings",
    description: "View all pilgrim bookings",
    action: "View",
    path: "/admin/bookings",
    variant: "outline",
  },
];

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <AdminLayout title="Admin Dashboard" subtitle="Manage inventory and monitor bookings">
      <div className="grid gap-6 md:grid-cols-3">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.title} className="flex flex-col">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mb-1 text-base font-semibold text-gray-900">{section.title}</h2>
              <p className="mb-4 flex-grow text-sm text-gray-500">{section.description}</p>
              <Button variant={section.variant} fullWidth onClick={() => navigate(section.path)}>
                {section.action}
              </Button>
            </Card>
          );
        })}
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
