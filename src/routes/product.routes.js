import { Router } from "express";
import {createProduct, getProducts, getProduct, updateProduct, deleteProduct, uploadProductImage } from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

//obtener todos los productos
router.get("/", getProducts);
// Obtener un solo producto
router.get("/:id", getProduct);
//crear un producto
router.post("/", createProduct);
// Actualizar producto
router.put("/:id", updateProduct);
// Borrar producto
router.delete("/:id", deleteProduct);  
// Ruta para subir la imagen del producto
router.post("/:id/upload-image", uploadProductImage); // Elimina authMiddleware temporalmente
// Ruta para obtener la imagen de un producto
router.get("/:id/image", async (req, res) => {
    const { id } = req.params;
    try {
        const product = await ProductRepository.getById(id);
        if (!product || !product.imageUrl) {
            return res.status(404).json({ message: "Product image not found" });
        }
        res.json({ imageUrl: product.imageUrl });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving product image", error: error.message });
    }
});

export default router;
