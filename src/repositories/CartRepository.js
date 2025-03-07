import Cart from "../models/Cart.js";

class CartRepository {
    async getByUserId(userId) {
        return await Cart.findOne({ user: userId }).populate("products.product");
    }

    async create(cartData) {
        return await Cart.create(cartData);
    }

    async update(cartId, cartData) {
        return await Cart.findByIdAndUpdate(cartId, cartData, { new: true });
    }

    async delete(cartId) {
        return await Cart.findByIdAndDelete(cartId);
    }
}

export default new CartRepository();
