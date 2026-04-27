import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fdf6f6] p-6">
      <h1 className="text-2xl font-bold text-[#8B0000] mb-6">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {/* CREATE INVENTORY */}
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="font-semibold text-lg mb-2">
            Create Inventory
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Add rooms, ropeway or car service slots
          </p>

          <button
            onClick={() => navigate("/admin/create-inventory")}
            className="w-full py-2 bg-[#8B0000] text-white rounded"
          >
            Create
          </button>
        </div>

        {/* MANAGE INVENTORY */}
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="font-semibold text-lg mb-2">
            Manage Inventory
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            View and delete inventory
          </p>

          <button onClick={()=>{navigate("/admin/manage")}}
          className="w-full py-2 border border-[#8B0000] text-[#8B0000] rounded">
            Manage
          </button>
        </div>

        {/* BOOKINGS */}
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="font-semibold text-lg mb-2">
            All Bookings
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            View all user bookings
          </p>

          <button onClick={()=> navigate("/admin/bookings")} className="w-full py-2 border border-[#8B0000] text-[#8B0000] rounded">
            View
          </button>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;