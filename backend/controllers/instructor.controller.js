import { cloudinary } from "../config/cloudinary.js";
import Course from "../models/course.model.js";

export const createCourse = async (req, res) => {
    try {
        const { title, description, category, coursePrice, discount } = req.body;
        let { thumbnail } = req.body;

        // Validate required fields
        if (!title || !description || !category || !thumbnail || !coursePrice || !discount) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const uploadReasponse = await cloudinary.uploader.upload(thumbnail);
        thumbnail = uploadReasponse.secure_url;

        const course = new Course({
            title,
            description,
            category,
            thumbnail,
            content: [], // Content (e.g., videos) will be added separately
            instructor: req.user._id,
            coursePrice,
            discount,
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
        const { courseId } = req.params;

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ error: "Course not found" });

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

export const addSectionToCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { sectionTitle } = req.body;

        if (!sectionTitle) {
            return res.status(400).json({ error: "Section title is required" });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        if (String(course.instructor) !== String(req.user._id)) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        // Check if section already exists
        const exists = course.content.some(section => section.sectionTitle === sectionTitle);
        if (exists) {
            return res.status(400).json({ error: "Section already exists" });
        }

        course.content.push({ sectionTitle, videos: [] });

        await course.save();
        res.status(201).json({ message: "Section added successfully", course });
    } catch (error) {
        console.error("❌ Error in addSectionToCourse:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteSectionFromCourse = async (req, res) => {
    try {
        const { courseId, sectionId } = req.params;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        if (String(course.instructor) !== String(req.user._id)) {
            return res.status(403).json({ error: "You are not the instructor of this course" });
        }

        const sectionIndex = course.content.findIndex(sec => String(sec._id) === sectionId);
        if (sectionIndex === -1) {
            return res.status(404).json({ error: "Section not found" });
        }

        const section = course.content[sectionIndex];

        // 🧹 Delete videos from Cloudinary
        for (const video of section.videos) {
            if (video.publicId) {
                await cloudinary.uploader.destroy(video.publicId, { resource_type: "video" });
            }
        }

        // 🧼 Remove section from course
        course.content.splice(sectionIndex, 1);
        await course.save();

        res.status(200).json({ message: "✅ Section deleted successfully", deletedSection: section });
    } catch (error) {
        console.error("❌ Error in deleteSectionFromCourse controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const addVideoToSection = async (req, res) => {
  try {
    const { courseId, sectionId } = req.params;
    const { title, duration } = req.body;
    const videoUrl = req.file?.path;
    const publicId = req.file?.filename;

    if (!title) return res.status(400).json({ error: "Title is required" });
    if (!duration) return res.status(400).json({ error: "Duration is required" });
    if (!videoUrl || !publicId) return res.status(400).json({ error: "Video upload failed" });
    if (!sectionId) return res.status(400).json({ error: "Section ID is missing" });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    if (String(course.instructor) !== String(req.user._id)) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const sectionIndex = course.content.findIndex(
      sec => String(sec._id) === String(sectionId)
    );

    if (sectionIndex === -1) return res.status(404).json({ error: "Section not found" });

    const section = course.content[sectionIndex];
    if (!section.videos) section.videos = [];

    section.videos.push({ title, videoUrl, publicId, duration });
    await course.save();

    res.status(200).json({ message: "Video added to section", section });
  } catch (error) {
    console.error("❌ Error in addVideoToSection:", error.message);
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

export const getAllMyCreatedCourses = async (req, res) => {
    try {
        const instructorId = req.user._id;

        const courses = await Course.find({ instructor: instructorId }).sort({
            createdAt: -1,
        });

        res.status(200).json({ courses });
    } catch (error) {
        console.error("❌ Error in getAllCreatedCourses:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const addreviewToCourse = async (req, res) => {
    try {
        const userId = req.user._id;
        const { courseId } = req.params;
        const { rating, comment } = req.body;

        if (!rating) {
            return res.status(400).json({ error: " Rating is required" });
        }

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ error: "Course not found" });

        const alreadyReviewed = course.reviews.find((rev) => String(rev.user) == String(userId));
        if (alreadyReviewed) {
            return res.status(400).json({ error: "You have already reviewed this course" });
        }

        const newReview = {
            user: userId,
            rating,
            comment
        }

        course.reviews.push(newReview);



        course.averageRating =
            course.reviews.reduce((acc, r) => acc + r.rating, 0) / course.reviews.length;



        await course.save();

        res.status(200).json({ message: "✅ Review added successfully", course });
    } catch (error) {
        console.log(" Error in addreviewToCourse controller");
        res.status(500).json({ error: " Internal server error" });
    }
}

export const showReviewToCourse = async (req, res) => {
    try {

        const { courseId } = req.params;

        const course = await Course.findById(courseId)
            .populate("reviews.user", "name email")
            .select("title reviews averageRating");

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.status(200).json({
            courseTitle: course.title,
            averageRating: course.averageRating,
            reviews: course.reviews,
        })
    } catch (error) {
        console.log("Error in showReviewToCourse controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }

}

export const showAllCourse = async (req, res) => {
    try {
        const courses = await Course.find()
            .populate("instructor", "name email")
            .select("title description category averageRating content instructor createdAt");

        res.status(200).json({ total: courses.length, courses });
    } catch (error) {
        console.log("Error in showAllCourse controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const searchCourse = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).json({ error: "Search query is required" })

        const course = await Course.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { category: { $regex: query, $options: "i" } }
            ]
        })
            .populate("instructor", "name email")
            .select("title description category averageRating instructor createdAt");

        res.status(200).json(course);
    } catch (error) {
        console.log("Error in searchCourse controller", error.message);
        res.status(500).json({ error: "Internal sever error" });
    }
}

export const NoOfStudentEnrolled = async (req, res) => {
    try {
        const instructorId = req.user._id;
        const courses = await Course.find({ instructor: instructorId })
            .populate({
                path: "enrolledStudents.student",
                select: "name email profileImg",
            })
            .select("title enrolledStudents createdAt");


        const students = [];

        courses.forEach(course => {
            
            course.enrolledStudents.forEach(({ student, enrolledAt }) => {
                if (student) {
                    students.push({
                        studentName: student.name,
                        studentEmail: student.email,
                        avatar: student.profileImg,
                        courseTitle: course.title,
                        enrolledDate: enrolledAt,
                    });
                }
            })

        })
        res.status(200).json({ students });
    } catch (error) {
        console.log("Error in NoOfStudentEnrolled: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}




