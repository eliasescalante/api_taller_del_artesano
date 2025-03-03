import ProductRepository from "../repositories/ProductRepository.js";
import cloudinary from "../config/cloudinary.js";

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

export const uploadProductImage = async (req, res) => {
    const { id } = req.params;
    if (!req.files || !req.files.image) {
        return res.status(400).json({ message: "No product image uploaded" });
    }

    try {
        // Subir la imagen a Cloudinary
        const result = await cloudinary.v2.uploader.upload(req.files.image.tempFilePath, {
            folder: "products", // Puedes cambiar el folder si lo deseas
        });

        // Actualizar el producto con la URL de la imagen
        const updatedProduct = await ProductRepository.update(id, {
            imageUrl: result.secure_url,
        });

        res.json({ message: "Product image uploaded successfully", updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error uploading product image", error: error.message });
    }
};