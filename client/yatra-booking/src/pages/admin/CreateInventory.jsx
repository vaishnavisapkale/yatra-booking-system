import { useState } from "react";
import API from "./.././../services/api"
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function CreateInventory() {
  const [toast, setToast] = useState(null);
  const dateRef = useRef();
  const navigate = useNavigate();


  const [form, setForm] = useState({
    serviceType: "accommodation",
    location: "",
    pickupPoint: "",
    dropPoint: "",
    date: "",
    time: "",
    totalUnits: "",
    price: "",
    capacityPerUnit: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // reset fields when service type changes
    if (name === "serviceType") {
      setForm({
        serviceType: value,
        location: "",
        pickupPoint: "",
        dropPoint: "",
        date: "",
        time: "",
        totalUnits: "",
        price: "",
        capacityPerUnit: "",
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async () => {

  // Prevent same pickup & drop
  if (
    form.serviceType !== "accommodation" &&
    form.pickupPoint === form.dropPoint
  ) {
    setToast({
      type: "error",
      message: "Pickup and Drop cannot be same!",
    });
    return;
  }

  try {
    await API.post("/inventory", form);

    setToast({
      type: "success",
      message: "Inventory Created successfully!",
    });
   setTimeout(() => {
    setToast(null)
  navigate("/admin"); 
   },3000);
  

  } catch (err) {
    setToast({
      type: "error",
      message: err.response?.data?.message || "Error creating inventory",
    });
  }

 
};

  return (
    <div className="min-h-screen bg-[#fdf6f6] p-6">
      <h1 className="text-2xl font-bold text-[#8B0000] mb-6">
        Create Inventory
      </h1>

      <div className="bg-white p-6 rounded-xl shadow grid md:grid-cols-2 gap-4">

        <select name="serviceType" onChange={handleChange} className="p-2 border rounded">
          <option value="accommodation">Accommodation</option>
          <option value="carservice">Car Service</option>
          <option value="ropeway">Ropeway</option>
        </select>

        {form.serviceType === "accommodation" ? (
          <select
            name="location"
            value={form.location}
            onChange={handleChange}
            className="p-2 border rounded"
          >
            <option value="">Select Location</option>
            <option value="katra">Katra</option>
            <option value="ardhkuwari">Ardhkuwari</option>
            <option value="bhawan">Bhawan</option>
          </select>
        ) : (
          <>
            {/* PICKUP */}
            <select
              name="pickupPoint"
              value={form.pickupPoint}
              onChange={handleChange}
              className="p-2 border rounded"
            >
              <option value="">Select Pickup</option>

              {form.serviceType === "ropeway" && (
                <>
                  <option value="bhawan">Bhawan</option>
                  <option value="bhairobaba">Bhairobaba</option>
                </>
              )}

              {form.serviceType === "carservice" && (
                <>
                  <option value="ardhkuwari">Ardhkuwari</option>
                  <option value="bhawan">Bhawan</option>
                </>
              )}
            </select>

            {/* DROP */}
            <select
              name="dropPoint"
              value={form.dropPoint}
              onChange={handleChange}
              className="p-2 border rounded"
            >
              <option value="">Select Drop</option>

              {form.serviceType === "ropeway" && (
                <>
                  <option value="bhawan">Bhawan</option>
                  <option value="bhairobaba">Bhairobaba</option>
                </>
              )}

              {form.serviceType === "carservice" && (
                <>
                  <option value="ardhkuwari">Ardhkuwari</option>
                  <option value="bhawan">Bhawan</option>
                </>
              )}
            </select>
          </>
        )}

        <input
          type="date"
          name="date"
          ref={dateRef}
          value={form.date}
          onChange={handleChange}
          onClick={() => dateRef.current.showPicker()}
          className="p-2 border rounded w-full cursor-pointer"
        />
        {form.serviceType !== "accommodation" && (
          <input
            name="time"
            placeholder="Time / Slot"
            onChange={handleChange}
            className="p-2 border rounded"
          />
        )}
        <input name="totalUnits" placeholder="Total Units" onChange={handleChange} className="p-2 border rounded" />
        <input name="price" placeholder="Price Per Unit" onChange={handleChange} className="p-2 border rounded" />
        <input name="capacityPerUnit" placeholder="Capacity Per Unit" onChange={handleChange} className="p-2 border rounded" />

      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 px-6 py-2 bg-[#8B0000] text-white rounded"
      >
        Create Inventory
      </button>
      {toast && (
        <div
          className={`fixed top-24 left-1/2 -translate-x-1/2 px-4 py-2  rounded shadow text-white transition ${toast.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
        >
          {toast.message}
        </div>
      )}
    </div>

  );

}

export default CreateInventory;