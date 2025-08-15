import { v2 as cloudinary } from 'cloudinary';
import { Purchase } from "../models/purchase.model.js";
import Course from "../models/course.model.js";
import InstructorRequest from "../models/instructorRequest.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import Stripe from 'stripe'


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

export const deleteRequest = async (req, res) => {
    try {
        const userId = req.user._id;
        const { requestId } = req.body;

        const request = await InstructorRequest.findById(requestId);
        if (!request) return res.status(404).json({ error: "request not found" });

        await InstructorRequest.findByIdAndDelete(requestId);

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.isApplyForInstructor = false;

        await user.save();
        res.status(200).json({ message: "Request deleted successfuly" })
    } catch (error) {
        console.log("Error in deleteRequest controller", error.message);
        res.status(500).json({ error: " Internal server error" });
    }
}


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

//lms=> 9:17:10
export const purchaseCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user._id;

        const user = await User.findById(userId);
        const course = await Course.findById(courseId);

        if (!course || !user) {
            return res.status(404).json({ error: "User or course not found" });
        }

        // Check if already enrolled
        const alreadyEnrolled = user.enrolledCourses.some(
            enrolled => enrolled.course?.toString() === courseId
        );

        if (alreadyEnrolled) {
            return res.status(400).json({ error: "Already enrolled in this course" });
        }

        const amountUSD = course.discount || course.coursePrice;
        const currency = process.env.CURRENCY.toLowerCase();

        const newPurchase = await Purchase.create({
            courseId,
            userId,
            amount: amountUSD,
            currency,
            status: "pending",
        });

        const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

        const line_items = [
            {
                price_data: {
                    currency,
                    product_data: { name: course.title },
                    unit_amount: Math.round(amountUSD * 100), // cents
                },
                quantity: 1,
            },
        ];

        const session = await stripeInstance.checkout.sessions.create({
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
            customer_email: user.email,
            line_items,
            metadata: {
                purchaseId: newPurchase._id.toString(),
            },
        });

        res.status(200).json({ session_url: session.url });
    } catch (error) {
        console.error("Error in purchaseCourse:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const enrollInCourse = async (req, res) => {
    try {
        const userId = req.user._id;
        const { courseId } = req.params;

        const user = await User.findById(userId);
        const course = await Course.findById(courseId);

        if (!course || !user) {
            return res.status(404).json({ error: "User or course not found" });
        }

        const alreadyEnrolled = user.enrolledCourses.some(
            (enrolled) => enrolled.course.toString() === courseId
        );

        if (alreadyEnrolled) {
            return res.status(400).json({ error: "Already enrolled in this course" });
        }
        const accessDurationInDays = course.additionalBenefits.accessDurationInDays || 730; // Default to 2 years if not set
        const enrolledAt = new Date();
        const expiresAt = new Date(enrolledAt.getTime() + accessDurationInDays * 24 * 60 * 60 * 1000); // Add access duration in milliseconds


        // Add course to user's enrolledCourses
        user.enrolledCourses.push({ course: courseId, enrolledAt });
        await user.save();

        // ✅ Add student to course's enrolledStudents with full object
        course.enrolledStudents.push({
            student: user._id,
            enrolledAt,
            expiresAt,
        });
        await course.save();

        res.status(200).json({ message: "Enrolled in course successfully", courseId });
    } catch (error) {
        console.error("Error in enrollInCourse controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const getEnrolledCourses = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate('enrolledCourses.course');

        if (!user) return res.status(404).json({ error: "User not found" });

        res.status(200).json({ courses: user.enrolledCourses });

    } catch (error) {
        console.error("Error in getEnrolledCourses controller", error.message)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const markeVideoCompleted = async (req, res) => {
    const { courseId, sectionId, videoId } = req.params;

    try {
        // 1️⃣ Find user
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ error: "User not found" });

        // 2️⃣ Check enrollment
        const enrolled = user.enrolledCourses.find(e => e.course.toString() === courseId);
        if (!enrolled) {
            return res.status(403).json({ error: 'Not enrolled in this course' });
        }

        // 3️⃣ Ensure progress structure exists
        if (!enrolled.progress) {
            enrolled.progress = { completedLectures: [], completedVideos: [] };
        }
        if (!enrolled.progress.completedVideos) {
            enrolled.progress.completedVideos = [];
        }
        if (!enrolled.progress.completedLectures) {
            enrolled.progress.completedLectures = [];
        }

        // 4️⃣ Add video to completedVideos if not already
        if (!enrolled.progress.completedVideos.includes(videoId)) {
            enrolled.progress.completedVideos.push(videoId);
        }

        // 5️⃣ Get the course to check section & videos
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ error: "Course not found" });

        const section = course.content.id(sectionId);
        if (!section) return res.status(404).json({ error: "Section not found" });

        // 6️⃣ Check if all videos in section are completed
        const allVideosCompleted = section.videos.every(video =>
            enrolled.progress.completedVideos.includes(video._id.toString())
        );

        // 7️⃣ If all completed, mark lecture as completed
        if (allVideosCompleted && !enrolled.progress.completedLectures.includes(sectionId)) {
            enrolled.progress.completedLectures.push(sectionId);
        }

        // 8️⃣ Save progress
        await user.save();

        res.status(200).json({
            message: "Progress updated",
            completedLectures: enrolled.progress.completedLectures,
            completedVideos: enrolled.progress.completedVideos
        });

    } catch (error) {
        console.error("Error in markLectureCompleted", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
