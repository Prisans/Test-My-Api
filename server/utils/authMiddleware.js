import jwt from 'jsonwebtoken';
import User from '../model/user.js';

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ success: false, msg: "Authentication required" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findOne({ email: decoded.email });

        if (!user) {
            return res.status(401).json({ success: false, msg: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, msg: "Invalid or expired token" });
    }
};
