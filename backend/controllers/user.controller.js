import { cloudinary } from "../config/cloudinary.js";
import Course from "../models/course.model.js";
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

export const createCourse = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    // Validate required fields
    if (!title || !description || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const course = new Course({
      title,
      description,
      category,
      content: [], // Content (e.g., videos) will be added separately
      instructor: req.user._id,
    });

    await course.save();

    res.status(201).json({
      message: "✅ Course created successfully",
      course,
    });
  } catch (error) {
    console.error("❌ Error in createCourse controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const {courseId} = req.params;

    const course = await Course.findById(courseId);
    if(!course) return res.status(404).json({ error: "Course not found" });

    if (String(course.instructor) !== String(req.user._id)) {
      return res.status(403).json({ error: "You are not the instructor of this course" });
    }

    await Course.findByIdAndDelete(courseId);

    res.status(200).json({ message: "✅ Course deleted successfully" });
  } catch (error) {
    console.error("❌ Error in deleteCourse controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const addVideoToCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title } = req.body;

    const videoUrl = req.file?.path;
    const publicId = req.file?.filename; // Cloudinary publicId

    if (!videoUrl || !title || !publicId) {
      return res.status(400).json({ error: "Title and video file are required" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Only allow the instructor who owns the course
    if (String(course.instructor) !== String(req.user._id)) {
      return res.status(403).json({ error: "You are not the instructor of this course" });
    }

    // Push video object to content array
    course.content.push({
      title,
      videoUrl,
      publicId, // Store this for future deletion from Cloudinary
    });

    await course.save();

    res.status(200).json({ message: "✅ Video added to course", course });
  } catch (error) {
    console.error("❌ Error in addVideoToCourse:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const deleteVideoFromCourse = async (req, res) => {
  try {
    const { courseId, videoId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Check instructor ownership
    if (String(course.instructor) !== String(req.user._id)) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Find the lesson to delete
    const videoToDelete = course.content.find(
      (lesson) => String(lesson._id) === String(videoId)
    );

    if (!videoToDelete) {
      return res.status(404).json({ error: "Video not found in course" });
    }

    // 1. Delete from Cloudinary
    await cloudinary.uploader.destroy(videoToDelete.publicId, {
      resource_type: "video",
    });

    // 2. Remove from MongoDB
    course.content = course.content.filter(
      (lesson) => String(lesson._id) !== String(videoId)
    );

    await course.save();

    res.status(200).json({ message: "✅ lecture deleted from course" });
  } catch (error) {
    console.error("❌ Error deleting video:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

