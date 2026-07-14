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
  OptionCard,
  InstructionsPanel,
} from "../components/ui";
import PilgrimDetailsTable from "../components/booking/PilgrimDetailsTable";
import BookingSummary from "../components/booking/BookingSummary";

function CarService() {
  const dateRef = useRef();
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slots, setSlots] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [route, setRoute] = useState("Ardhkuwari - Bhawan");
  const [date, setDate] = useState("");

  const [selectedInventoryId, setSelectedInventoryId] = useState(null);

  const [totalPilgrims, setTotalPilgrims] = useState(1);
  const [pilgrims, setPilgrims] = useState([
    { name: "", gender: "", age: "", idType: "", idNumber: "" }
  ]);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getRoutePoints = (route) => {
    if (route === "Ardhkuwari - Bhawan") {
      return {
        pickupPoint: "ardhkuwari",
        dropPoint: "bhawan"
      };
    }

    if (route === "Bhawan - Ardhkuwari") {
      return {
        pickupPoint: "bhawan",
        dropPoint: "ardhkuwari"
      };
    }
  };
  const { pickupPoint, dropPoint } = getRoutePoints(route);
  useEffect(() => {
    const fetchSlots = async () => {
      if (!date) return;
      try {
        const { data } = await API.get(
          `/inventory?type=carservice&pickupPoint=${pickupPoint}&dropPoint=${dropPoint}&date=${date}`
        );
        setSlots(data.inventory);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSlots();
  }, [route, date]);

  // BOOKING
  const handleBooking = () => {
    if (!selectedSlot) {
      setError("Please select a slot");
      return;
    }
    setError("");
    setMessage("");
    const errorMsg = validateForm();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    const capacity = selectedSlot.capacityPerUnit;
    const unitsRequired = Math.ceil(totalPilgrims / capacity);

    handlePayment({
      amount: totalPilgrims * selectedSlot.price,
      bookingData: {
        inventoryId: selectedInventoryId,
        totalPersons: totalPilgrims,
        unitsBooked: unitsRequired,
        pilgrims,
      },
      navigate
    });
  };
  const handlePilgrimChange = (index, field, value) => {
    const updated = [...pilgrims];
    updated[index][field] = value;
    setPilgrims(updated);
  };
  const validateForm = () => {
    if (!selectedInventoryId) {
      return "Please select a slot";
    }

    if (!date) {
      return "Please select a travel date";
    }

    if (totalPilgrims < 1) {
      return "At least 1 pilgrim required";
    }

    if (
      selectedSlot &&
      totalPilgrims >
      selectedSlot.capacityPerUnit * selectedSlot.availableUnits
    ) {
      return "Not enough cars available";
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

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-8">
      <InstructionsPanel
        items={[
          "Battery car booking is required for pilgrims of age 5 years and above only.",
          "Infants/Children below 5 years of age will be allowed to travel free (to be carried in lap) and equivalent to the number of Pilgrims.",
          "The details once submitted at the time of Booking will not be modified and change in Service Dates / Name change will not be entertained once the Booking is completed.",
        ]}
      />

      <PageHeader title="Battery Car Booking Details" />

      {/* FORM */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">

        <FormField label="Route" required>
          <Select value={route} onChange={(e) => setRoute(e.target.value)}>
            <option>Ardhkuwari - Bhawan</option>
            <option>Bhawan - Ardhkuwari</option>
          </Select>
        </FormField>

        <FormField label="Travel Date" required>
          <Input
            type="date"
            ref={dateRef}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            onClick={() => dateRef.current.showPicker()}
          />
        </FormField>
      </div>

      {/* SLOTS */}
      <h3 className="mb-2 text-sm font-semibold text-gray-700">Select Slot *</h3>

      <div className="mb-6 flex flex-wrap gap-4">
        {slots.length === 0 && date && (
          <Alert variant="error" className="max-w-sm">No slots available for selected date</Alert>
        )}
        {slots.map((slot) => {
          const isSelected = selectedSlot?._id === slot._id;

          const totalSeats =
            slot.availableUnits * slot.capacityPerUnit;

          return (
            <OptionCard
              key={slot._id}
              statusLabel={slot.time}
              subtitle={totalSeats === 0 ? "Full" : `${totalSeats} seats available`}
              price={`${slot.capacityPerUnit} per car`}
              selected={isSelected}
              disabled={slot.availableUnits <= 0}
              onClick={() => {
                if (slot.availableUnits > 0) {
                  setSelectedSlot(slot);
                  setSelectedInventoryId(slot._id);
                }
              }}
            />
          );
        })}
      </div>
      {/* PILGRIM DETAILS */}
      <FormField label="No. Of Pilgrims" required className="mb-6 max-w-xs">
        <Select
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
        >
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <option key={num} value={num}>
              {num} Pilgrim{num > 1 && "s"}
            </option>
          ))}
        </Select>
      </FormField>

      <PageHeader title="Pilgrim Details" className="mb-4" />

      <div className="mb-5">
        <PilgrimDetailsTable pilgrims={pilgrims} onChange={handlePilgrimChange} />
      </div>

      {/* BUTTON */}
      <div className="flex justify-end">
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
      {showSummary && selectedSlot && (
        <BookingSummary
          details={[
            { label: "Route", value: route },
            { label: "Date", value: date },
            { label: "Time", value: selectedSlot.time },
            { label: "Total Pilgrims", value: totalPilgrims },
          ]}
          pilgrims={pilgrims}
          totalAmount={totalPilgrims * selectedSlot.price}
          onConfirm={handleBooking}
        />
      )}
      {/* MESSAGE */}
      {error && <Alert variant="error" className="mt-4">{error}</Alert>}
      {message && <Alert variant="success" className="mt-4">{message}</Alert>}


    </div>
  );
}

export default CarService;
