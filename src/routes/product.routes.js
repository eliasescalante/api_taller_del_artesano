// src/routes/product.routes.js
import { Router } from "express";
import {createProduct, getProducts, getProduct, updateProduct, deleteProduct} from "../controllers/productController.js";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProduct);  // Obtener un solo producto
router.post("/", createProduct);
router.put("/:id", updateProduct);  // Actualizar producto
router.delete("/:id", deleteProduct);  // Borrar producto

export default router;
