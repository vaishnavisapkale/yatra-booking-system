import { useState, useEffect } from "react";
import API from "../services/api";
import { useRef } from "react";
import { handlePayment } from "../services/paymentService";
import { useNavigate } from "react-router-dom";
import {
  PageHeader,
  FormField,
  Select,
  Input,
  Alert,
  Spinner,
  OptionCard,
  InstructionsPanel,
} from "../components/ui";
import PilgrimDetailsTable from "../components/booking/PilgrimDetailsTable";
import BookingSummary from "../components/booking/BookingSummary";

function Accommodation() {
const dateRef = useRef();
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedInventoryId, setSelectedInventoryId] = useState(null);
const [showSummary, setShowSummary] = useState(false);
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
  const navigate = useNavigate();
  //  BOOKING API
  const handleBooking = () => {
    setError("");
  setMessage("");

  const errorMsg = validateForm();

  if (errorMsg) {
    setError(errorMsg);
    return;
  }

  const selectedRoomData = rooms[selectedRoom];
  const totalAmount =
    unitsBooked * selectedRoomData.price * numberOfDays;
  handlePayment({
    amount: totalAmount,
    bookingData: {
      inventoryId: selectedInventoryId,
      unitsBooked,
      totalPersons,
      checkInDate,
      numberOfDays,
      pilgrims,
    },
    navigate,
    onSuccess: () => {
      setMessage("Booking Successful ✅");
    },
    onError: (msg) => {
      setError(msg);
    },
  });
};
const validateForm = () => {
  if (selectedRoom === null) {
    return "Please select a room";
  }

  if (!checkInDate) {
    return "Please select check-in date";
  }

  if (unitsBooked < 1) {
    return "At least 1 room required";
  }

  if (unitsBooked > 2) {
    return "Maximum 2 rooms allowed";
  }

  const room = rooms[selectedRoom];

  if (unitsBooked > room.availableUnits) {
    return "Not enough rooms available";
  }

  if (totalPersons < 1) {
    return "At least 1 pilgrim required";
  }

  if (totalPersons > unitsBooked * room.capacityPerUnit) {
    return "Room capacity exceeded";
  }

  for (let i = 0; i < pilgrims.length; i++) {
    const p = pilgrims[i];

    if (!p.name) return `Pilgrim ${i + 1}: Name required`;
    if (!p.gender) return `Pilgrim ${i + 1}: Gender required`;
    if (!p.age || p.age <= 0)
      return `Pilgrim ${i + 1}: Valid age required`;
    if (!p.idType) return `Pilgrim ${i + 1}: ID Type required`;
    if (!p.idNumber) return `Pilgrim ${i + 1}: ID Number required`;
  }

  return null;
};


  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-8">

      <InstructionsPanel
        items={[
          "Rooms will not be allotted for Single Persons.",
          "Maximum booking allowed for one day only.",
          "You can only book 2 rooms per user.",
          "Details once submitted cannot be modified.",
        ]}
      />

      <PageHeader title="Accommodation Booking Details" />

      {/* FORM */}
      <div className="mb-4 grid gap-4 md:grid-cols-3">

        <FormField label="Location" required>
          <Select value={location} onChange={(e) => setLocation(e.target.value)}>
            <option>katra</option>
            <option>ardhkuwari</option>
            <option>bhawan</option>
          </Select>
        </FormField>

        <FormField label="Number of Days" required>
          <Select
            value={numberOfDays}
            onChange={(e) => setNumberOfDays(Number(e.target.value))}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
          </Select>
        </FormField>

        <FormField label="Check-In Date" required>
          <Input
            type="date"
            ref={dateRef}
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            onClick={() => dateRef.current.showPicker()}
          />
        </FormField>

      </div>

      <p className="mb-5 text-sm font-medium text-primary-700">
        Check-in: 10:00 AM &nbsp;/&nbsp; Check-out: 10:00 AM
      </p>

      {/* AVAILABILITY */}
      <h3 className="mb-2 text-sm font-semibold text-gray-700">Availability *</h3>

      {loading && <Spinner label="Loading rooms..." className="mb-4" />}

      {!loading && rooms.length === 0 && checkInDate && (
        <Alert variant="error" className="mb-4 max-w-sm">No rooms available</Alert>
      )}

      <div className="mb-6 flex flex-wrap gap-4">
        {rooms.map((room, index) => {
          const isSelected = selectedRoom === index;

          return (
            <OptionCard
              key={room._id}
              title={room.meta?.hotelName}
              statusLabel={room.meta?.roomType}
              subtitle={`Available: ${room.availableUnits}`}
              price={`Rent: ₹${room.price}`}
              selected={isSelected}
              onClick={() => {
                setSelectedRoom(index);
                setSelectedInventoryId(room._id);
              }}
            />
          );
        })}
      </div>

      {/* ROOM + PILGRIMS */}
      <div className="mb-6 grid gap-4 md:grid-cols-2">

        <FormField label="No. Of Rooms" required>
          <Select
            value={unitsBooked}
            onChange={(e) => setUnitsBooked(Number(e.target.value))}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
          </Select>
        </FormField>

        <FormField label="No. Of Pilgrims" required>
          <Input value={totalPersons} disabled />
        </FormField>

      </div>

      {/* PILGRIM DETAILS */}
      <PageHeader title="Pilgrim Details" className="mb-4" />

      <PilgrimDetailsTable pilgrims={pilgrims} onChange={handlePilgrimChange} />

       {/* MESSAGE */}
      {error && <Alert variant="error" className="mt-4">{error}</Alert>}
      {message && <Alert variant="success" className="mt-4">{message}</Alert>}

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => {
            const errorMsg = validateForm();
            if (errorMsg) {
              setError(errorMsg);
              return;
            }

            setError("");
            setShowSummary(true);
          }}
          className="rounded-md bg-primary-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 focus-ring"
        >
          Submit
        </button>
      </div>

  {showSummary && selectedRoom !== null && (
    <BookingSummary
      details={[
        { label: "Location", value: location },
        { label: "Check-in", value: checkInDate },
        { label: "Days", value: numberOfDays },
        { label: "Rooms", value: unitsBooked },
        { label: "Total Pilgrims", value: totalPersons },
      ]}
      pilgrims={pilgrims}
      totalAmount={unitsBooked * rooms[selectedRoom].price * numberOfDays}
      onConfirm={handleBooking}
    />
  )}

    </div>
  );
}

export default Accommodation;
