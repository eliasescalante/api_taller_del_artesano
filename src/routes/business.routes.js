import { Router } from "express";
import { getBusinesses, getBusiness, createBusiness, updateBusiness, deleteBusiness, addProductToBusiness, removeProductFromBusiness } from "../controllers/businessController.js";

const router = Router();

router.get("/", getBusinesses);
router.get("/:id", getBusiness);
router.post("/", createBusiness);
router.put("/:id", updateBusiness);
router.delete("/:id", deleteBusiness);

// Rutas para manejar productos en un negocio
router.put("/:businessId/addProduct/:productId", addProductToBusiness);
router.put("/:businessId/removeProduct/:productId", removeProductFromBusiness);

export default router;
