import { Router } from "express";
import userRoutes from "./user.routes.js";

const router = Router();

router.get("/", (req, res) => {
    res.render("index", { title: "Documentación del Servidor", message: "Bienvenido a nuestra API" });
});

router.use("/users", userRoutes);

export default router;
