import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, default: "General" },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    address: { type: String, default: "Dirección desconocida" }
});

export default mongoose.model("Business", businessSchema);
