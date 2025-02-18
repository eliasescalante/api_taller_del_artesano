import Product from "../models/Product.js";

class ProductRepository {
    async getAll() {
        return await Product.find().populate("business");
    }

    async create(productData) {
        return await Product.create(productData);
    }

    async getById(id) {
        return await Product.findById(id).populate("business");
    }

    async update(id, productData) {
        return await Product.findByIdAndUpdate(id, { $set: { ...productData } }, { new: true });
    }

    async delete(id) {
        return await Product.findByIdAndDelete(id);
    }
}

export default new ProductRepository();
