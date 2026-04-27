const express = require("express")
const router = express.Router();

const inventoryController = require("../controller/inventoryController")
const authMiddleware = require("../middleware/authMiddleware")

router.post("/", authMiddleware.protect, authMiddleware.authorizedRole("admin"), inventoryController.createInventory)
router.put("/:id", authMiddleware.protect, authMiddleware.authorizedRole("admin"), inventoryController.updatedInventory)
router.delete("/:id", authMiddleware.protect, authMiddleware.authorizedRole("admin"), inventoryController.deleteInventory)
router.get("/:id", inventoryController.getInventoryByID)
router.get("/", inventoryController.getInventory)
// router.get("/", inventoryController.getInventoryByType)



module.exports = router
