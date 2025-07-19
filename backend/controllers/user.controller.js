import Course from "../models/course.model.js";
import InstructorRequest from "../models/instructorRequest.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from 'cloudinary';


export const requestInstructor = async (req, res) => {
  try {
    const { email, bio } = req.body;

    if (!email || !bio) return res.status(400).json({ error: "Email and Bio are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const existing = await InstructorRequest.findOne({ user: user._id });
    if (existing) {
      return res.status(400).json({ error: "You have already requested." });
    }

    const request = await InstructorRequest.create({
      user: user._id,
      bio: bio.trim(),
    });

    user.isApplyForInstructor = true; 
    await user.save();

    res.status(201).json({ message: "Request sent", request });
  } catch (error) {
    console.error("Error in requestInstructor controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getStatus = async (req, res) => {
  try {
    const userId = req.user._id;

    // 1. Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 2. Find instructor request with user populated
    const request = await InstructorRequest.findOne({ user: userId }).populate(
      "user",
      "name email profileImg"
    );

    if (!request) {
      return res.status(404).json({ error: "Instructor request not found" });
    }

    // 3. Success
    return res.status(200).json({ success: true, data: request });

  } catch (error) {
    console.error("Error in getStatus controller:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


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

export const getOwnProfile = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id).select("-password");
        if (!user) return res.status(404).json({ error: "User not found" });

        const profile = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
        };

        // If instructor, include course count
        if (user.role === "instructor") {
            const courseCount = await Course.countDocuments({ instructor: user._id });
            profile.totalCourses = courseCount;
        }

        res.status(200).json({ profile });
    } catch (error) {
        console.error("❌ Error in getOwnProfile:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const updateProfile = async (req, res) => {
    const { name, email, currentPassword, newPassword } = req.body;
    let { profileImg } = req.body
    let userId = req.user._id;

    try {
        let user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "user not found" });

        if ((!newPassword && currentPassword) || (newPassword && !currentPassword)) {
            return res.status(400).json({ error: "please provide both currentPassword and newPassword" })
        }
        if (currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ error: " Current password is incorrect" });
            }

            if (newPassword.length < 6) {
                return res.status(400).json({ error: " Password must be greater then or atleast 6 didgit" });
            }
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }


        if (profileImg) {
            if (user.profileImg) {
                await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0])
            }
            const uploadReasponse = await cloudinary.uploader.upload(profileImg);
            profileImg = uploadReasponse.secure_url;
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.profileImg = profileImg || user.profileImg;

        await user.save();

        user.password = null;
        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        console.log("Error in updatedUser controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}


export const enrollInCourse = async (req, res) => {
    try {
        const userId = req.user._id;
        const { courseId } = req.params;

        const user = await User.findById(userId);
        const course = await Course.findById(courseId);

        if (!course || !user) {
            return res.status(404).json({ error: "user Or course not found" });
        }

        if (user.enrolledCourses.includes(courseId)) {
            return res.status(400).json({ error: "Already enrolled in this course" });
        }

        user.enrolledCourses.push(courseId);
        await user.save();

        course.enrolledStudents.push(user._id);
        await course.save();

        res.status(200).json({ message: "✅ Enrolled in course successfully", courseId });
    } catch (error) {
        console.log("Error in enrollInCourse controller", error.message);
        res.status(500).json({ error: "Internal server error" })
    }
}

export const getEnrolledCourses = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate({
                path: "enrolledCourses",
                select: "title thumbnail category averageRating",
                options: { sort: { createdAt: -1 } },
                populate: {
                    path: "instructor",
                    select: "name email",
                },
            })
            .select("enrolledCourses");

        if (!user) return res.status(404).json({ error: "User not found" });

        if (user.enrolledCourses.length === 0) {
            return res.status(200).json({ message: "You have not enrolled in any courses yet." });
        }

        res.status(200).json({
            enrolledCourses: user.enrolledCourses
        });

    } catch (error) {
        console.log("Error in getEnrolledCourses controller", error.message)
        res.status(500).json({ error: "Internal server error" })
    }
}