import User from "../models/User.js";

class UserRepository {
    async getAll() {
        return await User.find();
    }

    async create(userData) {
        return await User.create(userData);
    }
}

export default new UserRepository();
