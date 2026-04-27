import { useState, useEffect } from "react";
import API from "../services/api";

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
    <div className="max-w-7xl mx-auto px-6 py-6 bg-[#fdf6f6]">

      {/* TITLE */}
      <h2 className="text-xl font-bold text-[#8B0000] border-b pb-2 mb-6">
        My Bookings
      </h2>

      {/* TABLE HEADER */}
      <div className="grid grid-cols-[1fr_1fr_2fr_1fr_1fr_1fr] bg-[#8B0000] text-white p-3 text-sm font-semibold">
        <div>Service</div>
        <div>Date</div>
        <div>Details</div>
        <div>Amount</div>
        <div>Status</div>
        <div>Action</div>
      </div>

      {/* BOOKINGS */}
     {books.map((b) => (
  <div
    key={b._id}
    className="grid grid-cols-[1fr_1fr_2fr_1fr_1fr_1fr] p-3 border-b items-center bg-white"
  >
    <div>{b.inventory?.serviceType}</div>

  <div>{getBookingDate(b)}</div>
  <div>{getRoute(b.inventory)}</div>
  <div>₹{b.totalAmount}</div>

    {/* STATUS */}
    <div>
      <span
        className={`px-2 py-1 text-xs rounded ${
          b.status === "booked"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-600"
        }`}
      >
        {b.status}
      </span>
    </div>

    {/* ACTION */}
    <div>
      {b.status === "booked" ? (
        <button
          onClick={() => handleCancel(b._id)} // 🔥 id change
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        >
          Cancel
        </button>
      ) : (
        <span className="text-gray-400 text-sm">-</span>
      )}
    </div>
  </div>
))}

      {/* EMPTY STATE */}
      {books.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No bookings found
        </div>
      )}

    </div>
  );
}

export default MyBookings;