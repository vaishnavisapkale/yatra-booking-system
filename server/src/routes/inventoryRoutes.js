const express = require("express")
const router = express.Router();

const inventoryController = require("../controller/inventoryController")
const authMiddleware = require("../middleware/authMiddleware")

router.post("/", authMiddleware.protect, authMiddleware.authorizedRole("admin"), inventoryController.createInventory)
router.post("/:id", authMiddleware.protect, authMiddleware.authorizedRole("admin"), inventoryController.updatedInventory)
router.delete("/:id", authMiddleware.protect, authMiddleware.authorizedRole("admin"), inventoryController.deleteInventory)



router.get("/:id", inventoryController.getInventoryByID)
// router.get("/", inventoryController.getInventoryByType)
router.get("/", inventoryController.getInventory)


module.exports = router
