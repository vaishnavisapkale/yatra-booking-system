const inventoryModel = require("../models/inventory")

const getSlotFromTime = (time) => {
  const hour = parseInt(time.split(":")[0]);

  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
};

async function createInventory(req, res) {
  try {
    const {
      serviceType,
      location,
      pickupPoint,
      dropPoint,
      date,
      time,
      totalUnits,
      price,
      capacityPerUnit,
      meta
    } = req.body;

    let inventoryData = {
      serviceType,
      date,
      time,
      slot: time ? getSlotFromTime(time) : null, // 🔥 auto slot
      totalUnits,
      availableUnits: totalUnits,
      price,
      capacityPerUnit,
      meta
    };

    if (serviceType === "accommodation") {
      inventoryData.location = location?.toLowerCase();
    } else {
      inventoryData.pickupPoint = pickupPoint?.toLowerCase();
      inventoryData.dropPoint = dropPoint?.toLowerCase();
    }

    const inventory = await inventoryModel.create(inventoryData);

    return res.status(201).json({
      message: "Inventory created successfully",
      inventory
    });

  } catch (err) {
    res.status(500).json({
      message: "Error creating inventory",
      error: err.message
    });
  }
}

    //Get Inventory (User)
const getInventory = async (req, res) => {
  try {
    const { type, location, pickupPoint, dropPoint, date } = req.query;

    let filter = {};

    //  service type
    if (type) {
      filter.serviceType = type;
    }

    //  CONDITION BASED FILTER
    if (type === "accommodation") {
      if (location) {
        filter.location = location.toLowerCase();
      }
    } else {
      // carservice / ropeway
    if (pickupPoint && dropPoint) {
    filter.pickupPoint = pickupPoint.toLowerCase().trim();
    filter.dropPoint = dropPoint.toLowerCase().trim();
  }

    //   if (pickupPoint) {
    //     filter.pickupPoint = pickupPoint.toLowerCase();
    //   }
    //   if (dropPoint) {
    //     filter.dropPoint = dropPoint.toLowerCase();
    //   }
    }

    //  DATE FILTER
    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);

      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      filter.date = {
        $gte: start,
        $lte: end
      };
    }

    console.log("FINAL FILTER:", filter);

    const inventory = await inventoryModel.find(filter);

    res.json({
      count: inventory.length,
      inventory
    });

  } catch (err) {
    res.status(500).json({
      message: "Error fetching inventory",
      error: err.message
    });
  }
};

    //get single inventory
    async function getInventoryByID(req, res) {
        try {
            const inventory = await inventoryModel.findById(req.params.id);
            if (!inventory) {
                return res.status(404).json({
                    message: "Inventory not found"
                });
            }
            res.json(inventory);
        } catch (err) {
            res.status(500).json({
                message: "Error fetching inventory",
                error: err.message
            });
        }
    }

    //get inventory by type
    async function getInventoryByType(req, res) {
  try {
    const { type } = req.query;

    let filter = {};

    // 🔥 agar type aaya hai to filter lagao
    if (type) {
      filter.serviceType = type;
    }

    const inventory = await inventoryModel
      .find(filter)
      .sort({ date: 1 });

    return res.status(200).json({
      count: inventory.length,
      inventory
    });

  } catch (err) {
    return res.status(500).json({
      message: "Error fetching inventory",
      error: err.message
    });
  }

}

    //update inventory
    async function updatedInventory(req, res) {
        try {
            const updatedInventory = await inventoryModel.findByIdAndUpdate(
                req.params.id, req.body, { new: true }
            )
            res.json({
                message: "Inventory updated successfully",
                updatedInventory
            });
        } catch (err) {
            res.status(500).json({
                message: "Error updating inventory",
                error: err.message
            });

        }
    }

    async function deleteInventory(req, res){
        try{
            const deleteInventory = await inventoryModel.findByIdAndDelete(req.params.id)
            res.json({
                message:"Inventory deleted successfully"
            })
        }catch(err){
            res.status(500).json({
      message: "Error deleting inventory",
      error: error.message
    });

        }
    }


module.exports = {createInventory, getInventory, getInventoryByID,getInventoryByType, updatedInventory, deleteInventory}