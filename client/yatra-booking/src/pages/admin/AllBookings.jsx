import { useEffect, useState } from "react";
import API from "./.././../services/api"
import { Receipt } from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";
import { Badge, EmptyState, Table, THead, TH, TBody, TR, TD } from "../../components/ui";

function AllBookings() {
  const [bookings, setBookings] = useState([]);
const getRoute = (inventory) => {
  // accommodation case
  if (inventory?.location) {
    return inventory.location;
  }
  // carservice / ropeway case
  if (inventory?.pickupPoint && inventory?.dropPoint) {
    return `${inventory.time} ${inventory.pickupPoint} → ${inventory.dropPoint}`;
  }
  return "-";
};
  const fetchBookings = async () => {
    try {
      const { data } = await API.get("/booking/getAll"); // admin API
      setBookings(data.bookings);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <AdminLayout title="All Bookings" subtitle="View every pilgrim booking across services">
      {bookings.length === 0 ? (
        <EmptyState icon={Receipt} title="No bookings found" />
      ) : (
        <Table>
          <THead>
            <TH>Service</TH>
            <TH>Date</TH>
            <TH>Details</TH>
            <TH>Amount</TH>
            <TH>Status</TH>
            <TH>Persons</TH>
          </THead>
          <TBody>
            {bookings.map((b) => (
              <TR key={b._id}>
                <TD className="capitalize">{b.inventory?.serviceType}</TD>
                <TD>
                  {b.checkInDate
                    ? new Date(b.checkInDate).toLocaleDateString()
                    : b.inventory?.date
                    ? new Date(b.inventory.date).toLocaleDateString()
                    : "-"}
                </TD>
                <TD>{getRoute(b.inventory)}</TD>
                <TD>₹{b.totalAmount}</TD>
                <TD>
                  <Badge variant={b.status === "booked" ? "success" : "danger"}>
                    {b.status}
                  </Badge>
                </TD>
                <TD>{b.totalPersons}</TD>
              </TR>
            ))}
          </TBody>
        </Table>
      )}
    </AdminLayout>
  );
}

export default AllBookings;
