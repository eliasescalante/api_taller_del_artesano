import { Router } from "express";
import { getUsers, createUser, deleteUser, getUser, updateUser } from "../controllers/userController.js";
import { login } from "../controllers/authController.js";

const router = Router();

router.get("/", getUsers);
router.get('/:id', getUser);
router.post("/", createUser);
router.delete('/:id',deleteUser);
router.put('/:id', updateUser);
router.post("/login", login);

export default router;
