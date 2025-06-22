import User from "../models/user.model.js";

export const updateUserRole = async (req, res) => {
    try {
        const { userId, role } = req.body;

        // Validate role
        if (!['student', 'instructor', 'admin'].includes(role)) {
            return res.status(400).json({ error: "Invalid Role" });
        }

        // Update user role
        const user = await User.findByIdAndUpdate(
            userId,
            { role },
            { new: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "Role updated successfully", user });
    } catch (error) {
        console.error("Error in updateUserRole controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
