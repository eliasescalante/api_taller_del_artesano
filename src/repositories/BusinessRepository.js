import Business from "../models/Business.js";

class BusinessRepository {
    async getAll() {
        return await Business.find().populate("products");
    }

    async getById(id) {
        return await Business.findById(id).populate("products");
    }

    async create(businessData) {
        return await Business.create(businessData);
    }

    async update(id, businessData) {
        return await Business.findByIdAndUpdate(id, { $set: businessData }, { new: true }).populate("products");
    }

    async delete(id) {
        return await Business.findByIdAndDelete(id);
    }

    async addProduct(businessId, productId) {
        return await Business.findByIdAndUpdate(
            businessId,
            { $push: { products: productId } },
            { new: true }
        ).populate("products");
    }

    async removeProduct(businessId, productId) {
        return await Business.findByIdAndUpdate(
            businessId,
            { $pull: { products: productId } },
            { new: true }
        ).populate("products");
    }
}

export default new BusinessRepository();

