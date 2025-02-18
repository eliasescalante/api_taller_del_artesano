import { Router } from "express";
import userRoutes from "./user.routes.js";

const router = Router();

router.get("/", (req, res) => {
    res.render("index", { title: "DOC de la api - Taller del Artesano - ", message: "Bienvenido a nuestra API" });
});

router.use("/users", userRoutes);

export default router;
