import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category : { type: String, required: true},
    country : {type: String, required: true},
    state : {type: String, required: true},
    imageUrl: {
        type: String,
        default : "",
    },
    business: { type: mongoose.Schema.Types.ObjectId, ref: "Business" }
});

export default mongoose.model("Product", productSchema);