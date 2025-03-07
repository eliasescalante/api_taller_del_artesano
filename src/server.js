import express from "express";
import { engine } from "express-handlebars";
import connectDB from "./config/db.js";
import businessRoutes from "./routes/business.routes.js";
import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import dotenv from "dotenv";
import fileUpload from 'express-fileupload';
import { swaggerUi, swaggerSpecs} from "./config/swaggerConfig.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a MongoDB
connectDB();

// Configurar Handlebars
app.engine("handlebars", engine({ defaultLayout: "main", layoutsDir: "./src/views/layouts" }));
app.set("view engine", "handlebars");
app.set("views", "./src/views");


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./src/public"));
//app.use(fileUpload());
// Middleware para manejar la subida de archivos
app.use(fileUpload({
    useTempFiles: true, // Usar archivos temporales
    tempFileDir: '/tmp/', // Ruta temporal para almacenar archivos
}));

// Rutas
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/businesses", businessRoutes);
app.use("/cart", cartRoutes);

// Ruta de la documentación Swagger
app.use("", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Redirigir `/` a Swagger UI
app.get("/", (req, res) => {
    res.redirect("/api-docs");
  });

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
