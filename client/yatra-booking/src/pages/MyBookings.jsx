import { useState, useEffect } from "react";
import API from "../services/api";
import { ClipboardList } from "lucide-react";
import { PageHeader, Badge, Button, EmptyState, Table, THead, TH, TBody, TR, TD } from "../components/ui";

function MyBookings() {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

   const handleCancel = async (id) => {
  const confirmCancel = window.confirm(
    "Are you sure you want to cancel this booking?"
  );

  if (!confirmCancel) return;

  try {
    await API.post(`/booking/cancel/${id}`);
    // refresh list
    fetchBookings();
  } catch (err) {
    console.log("Cancel error:", err);
  }
};
  // fetch bookings
  const fetchBookings = async () => {
    try {
      const { data } = await API.get("/booking/mybookings");

      setBooks(data.bookings);
      setLoading(false);

    } catch (err) {
      console.log("Error:", err);
      setLoading(false);
    }
  };
const getBookingDate = (b) => {
  if (b.checkInDate) {
    return new Date(b.checkInDate).toLocaleDateString();
  }

  if (b.inventory?.date) {
    return new Date(b.inventory.date).toLocaleDateString();
  }

  return "-";
};
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
  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-8">

      <PageHeader title="My Bookings" subtitle="Track and manage your yatra service bookings" />

      {loading && <p className="text-sm text-gray-500">Loading bookings...</p>}

      {!loading && books.length === 0 && (
        <EmptyState
          icon={ClipboardList}
          title="No bookings found"
          description="Your booked services will appear here."
        />
      )}

      {!loading && books.length > 0 && (
        <Table>
          <THead>
            <TH>Service</TH>
            <TH>Date</TH>
            <TH>Details</TH>
            <TH>Amount</TH>
            <TH>Status</TH>
            <TH>Action</TH>
          </THead>
          <TBody>
            {books.map((b) => (
              <TR key={b._id}>
                <TD className="capitalize">{b.inventory?.serviceType}</TD>
                <TD>{getBookingDate(b)}</TD>
                <TD>{getRoute(b.inventory)}</TD>
                <TD>₹{b.totalAmount}</TD>
                <TD>
                  <Badge variant={b.status === "booked" ? "success" : "danger"}>
                    {b.status}
                  </Badge>
                </TD>
                <TD>
                  {b.status === "booked" ? (
                    <Button variant="danger" size="sm" onClick={() => handleCancel(b._id)}>
                      Cancel
                    </Button>
                  ) : (
                    <span className="text-sm text-gray-400">-</span>
                  )}
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      )}

    </div>
  );
}

export default MyBookings;
