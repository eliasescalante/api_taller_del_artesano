import { Router } from "express";
import {createProduct, getProducts, getProduct, updateProduct, deleteProduct, uploadProductImage } from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Operaciones sobre productos
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "65f3e1b9a89c2b001d3d8c4a"
 *                   name:
 *                     type: string
 *                     example: "Producto A"
 */

//obtener todos los productos
router.get("/", getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtiene un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */

// Obtener un solo producto
router.get("/:id", getProduct);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Laptop Gamer"
 *               description:
 *                 type: string
 *                 example: "Laptop con procesador i9 y 16GB RAM"
 *               price:
 *                 type: number
 *                 example: 1200.50
 *               stock:
 *                 type: number
 *                 example: 5
 *               category:
 *                 type: string
 *                 example: "Electrónica"
 *     responses:
 *       201:
 *         description: Producto creado correctamente
 *       400:
 *         description: Error en la solicitud
 */

router.post("/", createProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Actualiza un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Laptop Gamer Actualizada"
 *               description:
 *                 type: string
 *                 example: "Nueva versión con 32GB RAM"
 *               price:
 *                 type: number
 *                 example: 1400.75
 *               stock:
 *                 type: number
 *                 example: 3
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *       404:
 *         description: Producto no encontrado
 */

router.put("/:id", updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Elimina un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 *       404:
 *         description: Producto no encontrado
 */

router.delete("/:id", deleteProduct);  
/**
 * @swagger
 * /products/{id}/upload-image:
 *   post:
 *     summary: Sube una imagen para un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Imagen subida correctamente
 *       400:
 *         description: Error en la subida de imagen
 */

router.post("/:id/upload-image", uploadProductImage); // Elimina authMiddleware temporalmente

/**
 * @swagger
 * /products/{id}/image:
 *   get:
 *     summary: Obtiene la imagen de un producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: URL de la imagen obtenida correctamente
 *       404:
 *         description: Imagen no encontrada
 */

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
