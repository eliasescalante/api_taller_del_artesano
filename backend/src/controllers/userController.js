import mongoose from 'mongoose';
import UserRepository from "../repositories/UserRepository.js";
import BusinessRepository from "../repositories/BusinessRepository.js";
import cloudinary from "../config/cloudinary.js";

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
        const { name, email, password } = req.body;

        // Crear un negocio para el usuario
        const newBusiness = await BusinessRepository.create({
            name: `${name}'s Business`,
            category: "General",
            address: "Dirección desconocida"
        });

        // Crear un carrito para el usuario
        const newCart = await CartRepository.create({ user: null, products: [] });

        // Crear usuario con carrito y negocio asignados
        const user = await UserRepository.create({
            name,
            email,
            password,
            business: newBusiness._id,
            cart: newCart._id
        });

        // Asociar el usuario al carrito
        newCart.user = user._id;
        await newCart.save();

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

export const updateAvatar = async (req, res) => {
    console.log("Archivos recibidos:", req.files); // Verifica si el archivo se está recibiendo

    const userId = req.params.id;  // Obtener el ID del usuario desde la URL
    if (!req.files || !req.files.avatar) {
        return res.status(400).json({ message: "No avatar image uploaded" });
    }

    try {
        console.log("Subiendo imagen a Cloudinary...");
        // Subir la imagen a Cloudinary
        const result = await cloudinary.v2.uploader.upload(req.files.avatar.tempFilePath, {
            folder: "avatars", // Puedes cambiar el folder si lo deseas
        });
        console.log("Imagen subida a Cloudinary:", result);

        console.log("Actualizando usuario en la base de datos...");
        // Actualizar la imagen del usuario en la base de datos
        const updatedUser = await UserRepository.update(userId, {
            imageUrl: result.secure_url,
        });
        console.log("Usuario actualizado:", updatedUser);

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "Avatar updated successfully", updatedUser });
    } catch (error) {
        console.error("Error en updateAvatar:", error); // Agrega este log para ver el error completo
        res.status(500).json({ message: "Error uploading avatar", error: error.message });
    }
};