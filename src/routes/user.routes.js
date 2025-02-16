import { Router } from "express";
import { getUsers, createUser, deleteUser, getUser, updateUser } from "../controllers/userController.js";

const router = Router();

router.get("/", getUsers);
router.get('/:id', getUser);
router.post("/", createUser);
router.delete('/:id',deleteUser);
router.put('/:id', updateUser);

export default router;
