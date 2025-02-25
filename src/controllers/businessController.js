import mongoose from "mongoose";
import BusinessRepository from "../repositories/BusinessRepository.js";

export const getBusinesses = async (req, res) => {
    try {
        const businesses = await BusinessRepository.getAll();
        res.json(businesses);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving businesses", error: error.message });
    }
};

export const getBusiness = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }
    try {
        const business = await BusinessRepository.getById(id);
        if (!business) return res.status(404).json({ message: "Business not found" });
        res.json(business);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving business", error: error.message });
    }
};

export const createBusiness = async (req, res) => {
    try {
        const business = await BusinessRepository.create(req.body);
        res.status(201).json(business);
    } catch (error) {
        res.status(500).json({ message: "Error creating business", error: error.message });
    }
};

export const updateBusiness = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }
    try {
        const business = await BusinessRepository.update(id, req.body);
        if (!business) return res.status(404).json({ message: "Business not found" });
        res.json(business);
    } catch (error) {
        res.status(500).json({ message: "Error updating business", error: error.message });
    }
};

export const deleteBusiness = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }
    try {
        await BusinessRepository.delete(id);
        res.json({ message: "Business deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting business", error: error.message });
    }
};

// Agregar producto al negocio
export const addProductToBusiness = async (req, res) => {
    const { businessId, productId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(businessId) || !mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Invalid ID" });
    }
    try {
        const business = await BusinessRepository.addProduct(businessId, productId);
        if (!business) return res.status(404).json({ message: "Business not found" });
        res.json(business);
    } catch (error) {
        res.status(500).json({ message: "Error adding product to business", error: error.message });
    }
};

// Eliminar producto del negocio
export const removeProductFromBusiness = async (req, res) => {
    const { businessId, productId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(businessId) || !mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Invalid ID" });
    }
    try {
        const business = await BusinessRepository.removeProduct(businessId, productId);
        if (!business) return res.status(404).json({ message: "Business not found" });
        res.json(business);
    } catch (error) {
        res.status(500).json({ message: "Error removing product from business", error: error.message });
    }
};
