import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
    name: { type: String, required: true },  // El nombre siempre será obligatorio
    category: { type: String, default: "General" }, // Se le asigna una categoría predeterminada
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    address: { type: String, default: "Dirección desconocida" } // Dirección predeterminada
});

export default mongoose.model("Business", businessSchema);
