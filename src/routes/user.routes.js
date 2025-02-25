import { Router } from "express";
import { getUsers, createUser, deleteUser, getUser, updateUser } from "../controllers/userController.js";
import { login } from "../controllers/authController.js";

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

export default router;
