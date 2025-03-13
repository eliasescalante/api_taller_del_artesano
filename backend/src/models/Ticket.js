import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true }
        }
    ],
    total: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Ticket", ticketSchema);
