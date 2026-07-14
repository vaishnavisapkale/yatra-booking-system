import { Car, CableCar, Hotel, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SERVICES = [
  {
    icon: Hotel,
    title: "Accommodation",
    description: "Book rooms at Katra, Ardhkuwari or Bhawan for your stay.",
    path: "/accommodation",
  },
  {
    icon: Car,
    title: "Car Service",
    description: "Reserve a battery car slot for a comfortable, timed journey.",
    path: "/car-service",
  },
  {
    icon: CableCar,
    title: "Ropeway",
    description: "Book Bhawan to Bhairobaba ropeway tickets in advance.",
    path: "/ropeway",
  },
];

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-8">
      <div className="mb-10 text-center">
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-accent-600">Yatra Services</p>
        <h2 className="text-4xl font-semibold text-gray-900">Plan Your Yatra</h2>
        <p className="mt-2 text-sm italic text-gray-500">
          A sacred journey, simply booked.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <button
              key={service.title}
              onClick={() => navigate(service.path)}
              className="group flex flex-col items-start rounded-lg border border-gray-200 bg-surface p-6 text-left shadow-card transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-card-hover focus-ring"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
              <p className="mt-1.5 text-sm text-gray-500">{service.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-600">
                Book now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;
