import { Router } from "express";
import { getBusinesses, getBusiness, createBusiness, updateBusiness, deleteBusiness, addProductToBusiness, removeProductFromBusiness } from "../controllers/businessController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Business
 *   description: Operaciones sobre negocios
 */

/**
 * @swagger
 * /businesses:
 *   get:
 *     summary: Obtiene todos los negocios
 *     tags: [Business]
 *     responses:
 *       200:
 *         description: Lista de negocios
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
 *                     example: "Mi Negocio"
 */

router.get("/", getBusinesses);

/**
 * @swagger
 * /businesses/{id}:
 *   get:
 *     summary: Obtiene un negocio por ID
 *     tags: [Business]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del negocio
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Negocio encontrado
 *       404:
 *         description: Negocio no encontrado
 */

router.get("/:id", getBusiness);

/**
 * @swagger
 * /businesses:
 *   post:
 *     summary: Crea un nuevo negocio
 *     tags: [Business]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Mi Negocio"
 *               category:
 *                 type: string
 *                 example: "Tecnología"
 *               address:
 *                 type: string
 *                 example: "Calle 123, Ciudad"
 *     responses:
 *       201:
 *         description: Negocio creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */

router.post("/", createBusiness);

/**
 * @swagger
 * /businesses/{id}:
 *   put:
 *     summary: Actualiza un negocio por ID
 *     tags: [Business]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del negocio
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
 *                 example: "Negocio Actualizado"
 *               category:
 *                 type: string
 *                 example: "Comida"
 *               address:
 *                 type: string
 *                 example: "Avenida 456, Ciudad"
 *     responses:
 *       200:
 *         description: Negocio actualizado correctamente
 *       404:
 *         description: Negocio no encontrado
 */
router.put("/:id", updateBusiness);

/**
 * @swagger
 * /businesses/{id}:
 *   delete:
 *     summary: Elimina un negocio por ID
 *     tags: [Business]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del negocio
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Negocio eliminado correctamente
 *       404:
 *         description: Negocio no encontrado
 */

router.delete("/:id", deleteBusiness);

/**
 * @swagger
 * /businesses/{businessId}/addProduct/{productId}:
 *   put:
 *     summary: Agrega un producto a un negocio
 *     tags: [Business]
 *     parameters:
 *       - in: path
 *         name: businessId
 *         required: true
 *         description: ID del negocio
 *         schema:
 *           type: string
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto agregado al negocio correctamente
 */

// Rutas para manejar productos en un negocio
router.put("/:businessId/addProduct/:productId", addProductToBusiness);

/**
 * @swagger
 * /businesses/{businessId}/removeProduct/{productId}:
 *   put:
 *     summary: Elimina un producto de un negocio
 *     tags: [Business]
 *     parameters:
 *       - in: path
 *         name: businessId
 *         required: true
 *         description: ID del negocio
 *         schema:
 *           type: string
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado del negocio correctamente
 */
router.put("/:businessId/removeProduct/:productId", removeProductFromBusiness);

export default router;
