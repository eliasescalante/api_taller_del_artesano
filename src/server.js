import express from "express";
import { engine } from "express-handlebars";
import connectDB from "./config/db.js";
import router from "./routes/index.js";
import dotenv from "dotenv";

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

// Rutas
app.use("/", router);

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
