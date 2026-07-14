import { useEffect, useState } from "react";
import API from "./.././../services/api"
import { Boxes } from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";
import { Button, EmptyState, Table, THead, TH, TBody, TR, TD } from "../../components/ui";

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
    <AdminLayout title="Manage Inventory" subtitle="View and remove existing inventory entries">
      {inventory.length === 0 ? (
        <EmptyState icon={Boxes} title="No inventory found" />
      ) : (
        <Table>
          <THead>
            <TH>Type</TH>
            <TH>Date</TH>
            <TH>Details</TH>
            <TH>Price</TH>
            <TH>Action</TH>
          </THead>
          <TBody>
            {inventory.map((item) => (
              <TR key={item._id}>
                <TD className="capitalize">{item.serviceType}</TD>
                <TD>{item.date ? new Date(item.date).toLocaleDateString() : "-"}</TD>
                <TD className="capitalize">
                  {item.location || `${item.pickupPoint} → ${item.dropPoint}`}
                </TD>
                <TD>₹{item.price}</TD>
                <TD>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(item._id)}>
                    Delete
                  </Button>
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      )}
    </AdminLayout>
  );
}

export default ManageInventory;
