import CartRepository from "../repositories/CartRepository.js";
import ProductRepository from "../repositories/ProductRepository.js";
import TicketRepository from "../repositories/TicketRepository.js";
import BusinessRepository from "../repositories/BusinessRepository.js";

export const getCart = async (req, res) => {
    try {
        const cart = await CartRepository.getByUserId(req.userId);
        if (!cart) return res.status(404).json({ message: "Cart not found" });
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving cart", error: error.message });
    }
};

export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        let cart = await CartRepository.getByUserId(req.userId);
        if (!cart) {
            cart = await CartRepository.create({ user: req.userId, products: [] });
        }

        const product = await ProductRepository.getById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        cart.products.push({ product: productId, quantity });
        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error adding to cart", error: error.message });
    }
};

export const removeFromCart = async (req, res) => {
    const { productId } = req.params;
    try {
        const cart = await CartRepository.getByUserId(req.userId);
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.products = cart.products.filter(p => p.product.toString() !== productId);
        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error removing from cart", error: error.message });
    }
};

export const checkout = async (req, res) => {
    try {
        const cart = await CartRepository.getByUserId(req.userId);
        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }
        let total = 0;
        for (const item of cart.products) {
            const product = await ProductRepository.getById(item.product);
            if (!product || product.stock < item.quantity) {
                return res.status(400).json({ message: `Not enough stock for ${product?.name || "a product"}` });
            }
            product.stock -= item.quantity;
            await product.save();

            // Agregar el producto vendido al negocio correspondiente
            if (product.business) {
                await BusinessRepository.addSoldProduct(product.business, {
                    product: product._id,
                    quantity: item.quantity
                });
            }

            total += product.price * item.quantity;
        }

        const ticket = await TicketRepository.create({
            user: req.userId,
            items: cart.products,
            total
        });
        await CartRepository.delete(cart._id);
        res.json({ message: "Purchase successful", ticket });
    } catch (error) {
        res.status(500).json({ message: "Error during checkout", error: error.message });
    }
};

/*
export const checkout = async (req, res) => {
    try {
        const cart = await CartRepository.getByUserId(req.userId);
        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        let total = 0;
        for (const item of cart.products) {
            const product = await ProductRepository.getById(item.product);
            if (!product || product.stock < item.quantity) {
                return res.status(400).json({ message: `Not enough stock for ${product?.name || "a product"}` });
            }
            product.stock -= item.quantity;
            await product.save();
            total += product.price * item.quantity;
        }

        const ticket = await TicketRepository.create({
            user: req.userId,
            items: cart.products,
            total
        });

        await CartRepository.delete(cart._id);

        res.json({ message: "Purchase successful", ticket });
    } catch (error) {
        res.status(500).json({ message: "Error during checkout", error: error.message });
    }
};*/
