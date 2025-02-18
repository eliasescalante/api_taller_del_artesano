import { verifyToken } from "../utils/jwt.js";

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ message: "Access denied, no token provided" });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.userId = decoded.userId;
    next();
};

export default authMiddleware;
