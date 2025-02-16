import User from "../models/User.js";

class UserRepository {
    async getAll() {
        return await User.find();
    }

    async create(userData) {
        return await User.create(userData);
    }

    async delete(id) {
        return await User.findByIdAndDelete(id);
    }

    async getUser(id) {
        console.log(`Fetching user with ID: ${id}`);
        const user = await User.findById(id);
        console.log(`User found: ${user}`);
        return user;
        }

    async update(id, userData) {
        return await User.findByIdAndUpdate(id, { $set: { ...userData } }, { new: true });
    }
}

export default new UserRepository();
