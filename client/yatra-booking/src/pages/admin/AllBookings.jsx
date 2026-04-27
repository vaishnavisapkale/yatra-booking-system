import { useEffect, useState } from "react";
import API from "./.././../services/api"

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
    <div className="p-6 bg-[#fdf6f6] min-h-screen">
      <h2 className="text-xl font-bold text-[#8B0000] mb-6">
        All Bookings
      </h2>

      <div className="grid grid-cols-6 bg-[#8B0000] text-white p-3 text-sm font-semibold">
        {/* <div>User</div> */}
        <div>Service</div>
        <div>Date</div>
        <div>Details</div>
        <div>Amount</div>
        <div>Status</div>
        <div>Persons</div>
      </div>

      {bookings.map((b) => (
        <div
          key={b._id}
          className="grid grid-cols-6 p-3 border-b bg-white items-center"
        >
          {/* <div>{b.user?.email}</div> */}

          <div>{b.inventory?.serviceType}</div>

          <div>
            {b.checkInDate
              ? new Date(b.checkInDate).toLocaleDateString()
              : b.inventory?.date
              ? new Date(b.inventory.date).toLocaleDateString()
              : "-"}
          </div>

          <div>{getRoute(b.inventory)}</div>
          <div>₹{b.totalAmount}</div>

          <div>{b.status}</div>

          <div>{b.totalPersons}</div>
        </div>
      ))}

      {bookings.length === 0 && (
        <p className="text-center mt-6 text-gray-500">
          No bookings found
        </p>
      )}
    </div>
  );
}

export default AllBookings;