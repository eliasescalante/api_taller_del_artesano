import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, default: "General" },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    soldProducts: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
        soldAt: { type: Date, default: Date.now }
    }],
    address: { type: String, default: "Dirección desconocida" }
});

export default mongoose.model("Business", businessSchema);
