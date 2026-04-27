import { useEffect, useState } from "react";
import API from "./.././../services/api"

function ManageInventory() {
  const [inventory, setInventory] = useState([]);

  const fetchInventory = async () => {
    try {
      const { data } = await API.get("/inventory");
      setInventory(data.inventory);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this inventory?")) return;

    try {
      await API.delete(`/inventory/${id}`);
      fetchInventory(); // refresh
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 bg-[#fdf6f6] min-h-screen">
      <h2 className="text-xl font-bold text-[#8B0000] mb-6">
        Manage Inventory
      </h2>

      <div className="grid grid-cols-5 bg-[#8B0000] text-white p-3 text-sm font-semibold">
        <div>Type</div>
        <div>Date</div>
        <div>Details</div>
        <div>Price</div>
        <div>Action</div> 
      </div>

      {inventory.map((item) => (
        <div
          key={item._id}
          className="grid grid-cols-5 p-3 border-b bg-white items-center"
        >
          <div>{item.serviceType}</div>

          <div>
            {item.date
              ? new Date(item.date).toLocaleDateString()
              : "-"}
          </div>

          <div>
            {item.location ||
              `${item.pickupPoint} → ${item.dropPoint}`}
          </div>

          <div>₹{item.price}</div>


          <div>
            <button
              onClick={() => handleDelete(item._id)}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {inventory.length === 0 && (
        <p className="text-center mt-6 text-gray-500">
          No inventory found
        </p>
      )}
    </div>
  );
}

export default ManageInventory;