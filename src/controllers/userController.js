import UserRepository from "../repositories/UserRepository.js";

export const getUsers = async (req, res) => {
    const users = await UserRepository.getAll();
    res.json(users);
};

export const createUser = async (req, res) => {
    const user = await UserRepository.create(req.body);
    res.json(user);
};
