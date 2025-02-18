// src/controllers/productController.js
import ProductRepository from "../repositories/ProductRepository.js";

export const createProduct = async (req, res) => {
    try {
        const product = await ProductRepository.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error: error.message });
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await ProductRepository.getAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving products", error: error.message });
    }
};

export const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await ProductRepository.getById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving product", error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await ProductRepository.update(id, req.body);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await ProductRepository.delete(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
};
