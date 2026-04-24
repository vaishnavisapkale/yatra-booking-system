import { useState, useEffect } from "react";
import API from "../services/api";
import { useRef } from "react";



function Accommodation() {
const dateRef = useRef();
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedInventoryId, setSelectedInventoryId] = useState(null);

  const [location, setLocation] = useState("Katra");
  const [numberOfDays, setNumberOfDays] = useState(1);
  const [checkInDate, setCheckInDate] = useState("");

  const [unitsBooked, setUnitsBooked] = useState(1);
  const [totalPersons, setTotalPersons] = useState(2);

  const [pilgrims, setPilgrims] = useState([]);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  //  FETCH ROOMS (location + date based)
  useEffect(() => {
    const fetchRooms = async () => {
      if (!checkInDate) return;

      setLoading(true);
      try {
        const { data } = await API.get(
          `/inventory?type=accommodation&location=${location}&date=${checkInDate}`
        );

        setRooms(data.inventory);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [location, checkInDate]);

  //  AUTO PERSONS
  useEffect(() => {
    setTotalPersons(unitsBooked * 2);
  }, [unitsBooked]);

  //  GENERATE PILGRIMS
  useEffect(() => {
    const arr = Array.from({ length: totalPersons }, () => ({
      name: "",
      gender: "",
      age: "",
      idType: "",
      idNumber: ""
    }));
    setPilgrims(arr);
  }, [totalPersons]);

  //  HANDLE PILGRIM INPUT
  const handlePilgrimChange = (index, field, value) => {
    const updated = [...pilgrims];
    updated[index][field] = value;
    setPilgrims(updated);
  };

  //  BOOKING API
  const handleBooking = async () => {
    setError("");
    setMessage("");

    if (!selectedInventoryId) {
      setError("Please select a room");
      return;
    }

    try {
      await API.post("/booking/book", {
        inventoryId: selectedInventoryId,
        unitsBooked,
        totalPersons,
        checkInDate,
        numberOfDays,
        pilgrims
      });

      setMessage("Booking successful");

      // clear form
      setSelectedRoom(null);
      setSelectedInventoryId(null);
      setPilgrims([]);
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed ");
    }
  };

  return (
    <div className="min-h-full bg-[#fdf6f6] px-12 py-6">

      {/* INSTRUCTIONS */}
      <div className="mb-6">
        <h3 className="font-bold mb-2">Important Instructions:</h3>
        <ul className="list-disc ml-6 text-sm space-y-1">
          <li>Rooms will not be allotted for Single Persons.</li>
          <li>Maximum booking allowed for 2 days only.</li>
          <li>Details once submitted cannot be modified.</li>
        </ul>
      </div>

      {/* TITLE */}
      <h2 className="text-xl font-bold text-[#8B0000] border-b pb-2 mb-4">
        Accommodation Booking Details
      </h2>

      {/* FORM */}
      <div className="grid md:grid-cols-3 gap-4 mb-4">

        {/* LOCATION */}
        <div>
          <label className="text-sm font-semibold">Location *</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option>katra</option>
            <option>ardhkuwari</option>
            <option>bhawan</option>
          </select>
        </div>

        {/* DAYS */}
        <div>
          <label className="text-sm font-semibold">Number of Days *</label>
          <select
            value={numberOfDays}
            onChange={(e) => setNumberOfDays(Number(e.target.value))}
            className="w-full p-2 border rounded"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
        </div>

        {/* CHECK-IN */}
        <div>
          <label className="text-sm font-semibold">Check-In Date *</label>
          <input
            type="date"
            ref={dateRef}
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            onClick={() => dateRef.current.showPicker()}
            className="w-full p-2 border rounded"
          />
        </div>

      </div>

      <div className="text-sm text-red-600 mb-4">
        Check-in: 10:00 AM / Check-out: 10:00 AM
      </div>

      {/* AVAILABILITY */}
      <h3 className="font-semibold mb-2">Availability *</h3>

      {loading && <p className="text-sm">Loading rooms...</p>}

      {!loading && rooms.length === 0 && checkInDate && (
        <p className="text-red-500 text-sm">No rooms available</p>
      )}

      <div className="flex gap-4 mb-6">
        {rooms.map((room, index) => {
          const isSelected = selectedRoom === index;

          return (
            <div
              key={room._id}
              onClick={() => {
                setSelectedRoom(index);
                setSelectedInventoryId(room._id);
              }}
              className={`border rounded-lg p-4 w-52 cursor-pointer ${isSelected ? "border-orange-500" : "border-gray-300"
                }`}
            >
              <h4 className="text-center font-semibold mb-2">
                {room.meta?.hotelName}
              </h4>

              {/* 🔄 SWAPPED */}
              <div
                className={`p-2 rounded text-center text-white ${isSelected ? "bg-orange-500" : "bg-green-500"
                  }`}
              >
                <p>{room.meta?.roomType}</p>
                <p>Available: {room.availableUnits}</p>
              </div>

              <p className="text-center mt-2 text-sm">
                Rent: ₹{room.price}
              </p>
            </div>
          );
        })}
      </div>

      {/* ROOM + PILGRIMS */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">

        <div>
          <label className="text-sm font-semibold">No. Of Rooms *</label>
          <select
            value={unitsBooked}
            onChange={(e) => setUnitsBooked(Number(e.target.value))}
            className="w-full p-2 border rounded"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold">No. Of Pilgrims *</label>
          <input
            value={totalPersons}
            disabled
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

      </div>

      {/* PILGRIM DETAILS */}
      <h3 className="text-[#8B0000] font-bold border-b pb-2 mb-4">
        Pilgrim Details
      </h3>

      <div className="border">

        <div className="grid grid-cols-7 bg-[#8B0000] text-white text-sm font-semibold p-2">
          <div>S.No.</div>
          <div className="col-span-2">Pilgrim Name *</div>
          <div>Gender *</div>
          <div>Age *</div>
          <div>ID Type *</div>
          <div>ID Proof Number *</div>
        </div>

        {pilgrims.map((p, index) => (
          <div key={index} className="grid grid-cols-7 p-2 border-t gap-2">

            <div>{index + 1}</div>

            <input
              className="col-span-2 border p-2"
              value={p.name}
              onChange={(e) =>
                handlePilgrimChange(index, "name", e.target.value)
              }
            />

            <select
              value={p.gender}
              onChange={(e) =>
                handlePilgrimChange(index, "gender", e.target.value)
              }
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
            </select>

            <input
              value={p.age}
              onChange={(e) =>
                handlePilgrimChange(index, "age", e.target.value)
              }
            />

            <select
              value={p.idType}
              onChange={(e) =>
                handlePilgrimChange(index, "idType", e.target.value)
              }
            >
              <option value="">Select</option>
              <option>Aadhar Card</option>
              <option>PAN Card</option>
            </select>

            <input
              value={p.idNumber}
              onChange={(e) =>
                handlePilgrimChange(index, "idNumber", e.target.value)
              }
            />

          </div>
        ))}

      </div>

      {/* MESSAGE */}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {message && <p className="text-green-600 mt-2">{message}</p>}

      {/* BUTTON */}
      <div className="flex justify-end gap-4 mt-6">
        <button className="px-4 py-2 bg-gray-300 rounded">
          Clear
        </button>
        <button
          onClick={handleBooking}
          className="px-6 py-2 bg-[#8B0000] text-white rounded"
        >
          Submit
        </button>
      </div>

    </div>
  );
}

export default Accommodation;