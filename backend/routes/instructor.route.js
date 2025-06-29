import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { isInstructor } from '../middleware/roleMiddleware.js';
import { uploadVideo } from "../middleware/upload.js";
import { 
    addreviewToCourse, createCourse, deleteCourse, showReviewToCourse,
    deleteVideoFromCourse, getAllMyCreatedCourses, showAllCourse,searchCourse,addVideoToSection,
    addSectionToCourse,
    
} from '../controllers/instructor.controller.js';

const router = express.Router();

router.post("/create-course",protectRoute,isInstructor,createCourse);
router.delete("/:courseId/delete-course",protectRoute,isInstructor,deleteCourse);
router.post("/:courseId/add-section", protectRoute, isInstructor, addSectionToCourse)
router.post("/:courseId/add-video",protectRoute,isInstructor,uploadVideo.single("video"), addVideoToSection);
router.delete("/:courseId/delete-video/:videoId",protectRoute,isInstructor, deleteVideoFromCourse);
router.get("/instructor/courses",protectRoute,isInstructor,getAllMyCreatedCourses);
router.post("/:courseId/add-review", protectRoute, addreviewToCourse);
router.get("/:courseId/show-review", protectRoute, showReviewToCourse);
router.get("/all-courses", protectRoute, showAllCourse);
router.get("/search", protectRoute, searchCourse)

export default router;