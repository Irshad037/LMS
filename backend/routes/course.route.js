import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { isInstructor } from '../middleware/roleMiddleware.js';
import { uploadVideo } from "../middleware/upload.js";
import { 
    addVideoToCourse, createCourse, deleteCourse, 
    deleteVideoFromCourse, getAllMyCreatedCourses 
} from '../controllers/course.controller.js';

const router = express.Router();

router.post("/create-course",protectRoute,isInstructor,createCourse);
router.delete("/:courseId/delete-course",protectRoute,isInstructor,deleteCourse);
router.post("/:courseId/add-video",protectRoute,isInstructor,uploadVideo.single("video"),  addVideoToCourse);
router.delete("/:courseId/delete-video/:videoId",protectRoute,isInstructor, deleteVideoFromCourse);
router.get("/instructor/courses",protectRoute,isInstructor,getAllMyCreatedCourses);

export default router;