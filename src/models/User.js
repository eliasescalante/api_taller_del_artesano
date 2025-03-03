import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: { type: String, required: true },
    role: { type: String, enum: ["cliente", "vendedor"], required: true },
    cart: { type: Array, default: [] },
    business: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: function() { return this.role === "vendedor"; } },
    imageUrl : {
        type: String,
        default: ""
    }
});

// Encriptar la contraseña antes de guardar
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);
