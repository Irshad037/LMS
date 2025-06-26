import InstructorRequest from "../models/instructorRequest.model.js";
import User from "../models/user.model.js";



export const requestInstructor = async (req, res) => {
    try {
        const existing = await InstructorRequest.findOne({ user: req.user._id });
        if (existing) return res.status(400).json({ error: "You have already requested." });

        const request = await InstructorRequest.create({
            user: req.user._id,
            message: req.body.message || "",
        })

        res.status(201).json({ message: "Request sent", request });
    } catch (error) {
        console.log("Erorr in requestInstructor controller", error.message);
        res.status(500).json({ error: "Internal server error" })
    }
}

export const approveInstructor = async (req, res) => {
    try {
        const { requestId } = req.params;

        const request = await InstructorRequest.findById(requestId).populate("user", "-password");

        if (!request) {
            return res.status(404).json({ error: "Request not found" });
        }

        if (request.status !== "pending") {
            return res.status(400).json({ error: "Request already processed" });
        }

        // Update user role
        await User.findByIdAndUpdate(request.user._id, { role: "instructor" });

        // Update request status
        request.status = "approved";
        await request.save();

        // Refetch updated user
        const updatedUser = await User.findById(request.user._id).select("-password");

        res.status(201).json({ message: "Instructor approved", user: updatedUser });
    } catch (err) {
        console.error("Error in approving instructor controller:", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const rejectInstructor = async (req, res) => {
    try {
        const { requestId } = req.params;

        const request = await InstructorRequest.findById(requestId).populate("user", "-password");

        if (!request) {
            return res.status(404).json({ error: "Request not found" });
        }

        if (request.status !== "pending") {
            return res.status(400).json({ error: "Request already processed" });
        }

        // Update request status
        request.status = "rejected";
        await request.save();

        res.status(201).json({ message: "Instructor rejected", user: request.user });
    } catch (err) {
        console.error("Error in rejected instructor controller:", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

