import mongoose from 'mongoose';
import UserRepository from "../repositories/UserRepository.js";
import BusinessRepository from "../repositories/BusinessRepository.js";

export const getUsers = async (req, res) => {
    try {
        const users = await UserRepository.getAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving users", error: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const { role, business, ...rest } = req.body;
        
        if (role === "vendedor" && !business) {
            // Crear un negocio predeterminado usando el repositorio
            const newBusinessData = {
                name: "Negocio Predeterminado",
                category: "General",
                address: "Dirección desconocida"
            };
            const newBusiness = await BusinessRepository.createBusiness(newBusinessData);
            req.body.business = newBusiness._id;  // Asignar el ID del negocio creado
        }

        const user = await UserRepository.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }
    try {
        await UserRepository.delete(id);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};

export const getUser = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }
    try {
        const user = await UserRepository.getUser(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving user", error: error.message });
    }
};

export const updateUser = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }
    try {
        const user = await UserRepository.update(id, req.body);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
};