import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: { type: String, required: true },
    role: { type: String, enum: ["cliente", "vendedor"], required: true },
    cart: { type: Array, default: [] },
    business: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: function() { return this.role === "vendedor"; } }
});

export default mongoose.model("User", userSchema);
