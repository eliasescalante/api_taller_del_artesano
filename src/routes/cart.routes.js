import { Router } from "express";
import { getCart, addToCart, removeFromCart, checkout } from "../controllers/cartController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Obtener el carrito del usuario autenticado
 *     description: |
 *       Recupera el carrito asociado al usuario autenticado. 
 *       El usuario debe enviar el token en el header `Authorization`.
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Carrito obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Cart"
 *       401:
 *         description: Usuario no autenticado (falta token)
 *       404:
 *         description: Carrito no encontrado para el usuario
 */

router.get("/", authMiddleware, getCart);

/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Agregar un producto al carrito
 *     description: |
 *       Agrega un producto al carrito del usuario autenticado.
 *       Si el producto ya está en el carrito, se aumenta la cantidad.
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 example: "65a2d0b2d7e6e9001567b345"
 *               quantity:
 *                 type: integer
 *                 example: 2
 *             required: ["productId", "quantity"]
 *     responses:
 *       200:
 *         description: Producto agregado correctamente al carrito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Cart"
 *       400:
 *         description: Error en la solicitud (producto no válido, cantidad incorrecta)
 *       401:
 *         description: Usuario no autenticado (falta token)
 */

router.post("/add", authMiddleware, addToCart);

/**
 * @swagger
 * /cart/remove/{productId}:
 *   delete:
 *     summary: Eliminar un producto del carrito
 *     description: |
 *       Elimina un producto específico del carrito del usuario autenticado.
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: productId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto a eliminar del carrito
 *     responses:
 *       200:
 *         description: Producto eliminado del carrito correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Cart"
 *       400:
 *         description: ID del producto no válido
 *       401:
 *         description: Usuario no autenticado (falta token)
 *       404:
 *         description: Producto o carrito no encontrado
 */

router.delete("/remove/:productId", authMiddleware, removeFromCart);

/**
 * @swagger
 * /cart/checkout:
 *   post:
 *     summary: Finalizar la compra del carrito
 *     description: |
 *       Procesa la compra del carrito del usuario autenticado, generando un ticket.
 *       Se descuenta el stock de los productos y se vacía el carrito tras la compra.
 *       Si un producto no tiene suficiente stock, se devuelve un error.
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Compra realizada con éxito y ticket generado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Ticket"
 *       400:
 *         description: Error en la compra (stock insuficiente, carrito vacío)
 *       401:
 *         description: Usuario no autenticado (falta token)
 */

router.post("/checkout", authMiddleware, checkout);

export default router;
