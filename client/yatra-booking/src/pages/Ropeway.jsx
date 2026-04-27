import { useState, useEffect } from "react";
import API from "../services/api";
import { useRef } from "react";
import { handlePayment } from "../services/paymentService";
import { useNavigate } from "react-router-dom";

function Ropeway() {
  const dateRef = useRef();
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slots, setSlots] = useState([]);

  const [route, setRoute] = useState("Bhawan - Bhairobaba");
  const [date, setDate] = useState("");

  const [selectedInventoryId, setSelectedInventoryId] = useState(null);

  const [totalPilgrims, setTotalPilgrims] = useState(1);
  const [pilgrims, setPilgrims] = useState([
    { name: "", gender: "", age: "", idType: "", idNumber: "" }
  ]);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const getRoutePoints = (route) => {
    if (route === "Bhawan - Bhairobaba") {
      return {
        pickupPoint: "bhawan",
        dropPoint: "bhairobaba"
      };
    }

    if (route === "Bhairobaba - Bhawan") {
      return {
        pickupPoint: "bhairobaba",
        dropPoint: "bhawan"
      };
    }
  };
  const { pickupPoint, dropPoint } = getRoutePoints(route);
  useEffect(() => {
    const fetchSlots = async () => {
      if (!date) return;
      try {
        const { data } = await API.get(
          `/inventory?type=ropeway&pickupPoint=${pickupPoint}&dropPoint=${dropPoint}&date=${date}`
        );
        setSlots(data.inventory);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSlots();
  }, [route, date]);

  // BOOKING
  const validateForm = () => {
    if (!selectedInventoryId) {
      return "Please select a slot";
    }
    if (p.age < 3) {
      return `Pilgrim ${i + 1}: Must be 3+ for ropeway`;
    }

    if (!date) {
      return "Please select a travel date";
    }
    if (totalPilgrims < 1) {
      return "At least 1 pilgrim required";
    }
    if (totalPilgrims > 6) {
      return "Maximum 6 pilgrims allowed";
    }
    for (let i = 0; i < pilgrims.length; i++) {
      const p = pilgrims[i];

      if (!p.name) return `Pilgrim ${i + 1}: Name required`;
      if (!p.gender) return `Pilgrim ${i + 1}: Gender required`;
      if (!p.age || p.age <= 0) return `Pilgrim ${i + 1}: Valid age required`;
      if (!p.idType) return `Pilgrim ${i + 1}: ID Type required`;
      if (!p.idNumber) return `Pilgrim ${i + 1}: ID Number required`;
    }

    return null;
  };
  const navigate = useNavigate();
  const handleBooking = () => {
    setError("");
    setMessage("");
    const errorMsg = validateForm();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    handlePayment({
      amount: totalPilgrims * selectedSlot.price, // ✅ now safe
      bookingData: {
        inventoryId: selectedInventoryId,
        totalPersons: totalPilgrims,
        unitsBooked: totalPilgrims,
        pilgrims,
      },
      navigate,
    });
  };
  const handlePilgrimChange = (index, field, value) => {
    const updated = [...pilgrims];
    updated[index][field] = value;
    setPilgrims(updated);
  };

  return (
    <div className="px-12 py-6 bg-[#fdf6f6]">
      {/* INSTRUCTIONS */}
      <div className="mb-6">
        <h3 className="font-bold mb-2">Important Instructions:</h3>
        <ul className="list-disc ml-6 text-sm space-y-1">
          <li>Ropeway Service booking is required for pilgrims of age 3 years and above only.</li>
          <li>
            Infants/Children below 3 years of age will be allowed to travel free and equivalent to the number of Pilgrims.
            Passenger(s) will be required to produce valid age proof of children at the entry gate.
          </li>
          <li>
            The details once submitted at the time of Booking will not be modified and changes to Service Date / Pilgrim Details will not be entertained once the Booking is completed.
          </li>
          <li>
            Passengers have to report as per the time slot selected, failing which the services may be denied.
            Tickets will be valid for only two hours after the check-in.
          </li>

        </ul>
      </div>
      <h2 className="text-xl font-bold text-[#8B0000] border-b pb-2 mb-4">
        Ropeway Booking Details
      </h2>

      {/* FORM */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">

        <div>
          <label>Route *</label>
          <select
            value={route}
            onChange={(e) => setRoute(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option>Bhawan - Bhairobaba</option>
            <option>Bhairobaba - Bhawan</option>
          </select>
        </div>

        <div>
          <label>Travel Date *</label>
          <input
            type="date"
            ref={dateRef}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            onClick={() => dateRef.current.showPicker()}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      {/* SLOTS */}
      <h3>Select Slot *</h3>

      <div className="flex gap-4 mb-4">
        {slots.map((slot, index) => {
          const isSelected = selectedSlot?._id === slot._id;

          return (
            <div
              key={slot._id}
              onClick={() => {
                if (slot.availableUnits > 0) {
                  setSelectedSlot(slot);
                  setSelectedInventoryId(slot._id);
                }
              }}
              className={`border rounded-lg p-4 w-40 text-center cursor-pointer ${isSelected ? "border-orange-500" : "border-gray-300"
                }`}
            >
              <div
                className={`p-2 rounded text-white ${isSelected ? "bg-orange-500" : "bg-green-500"
                  }`}
              >
                {slot.time}
              </div>

              <p className="mt-2 text-sm">
                {slot.availableUnits === 0
                  ? "Full"
                  : `Availability: ${slot.availableUnits}`}
              </p>
            </div>
          );
        })}
      </div>
      {/* PILGRIM DETAILS */}
      <div className="my-5">
        <label className="text-sm font-semibold">No. Of Pilgrims *</label>

        <select
          value={totalPilgrims}
          onChange={(e) => {
            const count = Number(e.target.value);

            setTotalPilgrims(count);

            const arr = Array.from({ length: count }, () => ({
              name: "",
              gender: "",
              age: "",
              idType: "",
              idNumber: "",
            }));

            setPilgrims(arr);
          }}
          className="w-full p-2 border rounded"
        >
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <option key={num} value={num}>
              {num} Pilgrim{num > 1 && "s"}
            </option>
          ))}
        </select>
      </div>
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
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-600">{message}</p>}

      {/* BUTTON */}
      <div className="flex justify-end mt-6">
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

export default Ropeway;