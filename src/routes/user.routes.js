import { Router } from "express";
import { getUsers, createUser, deleteUser, getUser, updateUser, updateAvatar } from "../controllers/userController.js";
import { login } from "../controllers/authController.js";
import UserRepository from "../repositories/UserRepository.js";
//import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();
//obtener los usuarios
router.get("/", getUsers);
//obtener un ususario por id
router.get('/:id', getUser);
//crear un usuario
router.post("/", createUser);
//eliminar un usuario
router.delete('/:id',deleteUser);
//actualizar un usuario
router.put('/:id', updateUser);
//iniciar sesion
router.post("/login", login);
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
