import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: String,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    address: String
});

export default mongoose.model("Business", businessSchema);