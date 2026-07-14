import { useState } from "react";
import API from "./.././../services/api"
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import { Card, FormField, Select, Input, Button, Toast } from "../../components/ui";

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
    <AdminLayout title="Create Inventory" subtitle="Add rooms, ropeway or car service slots">
      <Card>
        <div className="grid gap-4 md:grid-cols-2">

          <FormField label="Service Type">
            <Select name="serviceType" value={form.serviceType} onChange={handleChange}>
              <option value="accommodation">Accommodation</option>
              <option value="carservice">Car Service</option>
              <option value="ropeway">Ropeway</option>
            </Select>
          </FormField>

          {form.serviceType === "accommodation" ? (
            <FormField label="Location">
              <Select name="location" value={form.location} onChange={handleChange}>
                <option value="">Select Location</option>
                <option value="katra">Katra</option>
                <option value="ardhkuwari">Ardhkuwari</option>
                <option value="bhawan">Bhawan</option>
              </Select>
            </FormField>
          ) : (
            <>
              {/* PICKUP */}
              <FormField label="Pickup Point">
                <Select name="pickupPoint" value={form.pickupPoint} onChange={handleChange}>
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
                </Select>
              </FormField>

              {/* DROP */}
              <FormField label="Drop Point">
                <Select name="dropPoint" value={form.dropPoint} onChange={handleChange}>
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
                </Select>
              </FormField>
            </>
          )}

          <FormField label="Date">
            <Input
              type="date"
              name="date"
              ref={dateRef}
              value={form.date}
              onChange={handleChange}
              onClick={() => dateRef.current.showPicker()}
              className="cursor-pointer"
            />
          </FormField>

          {form.serviceType !== "accommodation" && (
            <FormField label="Time / Slot">
              <Input name="time" placeholder="e.g. 10:00 AM" value={form.time} onChange={handleChange} />
            </FormField>
          )}

          <FormField label="Total Units">
            <Input name="totalUnits" placeholder="Total Units" value={form.totalUnits} onChange={handleChange} />
          </FormField>

          <FormField label="Price Per Unit">
            <Input name="price" placeholder="Price Per Unit" value={form.price} onChange={handleChange} />
          </FormField>

          <FormField label="Capacity Per Unit">
            <Input
              name="capacityPerUnit"
              placeholder="Capacity Per Unit"
              value={form.capacityPerUnit}
              onChange={handleChange}
            />
          </FormField>

        </div>
      </Card>

      <Button onClick={handleSubmit} className="mt-6">
        Create Inventory
      </Button>

      <Toast toast={toast} />
    </AdminLayout>

  );

}

export default CreateInventory;
