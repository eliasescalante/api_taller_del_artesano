import { Router } from "express";
import { getUsers, createUser, deleteUser, getUser, updateUser, updateAvatar } from "../controllers/userController.js";
import { login } from "../controllers/authController.js";
import UserRepository from "../repositories/UserRepository.js";
//import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operaciones sobre usuarios
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 */

//obtener los usuarios
router.get("/", getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */

//obtener un ususario por id
router.get('/:id', getUser);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Juan Pérez"
 *               email:
 *                 type: string
 *                 example: "juan@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               role:
 *                 type: string
 *                 enum: ["cliente", "vendedor"]
 *                 example: "vendedor"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error en la solicitud
 */

//crear un usuario
router.post("/", createUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Elimina un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 */

//eliminar un usuario
router.delete('/:id',deleteUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualiza un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
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
 *                 example: "Juan Pérez Actualizado"
 *               email:
 *                 type: string
 *                 example: "juan_actualizado@example.com"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */

//actualizar un usuario
router.put('/:id', updateUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Inicia sesión
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "juan@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       401:
 *         description: Credenciales incorrectas
 */

//iniciar sesion
router.post("/login", login);

/**
 * @swagger
 * /users/{id}/avatar:
 *   put:
 *     summary: Actualiza el avatar de un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avatar actualizado correctamente
 *       400:
 *         description: Error en la subida del avatar
 */

// Ruta para actualizar el avatar del usuario
router.put("/:id/avatar", updateAvatar); // sin autenticacion por ahora para probar mas rapido
// RUTA para obtener el avatar de un usuario por id
router.get("/:id/avatar", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserRepository.getUser(id);
        if (!user || !user.imageUrl) {
            return res.status(404).json({ message: "Avatar not found" });
        }
        res.json({ imageUrl: user.imageUrl });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving avatar", error: error.message });
    }
});

export default router;
